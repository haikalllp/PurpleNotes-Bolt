import React from 'react';
import { X, Coffee, Briefcase } from 'lucide-react';

type TimerMode = 'work' | 'break';

interface TimerNotificationPopupProps {
  mode: TimerMode; // To determine the icon and message context
  message: string;
  onClose: () => void;
}

const TimerNotificationPopup: React.FC<TimerNotificationPopupProps> = ({ mode, message, onClose }) => {
  // Prevent background scroll when popup is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const Icon = mode === 'work' ? Briefcase : Coffee; // Briefcase for 'back to work', Coffee for 'break time'
  const title = mode === 'work' ? "Work Time!" : "Break Time!";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" // Slightly darker backdrop
      aria-labelledby="timer-notification-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // Close on backdrop click
    >
      <div
        className="relative w-full max-w-sm p-6 m-4 bg-light-card dark:bg-dark-card rounded-lg shadow-xl border border-light-border dark:border-dark-border"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon className="text-purple-600 dark:text-purple-400" size={24} />
            <h2 id="timer-notification-title" className="text-xl font-semibold text-light-foreground dark:text-dark-foreground">
              {title}
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
        <div className="mb-6 text-center"> {/* Centered text */}
          <p className="text-lg text-light-foreground dark:text-dark-foreground">
            {message}
          </p>
        </div>

        {/* Footer / Close Button */}
        <div className="flex justify-center"> {/* Centered button */}
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-dark-card transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerNotificationPopup;
