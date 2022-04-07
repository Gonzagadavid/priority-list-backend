const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Priority List',
    description: 'aplicação desenvolvida tendo como proposito otimizar a organização e produtividade das pessoas. Forma visual, a pessoa poderá organizar sua lista de tarefas, classificando a tarefa por nível de prioridade, status e data',
    contact: {
      email: 'gonzagadaviddev@gmail.com',
    },
    license: 'MIT',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://todo-priority-list.herokuapp.com',
      description: 'Production API',
    },
    {
      url: 'http://localhost:3800',
      description: 'Local API',
    },
  ],
  paths: {
    '/user': {
      post: {
        summary: 'Cadastro de pessoa usuária',
        description: 'Rota responsável para a pessoa usuária se inscrever no aplicativo',
        tags: ['User'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              examples: {
                user: {
                  value: {
                    name: 'User',
                    lastname: 'Test',
                    password: '123456',
                    email: 'user@server.com',
                  },
                },
              },
            },
          },
        },
        responses: {
          409: {
            description: 'Email already registered',
          },
          400: {
            description: 'Invalid entries. Try again.',
          },
          201: {
            description: 'CREATED',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/UserInfo',
                },
              },
            },
          },
        },
      },
    },
    '/user/login': {
      post: {
        summary: 'Login da pessoa usuária',
        description: 'Rota responsável por verificar o registro da pessoa usuária e retornar um token junto com outras informações',
        tags: ['User'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
              examples: {
                user: {
                  value: {
                    email: 'user@server.com',
                    password: '123456',
                  },
                },
              },
            },
          },
        },
        responses: {
          400: {
            description: 'Invalid entries. Try again.',
          },
          404: {
            description: 'User not found',
          },
          401: {
            description: 'Incorrect password',
          },
          202: {
            description: 'ACCEPTED',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemas/UserInfo',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
      },
      UserInfo: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          token: {
            type: 'string',
          },
          _id: {
            type: 'string',
          },
        },
      },
    },
  },
};

export default swaggerDocs;