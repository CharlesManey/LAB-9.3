
import type { Task, TaskStatus } from "./TaskList";

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

function TaskItem({task , onStatusChange, onDelete}: TaskItemProps){

  const {id, title, description, status, priority, dueDate} = task;

  return (
    <div className="flex">
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <div className="flex gap-5">
          <h3>Priority: {priority}</h3>
          <h3>Due: {dueDate}</h3>
        </div>
      </div>
      <div>
        <select value={status} onChange={(event) => onStatusChange(id, event.target.value as TaskStatus)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;