import { ArrowsUpDownIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { type TaskStatus } from "./TaskList";

export type SortField = 'priority' | 'dueDate' | null;
export type SortOrder = 'asc' | 'desc';

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    sortBy?: SortField;
    sortOrder?: SortOrder;
  }) => void;
}

function TaskFilter({onFilterChange} : TaskFilterProps) {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const [priority, setPriority] = useState< 'low' | 'medium' | 'high' | 'all' >('all');
  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const notifyChange = (
    updatedStatus = status,
    updatedPriority = priority,
    updatedSortBy = sortBy,
    updatedSortOrder = sortOrder,
  ) => {
    onFilterChange({
      status: updatedStatus === 'all' ? undefined : updatedStatus,
      priority: updatedPriority === 'all' ? undefined: updatedPriority,
      sortBy: updatedSortBy ?? undefined,
      sortOrder: updatedSortBy ? updatedSortOrder : undefined,
    });
  }

  const handleStatusChange = (value: TaskStatus | 'all') => {
    setStatus(value);
    notifyChange(value, priority, sortBy, sortOrder);
  };

  const handlePriorityChange = (value: 'low' | 'medium' | 'high' | 'all') => {
    setPriority(value);
    notifyChange(status, value, sortBy, sortOrder);
    // onFilterChange({
    //   status: status === 'all' ? undefined : status,
    //   priority: value === 'all' ? undefined : value,
    // });
  };

  const handleSortToggle = (field: 'priority' | 'dueDate') => {
    let newOrder: SortOrder = 'asc';

    if (sortBy === field) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    setSortBy(field);
    setSortOrder(newOrder);
    notifyChange(status, priority, field, newOrder);
  };

  const renderSortIcon = (field: 'priority' | 'dueDate') => {
    if (sortBy !== field) {
      return <ArrowsUpDownIcon className="size-5" />
    }
    return sortOrder === 'asc' ? (
      <ArrowUpIcon className="size-5" /> 
    ) : (
      <ArrowDownIcon className="size-5" />
    );
  };

  return (
    <div className="border-3 rounded-lg w-full p-5 shadow-md shadow-black">
      <div className="flex flex-col xl:flex-row gap-5 pb-5 justify-between">
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
        <div className="flex flex-col w-fit xl:items-center">
          <h5 className="font-semibold text-lg">Sort By</h5>
          <div className="flex flex-col xl:flex-row gap-3">
            <button 
            type="button"
            className={`border-2 rounded-sm px-2 shadow-md shadow-black flex items-center justify-between gap-1
            ${sortBy === 'priority' ? 'bg-gray-200 font-semibold' : ''}
            `}
            onClick={() => handleSortToggle('priority')}
            >Priority{renderSortIcon('priority')}
            </button>
            <button
            type="button"
            className={`border-2 rounded-sm px-2 shadow-md shadow-black flex items-center justify-between gap-1
            ${sortBy === 'dueDate' ? 'bg-gray-200 font-semibold' : ''}
            `}
            onClick={() => handleSortToggle('dueDate')}
            >Due Date{renderSortIcon('dueDate')}
            </button>
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