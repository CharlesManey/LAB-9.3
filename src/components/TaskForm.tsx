import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { type Task } from "./TaskList";

interface TaskFormProps {
  onAddTask?: (task: Task) => void;
}

interface FormData {
  title: string;
  description: string;
  dueDate: string;
  priority: 'select' | 'high' | 'medium' | 'low';
}

const initFormState: FormData = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'select',
};

function TaskForm({onAddTask}: TaskFormProps) {
  const [formData, setFormData] = useState<FormData>(initFormState);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    
    if (!formData.title.trim() || formData.priority === 'select') {
      alert('Please enter a task title and select a priority level.');
      return;
    }

    if (onAddTask) {
      onAddTask({
        id: crypto.randomUUID(),
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority as 'high' | 'medium' | 'low',
        status: 'pending',
      });
    }

    setFormData(initFormState);
  };

  return (
    <div>
      <div className="w-full xl:min-w-xl pb-5">
        <form className="border-3 rounded-lg w-full p-5 flex flex-col gap-5 shadow-md shadow-black" action="" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-xl font-semibold" htmlFor="title">Title: </label>
              <input className="w-full border-2 rounded-sm p-1 shadow-sm shadow-black focus:outline-green-600" type="text" placeholder="What shall we call this task?" 
              id="title" name="title" value={formData.title} onChange={handleChange} required/>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-semibold" htmlFor="description">Description: </label>
              <textarea className="w-full border-2 rounded-sm p-1 shadow-sm shadow-black focus:outline-green-600 min-h-fit max-h-100 resize-y" placeholder="What needs to be done?" 
              id="description" name="description" value={formData.description} onChange={handleChange} rows={2}/>
            </div>
            <div className="flex flex-col">
              <label className="text-xl font-semibold" htmlFor="dueDate">Due Date: </label>
              <input className="w-fit border-2 rounded-sm p-1 shadow-sm shadow-black focus:outline-green-600" type="date" placeholder="Expected completion date?" 
              id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} required/>
            </div>
            <select className="p-1 border-2 rounded-sm w-fit shadow-sm shadow-black focus:outline-green-600" name="priority" id="" value={formData.priority} onChange={handleChange}>
              <option value="select">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button type="submit" className="border-2 rounded-sm shadow-md shadow-black p-1 w-1/3 self-center">Add New Task</button>
          </form>
      </div>
    </div>
  );
}

export default TaskForm;
