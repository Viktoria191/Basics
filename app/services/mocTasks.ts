import { Task } from '../store/tasks/types';

let _mockTasks: Task[] = [
  {
    id: '1',
    title: 'Изучить React Native',
    description: 'Пройти курс по React Native',
    importance: false,
    completed: false,
  },
  {
    id: '2',
    title: 'Убрать квартиру',
    description: 'Пропылесосить, помыть полы',
    importance: true,
    completed: true,
  },
];

export const getMockTasks = () => _mockTasks;

export const addMockTask = (task: Task) => {
  _mockTasks = [task, ..._mockTasks];
};

export const updateMockTask = (updatedTask: Task) => {
  _mockTasks = _mockTasks.map(task =>
    task.id === updatedTask.id ? updatedTask : task,
  );
};

export const deleteMockTask = (taskId: string) => {
  _mockTasks = _mockTasks.filter(task => task.id !== taskId);
};
