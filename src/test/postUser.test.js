import { MongoClient } from 'mongodb';
import {
  describe, expect, it, jest, beforeAll, afterAll,
} from '@jest/globals';
import request from 'supertest';
import MongoClientMock from './helpers/MongoClientMock';
import app from '../api/app';

describe('Post /user', () => {
  let connectionMock = null;
  beforeAll(async () => {
    connectionMock = await MongoClientMock();
    MongoClient.connect = jest.fn().mockResolvedValueOnce(connectionMock);

    const db = await connectionMock.db('TodoList');
    const users = await db.collection('users');
    await users.deleteMany({});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('verifica a resposta com email inválido', async () => {
    const req = request(app);
    const response = await req
      .post('/user')
      .send({
        name: 'usuario1',
        lastname: 'dos Testes',
        email: 'usuario1email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta sem lastname', async () => {
    const req = request(app);
    const response = await req
      .post('/user')
      .send({
        name: 'usuario1',
        email: 'usuario1email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta sem name', async () => {
    const req = request(app);
    const response = await req
      .post('/user')
      .send({
        lastname: 'dos Testes',
        email: 'usuario1email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica a resposta sem senha inválido', async () => {
    const req = request(app);
    const response = await req
      .post('/user')
      .send({
        name: 'usuario1',
        lastname: 'dos Testes',
        email: 'usuario1@email.com',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid entries. Try again.');
  });

  it('verifica resposta status 201 com usuario válido', async () => {
    const req = request(app);
    const response = await req
      .post('/user')
      .send({
        name: 'usuario1',
        lastname: 'dos Testes',
        email: 'usuario1@email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('lastname');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('usuario1');
    expect(response.body.lastname).toBe('dos Testes');
    expect(response.body.email).toBe('usuario1@email.com');
  });

  it('verifica a resposta com email já registrado', async () => {
    const req = request(app);
    const response = await req
      .post('/user')
      .send({
        name: 'usuario1',
        lastname: 'dos Testes',
        email: 'usuario1@email.com',
        password: '123456',
      });
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email already registered');
  });
});
