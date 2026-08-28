
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
    <div className="flex gap-5">
      <div>
        <h5>Status</h5>
        <select className="border-2" name="" id="" value={status} onChange={(event) => handleStatusChange(event.target.value as TaskStatus | 'all')}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <h5>Priority</h5>
        <select className="border-2" name="" id="" value={priority} onChange={(event) => handlePriorityChange(event.target.value as 'low' | 'medium' | 'high' | 'all')}>
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;