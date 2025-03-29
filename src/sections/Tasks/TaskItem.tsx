import React from 'react';
import { Task } from '../../types'; // Import the Task type
import { Trash2 } from 'lucide-react'; // Import an icon for delete

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`flex items-center justify-between p-2 rounded ${task.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 dark:focus:ring-offset-gray-800"
        />
        <span className={`text-gray-800 dark:text-gray-200 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label={`Delete task ${task.text}`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskItem;
