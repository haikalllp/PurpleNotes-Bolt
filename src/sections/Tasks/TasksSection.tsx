import React from 'react';
import { Task } from '../../types'; // Import Task type
import useLocalStorage from '../../hooks/useLocalStorage'; // Import useLocalStorage hook
import TaskItem from './TaskItem'; // Import TaskItem component
import AddTaskForm from './AddTaskForm'; // Import AddTaskForm component

const TASKS_STORAGE_KEY = 'purple-notes-tasks';

const TasksSection: React.FC = () => {
  // Use useLocalStorage hook to manage tasks state
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_STORAGE_KEY, []);

  const addTask = (text: string) => {
    // Implement adding a new task
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    // Implement toggling task completion
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    // Implement deleting a task
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <section className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tasks</h2>
      {/* Add AddTaskForm component */}
      <AddTaskForm onAddTask={addTask} />
      <div className="mt-4 space-y-2">
        {/* Map over tasks and render TaskItem components */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No tasks yet.</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TasksSection;
