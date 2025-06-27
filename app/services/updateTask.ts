import { Task } from '../store/tasks/types';
import { updateMockTask } from './mocTasks';

const updateTask = async (updatedTask: Task): Promise<Task> => {
  return new Promise(resolve => {
    setTimeout(() => {
      updateMockTask(updatedTask);
      resolve(updatedTask);
    }, 500);
  });
};

export { updateTask };
