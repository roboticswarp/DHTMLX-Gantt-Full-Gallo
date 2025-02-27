"use client";

import { useEffect, useRef } from "react";
import { useTaskStore } from "../lib/store/taskStore";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

interface GanttProps {
  height?: string;
  width?: string;
}

const GanttComponent: React.FC<GanttProps> = ({
  height = "500px",
  width = "100%",
}) => {
  const ganttContainer = useRef<HTMLDivElement>(null);
  const { tasks, fetchTasks, isLoading, error } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    console.log("Tareas fetched:", tasks);
    if (typeof window !== "undefined" && ganttContainer.current) {
      gantt.init(ganttContainer.current);
      gantt.clearAll();
      gantt.parse({ data: tasks });
    }
  }, [tasks]);

  return (
    <div className="gantt-wrapper">
      <div
        ref={ganttContainer}
        style={{ width, height }}
        className="gantt-container"
      />
      {isLoading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GanttComponent;
