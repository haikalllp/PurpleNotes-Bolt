/**
 * Represents a single task item.
 */
export interface Task {
  id: number; // Unique identifier for the task
  text: string; // The content of the task
  completed: boolean; // Whether the task is marked as done
}

/**
 * Represents a single note item.
 */
export interface Note {
  id: string; // Unique identifier
  title: string; // Optional title
  content: string; // Main content
  reminderEnabled: boolean; // Is reminder set?
  reminderDateTime: string; // ISO string for reminder time, empty if not enabled
  createdAt: string; // ISO string for creation time
  reminderDismissed?: boolean; // Flag to track if the reminder popup was dismissed
}

/**
 * Represents a single clipboard item.
 */
// Placeholder for ClipboardItem type if needed later
// export interface ClipboardItem {
//   id: number;
//   text: string;
//   copiedAt: string;
// }
