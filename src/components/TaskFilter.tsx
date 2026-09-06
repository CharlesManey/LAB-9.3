import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { type TaskStatus } from "./TaskList";

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }) => void;
}

function TaskFilter({onFilterChange} : TaskFilterProps) {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const [priority, setPriority] = useState< 'low' | 'medium' | 'high' | 'all' >('all');

  const handleStatusChange = (value: TaskStatus | 'all') => {
    setStatus(value);

    onFilterChange({
      status: value === 'all' ? undefined : value,
      priority: priority === 'all' ? undefined: priority,
    });
  };

  const handlePriorityChange = (value: 'low' | 'medium' | 'high' | 'all') => {
    setPriority(value);

    onFilterChange({
      status: status === 'all' ? undefined : status,
      priority: value === 'all' ? undefined : value,
    });
  };

  return (
    <div className="border-3 rounded-lg w-full p-5 shadow-md shadow-black">
      <div className="flex gap-5 pb-5 justify-between">
        <div>
          <h5 className="font-semibold text-lg">Status</h5>
          <select className="border-2 rounded-sm shadow-md shadow-black" name="status" id="status" value={status} onChange={(event) => handleStatusChange(event.target.value as TaskStatus | 'all')}>
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <h5 className="font-semibold text-lg">Priority</h5>
          <select className="border-2 rounded-sm shadow-md shadow-black" name="priority" id="priority" value={priority} onChange={(event) => handlePriorityChange(event.target.value as 'low' | 'medium' | 'high' | 'all')}>
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="font-semibold text-lg">Sort By</h5>
          <div className="flex gap-3">
            <button className="border-2 rounded-sm px-2 shadow-md shadow-black flex items-center gap-1">Priority<ArrowsUpDownIcon className="size-5"/></button>
            <button className="border-2 rounded-sm px-2 shadow-md shadow-black flex items-center gap-1">Due Date<ArrowsUpDownIcon className="size-5"/></button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="font-semibold text-lg" htmlFor="taskSearch">Search by Title:</label>
        <div className="flex gap-5">
          <input className="w-full border-2 rounded-sm p-1 shadow-sm shadow-black focus:outline-green-600" type="text" 
          name="taskSearch" id="taskSearch" placeholder="Enter task Title here" />
          <button type="submit" className="border-2 rounded-sm px-2 shadow-sm shadow-black">Search</button>
        </div>  
      </div>
    </div>
  );
}

export default TaskFilter;