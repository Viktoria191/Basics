import { createSlice } from '@reduxjs/toolkit';
import { TasksState } from './types';
import {
  addTaskAction,
  deleteTaskAction,
  getTasksAction,
  toggleTaskAction,
  updateTaskAction,
} from './actions';

const initialState: TasksState = {
  loading: false,
  tasks: [],
  error: null,
};

const tasksSlice = createSlice({
  name: 'TASKS',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getTasksAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tasks = payload;
      })
      .addCase(getTasksAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to fetch tasks';
      })
      .addCase(toggleTaskAction.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map(task =>
          task.id === payload.id ? payload : task,
        );
      })
      .addCase(addTaskAction.fulfilled, (state, { payload }) => {
        state.tasks.unshift(payload);
      })
      .addCase(addTaskAction.rejected, (state, { error }) => {
        state.error = error.message || 'Failed to add task';
      })
      .addCase(updateTaskAction.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map(task =>
          task.id === payload.id ? payload : task,
        );
      })
      .addCase(updateTaskAction.rejected, (state, { error }) => {
        state.error = error.message || 'Failed to update task';
      })
      .addCase(deleteTaskAction.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.filter(task => task.id !== payload);
      })
      .addCase(deleteTaskAction.rejected, (state, { error }) => {
        state.error = error.message || 'Failed to delete task';
      }),
});

export const { reducer: tasksReducer } = tasksSlice;
