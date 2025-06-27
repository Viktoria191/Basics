import { Task } from '../store/tasks/types';
import { getMockTasks } from './mocTasks';

const getTasks = async (): Promise<Task[]> => {
  return new Promise(resolve => setTimeout(() => resolve(getMockTasks()), 500));
};

export { getTasks };
