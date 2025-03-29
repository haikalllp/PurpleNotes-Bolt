import React from 'react';
import { Note } from '../types';
import { X, Bell } from 'lucide-react';

interface NotificationPopupProps {
  note: Note;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ note, onClose }) => {
  // Prevent background scroll when popup is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const notificationTitle = note.title || 'Note Reminder';
  const notificationBody = note.content.length > 150
    ? `${note.content.substring(0, 150)}...`
    : note.content || 'Your reminder is due!';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      aria-labelledby="notification-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // Close on backdrop click
    >
      <div
        className="relative w-full max-w-md p-6 m-4 bg-light-card dark:bg-dark-card rounded-lg shadow-xl border border-light-border dark:border-dark-border"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="text-purple-600 dark:text-purple-400" size={20} />
            <h2 id="notification-title" className="text-lg font-semibold text-light-foreground dark:text-dark-foreground">
              {notificationTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-light-muted-foreground dark:text-dark-muted-foreground hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
            aria-label="Close notification"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="mb-6">
          <p className="text-sm text-light-foreground dark:text-dark-foreground whitespace-pre-wrap break-words">
            {notificationBody}
          </p>
        </div>

        {/* Footer / Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-dark-card transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
