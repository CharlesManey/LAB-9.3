import { useState } from "react";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";
import TaskList, { type Task, type TaskStatus } from "./TaskList";





function Dashboard() {

  const [tasks, setTasks] = useState<Task[]>([
  {id: "1", title: "Task 1", description: "Description 1", status: "pending", priority: "low", dueDate: "8/31/2026"},
  {id: "2", title: "Task 2", description: "Description 2", status: "in-progress", priority: "medium", dueDate: "8/30/2026"},
  {id: "3", title: "Task 3", description: "Description 3", status: "completed", priority: "high", dueDate: "8/29/2026"},
  {id: "4", title: "Task 4", description: "Description 1", status: "pending", priority: "low", dueDate: "8/31/2026"},
  {id: "5", title: "Task 5", description: "Description 2", status: "in-progress", priority: "medium", dueDate: "8/30/2026"},
  {id: "6", title: "Task 6", description: "Description 3", status: "completed", priority: "high", dueDate: "8/29/2026"},
  ]);

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  }

  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }>({});

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

  return (
    <div className="flex flex-col xl:flex-row xl:gap-20">
      <div>
        <TaskForm onAddTask={handleAddTask}/>
      </div>
      <div>
        <TaskFilter onFilterChange={setFilters}/>
        <TaskList tasks={filteredTasks} onDelete={handleDelete} onStatusChange={handleStatusChange}/>
      </div>
    </div>
  );
}

export default Dashboard;