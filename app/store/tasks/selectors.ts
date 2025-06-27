import { useAppSelector } from '../hooks';

const useTasks = () => useAppSelector(({ tasks: { tasks } }) => tasks);

const useTasksLoading = () =>
  useAppSelector(({ tasks: { loading } }) => loading);

export { useTasks, useTasksLoading };
