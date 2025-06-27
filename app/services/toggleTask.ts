import { Task } from '../store/tasks/types';
import { getMockTasks, updateMockTask } from './mocTasks';

const toggleTask = async (taskId: string): Promise<Task> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const currentTasks = getMockTasks();
        const task = currentTasks.find(t => t.id === taskId);

        if (!task) {
          throw new Error('Task not found');
        }

        const updatedTask = {
          ...task,
          completed: !task.completed,
        };

        updateMockTask(updatedTask);
        resolve(updatedTask);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export { toggleTask };
