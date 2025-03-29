import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Note } from '../../types'; // Import the Note type

interface AddNoteFormProps {
  onAddNote: (noteData: Omit<Note, 'id' | 'createdAt'>) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderDateTime, setReminderDateTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation - ensure title or content exists
    if (title.trim() === '' && content.trim() === '') return;

    onAddNote({
      title: title.trim(),
      content: content.trim(),
      reminderEnabled: reminderEnabled,
      // Ensure reminderDateTime is set only if reminder is enabled
      reminderDateTime: reminderEnabled ? reminderDateTime : '',
    });

    // Reset fields
    setTitle('');
    setContent('');
    setReminderEnabled(false);
    setReminderDateTime('');
  };

  // Get current date/time in the required format for min attribute
  const getMinDateTime = () => {
    const now = new Date();
    // Adjust for local timezone offset
    const offset = now.getTimezoneOffset();
    const localISOTime = new Date(now.getTime() - (offset * 60 * 1000));
    return localISOTime.toISOString().slice(0, 16);
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow space-y-4">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (optional)"
        className="w-full p-3 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-input text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
      />

      {/* Content Textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content..."
        rows={4}
        className="w-full p-3 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-input text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-colors"
      />

      {/* Reminder Section */}
      <div className="flex items-center space-x-4 flex-wrap">
        <label htmlFor="reminder-toggle" className="flex items-center cursor-pointer text-light-foreground dark:text-dark-foreground mb-2 sm:mb-0">
          <input
            id="reminder-toggle"
            type="checkbox"
            checked={reminderEnabled}
            onChange={(e) => setReminderEnabled(e.target.checked)}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          Enable Reminder
        </label>
        {reminderEnabled && (
          <input
            type="datetime-local"
            value={reminderDateTime}
            onChange={(e) => setReminderDateTime(e.target.value)}
            className="p-2 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-input text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
            min={getMinDateTime()} // Prevent past dates/times
            required // Make required if reminder is enabled
          />
        )}
      </div>

      {/* Add Note Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={(title.trim() === '' && content.trim() === '') || (reminderEnabled && !reminderDateTime)} // Disable if content empty OR reminder enabled but no date set
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Note
        </button>
      </div>
    </form>
  );
};

export default AddNoteForm;
