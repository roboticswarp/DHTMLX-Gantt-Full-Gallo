'use client';

import dynamic from "next/dynamic";

const GanttComponent = dynamic(() => import("@/components/GanttComponent"), {
  ssr: false,
});

export default function GanttPage() {
  return <GanttComponent />;
}