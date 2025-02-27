import { create } from 'zustand';
import { fetchAllTasks, GanttTask } from '../services/taskService';

interface TaskState {
  tasks: GanttTask[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await fetchAllTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch tasks",
        isLoading: false,
      });
    }
  },
}));
