"use client";

import { useEffect, useRef } from "react";
import { gantt, Task } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { useTaskStore } from "../lib/store/taskStore";
import { createTask, updateTask, deleteTask, GanttTask } from "../lib/services/taskService";
import "./GanttComponent.css";

interface GanttProps {
  height?: string;
  width?: string;
}

const convertToGanttTask = (task: Task): GanttTask => {
  const now = new Date();
  
  return {
    id: task.id,
    text: task.text || "",
    start_date: task.start_date 
      ? (task.start_date instanceof Date ? task.start_date : new Date(task.start_date)) 
      : now,
    duration: task.duration || 0,
    progress: task.progress || 0,
    parent: task.parent || null,
    type: (task.type as "project" | "task" | "subtask") || "task"
  };
};

const GanttComponent: React.FC<GanttProps> = ({
  height = "500px",
  width = "100%",
}) => {
  const ganttContainer = useRef<HTMLDivElement>(null);
  const { tasks, fetchTasks, isLoading, error } = useTaskStore();
  
  useEffect(() => {
    gantt.config.xml_date = '%Y-%m-%d %H:%i';
    gantt.config.columns = [
      { name: 'text', label: 'Nombre de tarea', tree: true, width: 200 },
      { name: 'start_date', label: 'Fecha inicio', align: 'center', width: 100 },
      { name: 'duration', label: 'Duración', align: 'center', width: 80 },
      { name: 'add', label: '', width: 44 }
    ];
    
    gantt.config.types = {
      task: "task",
      project: "project",
      milestone: "milestone"
    };
    
    gantt.config.open_tree_initially = true;
    gantt.config.show_progress = true;

    gantt.templates.task_class = (start, end, task) => {
      return task.type || "";
    };

    gantt.attachEvent('onAfterTaskAdd', async (id, task) => {
      try {
        await createTask(convertToGanttTask(task));
        fetchTasks();
      } catch (error) {
        console.error("Error al crear tarea:", error);
        gantt.deleteTask(id);
      }
    });

    gantt.attachEvent('onAfterTaskUpdate', async (id, task) => {
      try {
        await updateTask(id, convertToGanttTask(task));
        fetchTasks();
      } catch (error) {
        console.error("Error al actualizar tarea:", error);
        fetchTasks();
      }
    });

    gantt.attachEvent('onAfterTaskDelete', async (id) => {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
        fetchTasks();
      }
    });

    if (typeof window !== "undefined" && ganttContainer.current) {
      gantt.init(ganttContainer.current);
    }

    return () => {
      gantt.clearAll();
      gantt.detachAllEvents();
    };
  }, [fetchTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    console.log("Tareas fetched:", tasks);
    if (tasks.length > 0 && typeof window !== "undefined") {
      gantt.clearAll();
      gantt.parse({ data: tasks });
    }
  }, [tasks]);

  return (
    <div className="gantt-wrapper">
      <div className="controls">
        <button 
          className="btn add-task" 
          onClick={() => {
            const newTask = {
              text: "Nueva Tarea",
              start_date: new Date(),
              duration: 1,
              progress: 0
            };
            gantt.createTask(newTask);
          }}
        >
          Añadir Tarea
        </button>
        <button 
          className="btn add-project" 
          onClick={() => {
            const newProject = {
              text: "Nuevo Proyecto",
              start_date: new Date(),
              duration: 5,
              type: "project"
            };
            gantt.createTask(newProject);
          }}
        >
          Añadir Proyecto
        </button>
      </div>
      <div 
        ref={ganttContainer} 
        style={{ width, height }} 
        className="gantt-container"
      />
      {isLoading && <div className="loading">Cargando gráfico Gantt...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default GanttComponent;