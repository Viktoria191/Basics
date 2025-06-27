import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from './types';
import { getTasks } from '../../services/getTasks';
import { addTask } from '../../services/addTasks';
import { updateTask } from '../../services/updateTask';
import { deleteTask } from '../../services/deleteTask';
import { toggleTask } from '../../services/toggleTask';

const getTasksAction = createAsyncThunk(
  'TASKS/getTasksAction',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await getTasks();
      return tasks;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

const toggleTaskAction = createAsyncThunk(
  'TASKS/toggleTaskAction',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const updatedTask = await toggleTask(taskId);
      return updatedTask;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

const addTaskAction = createAsyncThunk(
  'TASKS/addTaskAction',
  async (newTask: Omit<Task, 'id'>, { rejectWithValue }) => {
    try {
      const addedTask = await addTask(newTask);
      return addedTask;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

const updateTaskAction = createAsyncThunk(
  'TASKS/updateTaskAction',
  async (updatedTask: Task, { rejectWithValue }) => {
    try {
      const result = await updateTask(updatedTask);
      return result;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

const deleteTaskAction = createAsyncThunk(
  'TASKS/deleteTaskAction',
  async (taskId: string, { rejectWithValue }) => {
    try {
      await deleteTask(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
);

export {
  getTasksAction,
  toggleTaskAction,
  addTaskAction,
  updateTaskAction,
  deleteTaskAction,
};
