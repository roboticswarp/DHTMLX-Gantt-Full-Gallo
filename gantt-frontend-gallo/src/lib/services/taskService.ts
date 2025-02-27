import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface StrapiTask {
  id: string | number;
  attributes?: {
    title: string;
    description: unknown;
    start_date: string;
    duration: number;
    progress: number;
    type: "project" | "task" | "subtask";
    parentTask?: {
      data: { id: string | number } | null;
    };
    subtasks?: {
      data: StrapiTask[];
    };
  };

  title?: string;
  description?: unknown;
  start_date?: string;
  duration?: number;
  progress?: number;
  type?: "project" | "task" | "subtask";
  parentTask?: {
    data: { id: string | number } | null;
  };
  subtasks?: {
    data: StrapiTask[];
  };
}

export interface GanttTask {
  id: string | number;
  text: string;
  start_date: Date;
  duration: number;
  progress: number;
  parent: string | number | null;
  type: "project" | "task" | "subtask";
}

interface StrapiTaskPayload {
  data: {
    title: string;
    start_date: string;
    duration: number;
    progress: number;
    type: "project" | "task" | "subtask";
    parent?: string | number;
  };
}

export const transformStrapiToGantt = (data: StrapiTask[]): GanttTask[] => {
  return data.map((item: StrapiTask) => {
    const title = item.attributes ? item.attributes.title : item.title;
    const startDateStr = item.attributes
      ? item.attributes.start_date
      : item.start_date;
    const duration = item.attributes ? item.attributes.duration : item.duration;
    const progress = item.attributes ? item.attributes.progress : item.progress;
    const type = item.attributes ? item.attributes.type : item.type;
    const parent = item.attributes
      ? item.attributes.parentTask?.data?.id
      : item.parentTask?.data?.id || null;

    return {
      id: item.id,
      text: title || "",
      start_date: startDateStr ? new Date(startDateStr) : new Date(),
      duration: duration || 0,
      progress: progress || 0,
      parent: parent || null,
      type: type || "task",
    };
  });
};

export const transformGanttToStrapi = (task: GanttTask): StrapiTaskPayload => {
  const payload: StrapiTaskPayload = {
    data: {
      title: task.text,
      start_date: task.start_date.toISOString(),
      duration: task.duration,
      progress: task.progress,
      type: task.type,
    },
  };

  if (task.parent) {
    payload.data.parent = task.parent;
  }

  return payload;
};

export const fetchAllTasks = async (): Promise<GanttTask[]> => {
  try {
    const response = await api.get("/api/tasks?populate=parentTask");
    return transformStrapiToGantt(response.data.data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: GanttTask) => {
  try {
    const strapiData = transformGanttToStrapi(task);
    const response = await api.post("/api/tasks", strapiData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id: string | number, task: GanttTask) => {
  try {
    const strapiData = transformGanttToStrapi(task);
    const response = await api.put(`/api/tasks/${id}`, strapiData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: string | number) => {
  try {
    await api.delete(`/api/tasks/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
