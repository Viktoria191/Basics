import { Task } from '../store/tasks/types';
import { getMockTasks, addMockTask } from './mocTasks';

const addTask = async (newTask: Omit<Task, 'id'>): Promise<Task> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const currentTasks = getMockTasks();
      const taskWithId: Task = {
        ...newTask,
        id: (currentTasks.length + 1).toString(),
      };
      addMockTask(taskWithId);
      resolve(taskWithId);
    }, 500);
  });
};

export { addTask };
