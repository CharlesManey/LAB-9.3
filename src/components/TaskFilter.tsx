import { type TaskStatus } from "./TaskList";

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }) => void;
}

function TaskFilter() {

  return (
    <div className="flex gap-5">
      <div>
        <h5>Status</h5>
        <select className="border-2" name="" id="">
          <option value="all-statuses">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <h5>Priority</h5>
        <select className="border-2" name="" id="">
          <option value="all-priorities">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;