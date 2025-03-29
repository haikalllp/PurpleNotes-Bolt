import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

import { Bell } from 'lucide-react'; // Import reminder icons

interface Note {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  reminderEnabled: boolean;
  reminderDateTime: string; // Store as ISO string or similar
  createdAt: Date;
}

function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [currentNote, setCurrentNote] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderDateTime, setReminderDateTime] = useState('');

  const handleAddNote = () => {
    // Basic validation - ensure title or content exists
    if (title.trim() === '' && currentNote.trim() === '') return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      content: currentNote.trim(),
      reminderEnabled: reminderEnabled,
      // Ensure reminderDateTime is set only if reminder is enabled
      reminderDateTime: reminderEnabled ? reminderDateTime : '',
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    // Reset fields
    setTitle('');
    setSubtitle('');
    setCurrentNote('');
    setReminderEnabled(false);
    setReminderDateTime('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <section aria-labelledby="notes-heading" className="space-y-6">
      <h2 id="notes-heading" className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
        Notes
      </h2>

      {/* Input Area */}
      <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow space-y-4">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full p-3 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-input text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
        />

        {/* Subtitle Input */}
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle (optional)"
          className="w-full p-3 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-input text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
        />

        {/* Content Textarea */}
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder="Note content..."
          rows={4}
          className="w-full p-3 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-input text-light-foreground dark:text-dark-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-colors"
        />

        {/* Reminder Section */}
        <div className="flex items-center space-x-4">
          <label htmlFor="reminder-toggle" className="flex items-center cursor-pointer text-light-foreground dark:text-dark-foreground">
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
              // Optional: Add min attribute to prevent past dates
              min={new Date().toISOString().slice(0, 16)}
            />
          )}
        </div>

        {/* Add Note Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAddNote}
            disabled={title.trim() === '' && currentNote.trim() === ''} // Disable if both title and content are empty
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PlusCircle size={18} className="mr-2" />
            Add Note
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-light-muted-foreground dark:text-dark-muted-foreground italic">No notes yet. Add one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow flex justify-between items-start">
              {/* Note Content Area */}
              <div className="flex-1 mr-4 space-y-2">
                {note.title && (
                  <h3 className="text-lg font-semibold text-light-foreground dark:text-dark-foreground">{note.title}</h3>
                )}
                {note.subtitle && (
                  <h4 className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground">{note.subtitle}</h4>
                )}
                {note.content && (
                  <p className="text-light-foreground dark:text-dark-foreground whitespace-pre-wrap break-words">
                    {note.content}
                  </p>
                )}
                {note.reminderEnabled && note.reminderDateTime && (
                  <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 mt-2">
                    <Bell size={14} className="mr-1" />
                    Reminder: {new Date(note.reminderDateTime).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Metadata and Actions Area */}
              <div className="flex flex-col items-end space-y-1 text-xs text-light-muted-foreground dark:text-dark-muted-foreground">
                 <span className="whitespace-nowrap">{note.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                 <span className="whitespace-nowrap">{note.createdAt.toLocaleDateString()}</span>
                 <button
                   onClick={() => handleDeleteNote(note.id)}
                   className="mt-2 p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition-colors"
                   aria-label={`Delete note titled "${note.title || 'Untitled'}" created at ${note.createdAt.toLocaleString()}`}
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default NotesSection;
