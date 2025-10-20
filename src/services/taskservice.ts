import axios from 'axios';
import { Task, CreateTask, UpdateTask } from '../types/task.types';

const API_BASE_URL = 'http://localhost:8082/tasks';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const taskService = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await apiClient.get<Task[]>('');  // ✅ Fixed: empty string instead of '/'
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<Task> => {
    try {
      const response = await apiClient.get<Task>(`/${id}`);  // ✅ Correct
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  // Create new task
  createTask: async (task: CreateTask): Promise<Task> => {
    try {
      const response = await apiClient.post<Task>('', task);  // ✅ Fixed: empty string instead of '/'
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update task
  updateTask: async (id: string, task: UpdateTask): Promise<Task> => {
    try {
      const response = await apiClient.put<Task>(`/${id}`, task);  // ✅ Correct
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/${id}`);  // ✅ Correct
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },

  // Search tasks by name
  searchTasksByName: async (name: string): Promise<Task[]> => {
    try {
      const response = await apiClient.get<Task[]>('/find', {  // ✅ Correct
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw error;
    }
  },

  // Execute task
  executeTask: async (id: string): Promise<Task> => {
    try {
      const response = await apiClient.put<Task>(`/${id}/execute`);  // ✅ Correct
      return response.data;
    } catch (error) {
      console.error(`Error executing task ${id}:`, error);
      throw error;
    }
  },
};

export default taskService;
