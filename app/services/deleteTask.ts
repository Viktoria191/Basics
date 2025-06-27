import { deleteMockTask } from './mocTasks';

const deleteTask = async (taskId: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      deleteMockTask(taskId);
      resolve(taskId);
    }, 500);
  });
};

export { deleteTask };
