export type Task = {
  id: string;
  title: string;
  description: string;
  importance: boolean;
  completed: boolean;
};

export type TasksState = {
  loading: boolean;
  error: string | null;
  tasks: Task[];
};
