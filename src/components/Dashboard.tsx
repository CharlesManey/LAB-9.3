import { useState } from "react";
import TaskFilter, { type SortField, type SortOrder } from "./TaskFilter";
import TaskForm from "./TaskForm";
import TaskList, { type Task, type TaskStatus } from "./TaskList";

const PRIORITY_WEIGHTS: Record<string, number> = {
  low: 1,
  medium: 2,
  high: 3,
};


function Dashboard() {

  const [tasks, setTasks] = useState<Task[]>([
  {id: "1", title: "Task 1", description: "Description 1", status: "pending", priority: "low", dueDate: "8/31/2026"},
  {id: "2", title: "Task 2", description: "Description 2", status: "in-progress", priority: "medium", dueDate: "8/30/2026"},
  {id: "3", title: "Task 3", description: "Description 3", status: "completed", priority: "high", dueDate: "8/29/2026"},
  {id: "4", title: "Task 4", description: "Description 1", status: "pending", priority: "low", dueDate: "8/31/2026"},
  {id: "5", title: "Task 5", description: "Description 2", status: "in-progress", priority: "medium", dueDate: "8/30/2026"},
  {id: "6", title: "Task 6", description: "Description 3", status: "completed", priority: "high", dueDate: "8/29/2026"},
  ]);

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    sortBy?: SortField;
    sortOrder?: SortOrder;
  }>({});

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  }

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  const handleStatusChange = (id:string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => task.id === id ? {...task, status: newStatus} : task));
  }

  const filteredTasks = tasks.filter((task) => {

    if (filters.status && task.status !== filters.status) {
      return false;
    }

    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    return true;

  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const {sortBy, sortOrder} = filters;

    if (!sortBy) return 0;

    let comparison = 0;

    if (sortBy === 'priority') {
      comparison = PRIORITY_WEIGHTS[a.priority] - PRIORITY_WEIGHTS[b.priority];
    } else if (sortBy === 'dueDate') {
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  });


  return (
    <div className="flex flex-col xl:flex-row xl:gap-20 p-3">
      <div>
        <TaskForm onAddTask={handleAddTask}/>
      </div>
      <div>
        <TaskFilter onFilterChange={setFilters}/>
        <TaskList tasks={sortedTasks} onDelete={handleDelete} onStatusChange={handleStatusChange}/>
      </div>
    </div>
  );
}

export default Dashboard;