
import type { Task, TaskStatus } from "./TaskList";

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

function TaskItem({task , onStatusChange, onDelete}: TaskItemProps){

  const {id, title, description, status, priority, dueDate} = task;

  const statusColors: Record<TaskStatus, string> = {
    pending: 'bg-yellow-300 text-yellow-950',
    'in-progress': 'bg-blue-500 text-white',
    completed: 'bg-green-500 text-white',
  };

  const formatDate = (dateString: string): string | undefined => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    return `${month}/${day}/${year}`;

  }

  return (
    <div className="flex justify-between border rounded-xl p-5 shadow-md shadow-black">
      <div>
        <h1 className="font-semibold text-lg">{title}</h1>
        <h2 className="whitespace-pre-wrap">{description}</h2>
        <div className="flex gap-5">
          <h3 className={priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}>Priority: {priority}</h3>
          <h3>Due: {formatDate(dueDate)}</h3>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <select className={`border rounded-sm p-0.5 shadow-sm shadow-black ${statusColors[status]}`} value={status} onChange={(event) => onStatusChange(id, event.target.value as TaskStatus)}>
          <option className="bg-white text-black" value="pending">Pending</option>
          <option className="bg-white text-black" value="in-progress">In Progress</option>
          <option className="bg-white text-black" value="completed">Completed</option>
        </select>
        <button className="border rounded-sm p-0.5 shadow-sm shadow-black" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;