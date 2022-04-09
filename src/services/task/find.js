import TaskModel from '../../models/TaskModel.js';

const Task = new TaskModel();

const find = async (userId) => {
  const tasks = await Task.findTasks({ userId });

  return tasks;
};

export default find;
