import { useState } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList, { type Task, type TaskStatus } from "./components/TaskList";




function App() {

  const [tasks, setTasks] = useState<Task[]>([
  {id: "1", title: "Task 1", description: "Description 1", status: "pending", priority: "low", dueDate: "8/31/2026"},
  {id: "2", title: "Task 2", description: "Description 2", status: "in-progress", priority: "medium", dueDate: "8/30/2026"},
  {id: "3", title: "Task 3", description: "Description 3", status: "completed", priority: "high", dueDate: "8/29/2026"},
  ]);

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
    <div className="flex justify-center p-5">
      <div className="flex flex-col items-center gap-5 w-1/3">
        <h1 className="text-2xl text-center">LAB 9.3 React: List, Keys, & Conditionals</h1>
        <form className="border-3 rounded-lg w-full p-5 flex flex-col gap-5" action="">
          <div>
            <label className="text-xl font-semibold" htmlFor="">Title: </label>
            <input className="w-2/3 border-2 p-1 focus:outline-green-600" type="text" placeholder="What shall we call this task?" />
          </div>
          <div>
            <label className="text-xl font-semibold" htmlFor="">Description: </label>
            <input className="w-2/3 border-2 p-1 focus:outline-green-600" type="text" placeholder="What needs to be done?" />
          </div>
          <div>
            <label className="text-xl font-semibold" htmlFor="">Due Date: </label>
            <input className="w-2/3 border-2 p-1 focus:outline-green-600" type="date" placeholder="Expected completion date?" />
          </div>
          <select className="p-1 border-2 w-1/4" name="prioSelect" id="">
            <option value="select">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button type="submit" className="border-2 rounded-lg p-1 w-1/3 self-center">Add New Task</button>
        </form>
        <div className="self-start flex flex-col gap-5">
          <TaskFilter onFilterChange={setFilters}/>
          <TaskList tasks={filteredTasks} onDelete={handleDelete} onStatusChange={handleStatusChange}/>
        </div>
      </div>
    </div>
  );
}

export default App;