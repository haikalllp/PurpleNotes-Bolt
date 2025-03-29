import React, { useState, useEffect } from 'react';
import { Note } from '../../types';
import { Bell, Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onReminderDue: (note: Note) => void; // Callback for when reminder is due
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onReminderDue }) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isDue, setIsDue] = useState(false);

  useEffect(() => {
    if (!note.reminderEnabled || !note.reminderDateTime) {
      setProgress(0);
      setTimeRemaining('');
      setIsDue(false);
      return;
    }

    const reminderTime = new Date(note.reminderDateTime).getTime();
    const creationTime = new Date(note.createdAt).getTime();
    const totalDuration = reminderTime - creationTime;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const timeDiff = reminderTime - now;

      if (timeDiff <= 0) {
        setProgress(100);
        setTimeRemaining('Reminder due!');
        setIsDue(true);
        onReminderDue(note); // Notify parent component
        clearInterval(intervalId);
      } else {
        const elapsed = now - creationTime;
        const currentProgress = totalDuration > 0 ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)) : 0;
        setProgress(currentProgress);

        // Calculate remaining time (simple version)
        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setIsDue(false);
      }
    }, 1000); // Update every second

    // Initial calculation
    const now = Date.now();
    const timeDiff = reminderTime - now;
    if (timeDiff <= 0) {
        setProgress(100);
        setTimeRemaining('Reminder due!');
        setIsDue(true);
        onReminderDue(note);
        clearInterval(intervalId);
    } else {
        const elapsed = now - creationTime;
        const currentProgress = totalDuration > 0 ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)) : 0;
        setProgress(currentProgress);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        setIsDue(false);
    }


    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [note.reminderDateTime, note.reminderEnabled, note.createdAt, note.id, onReminderDue]);

  const createdAtDate = new Date(note.createdAt);

  return (
    <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg shadow flex justify-between items-start relative overflow-hidden">
      {/* Note Content Area */}
      <div className="flex-1 mr-4 space-y-2">
        {note.title && (
          <h3 className="text-lg font-semibold text-light-foreground dark:text-dark-foreground break-words">{note.title}</h3>
        )}
        {note.content && (
          <p className="text-light-foreground dark:text-dark-foreground whitespace-pre-wrap break-words">
            {note.content}
          </p>
        )}
        {note.reminderEnabled && note.reminderDateTime && (
          <div className="mt-3">
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 mb-1">
              <Bell size={14} className="mr-1 flex-shrink-0" />
              <span className="font-medium">Reminder:</span>
              <span className="ml-1">{new Date(note.reminderDateTime).toLocaleString()}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${isDue ? 'bg-red-500' : 'bg-blue-600 dark:bg-blue-500'}`}
                style={{ width: `${progress}%`, transition: progress > 0 ? 'width 1s linear' : 'none' }}
              ></div>
            </div>
            <p className={`text-xs mt-1 ${isDue ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
              {timeRemaining}
            </p>
          </div>
        )}
      </div>

      {/* Metadata and Actions Area */}
      <div className="flex flex-col items-end space-y-1 text-xs text-light-muted-foreground dark:text-dark-muted-foreground flex-shrink-0">
         <span className="whitespace-nowrap">{createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
         <span className="whitespace-nowrap">{createdAtDate.toLocaleDateString()}</span>
         <button
           onClick={() => onDelete(note.id)}
           className="mt-2 p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition-colors"
           aria-label={`Delete note titled "${note.title || 'Untitled'}" created at ${createdAtDate.toLocaleString()}`}
         >
           <Trash2 size={16} />
         </button>
      </div>
    </div>
  );
};

export default NoteCard;
