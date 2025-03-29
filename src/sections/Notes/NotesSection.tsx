import React, { useEffect } from 'react';
import { Note } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import AddNoteForm from './AddNoteForm';
import NoteCard from './NoteCard';

const NOTES_STORAGE_KEY = 'purple-notes-notes';

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>(NOTES_STORAGE_KEY, []);
  const [notificationPermission, setNotificationPermission] = React.useState(Notification.permission);

  // Effect to request notification permission on mount if not already granted/denied
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  const handleAddNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(), // Store as ISO string
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleReminderDue = (note: Note) => {
    console.log('Reminder due for note:', note.id, notificationPermission);
    if (notificationPermission === 'granted') {
      const notificationBody = note.content.length > 50
        ? `${note.content.substring(0, 50)}...`
        : note.content;

      new Notification(note.title || 'Note Reminder', {
        body: notificationBody || 'Your reminder is due!',
        icon: '/notebook-pen.svg', // Optional: Add an icon path relative to public folder
        tag: note.id, // Use note ID as tag to prevent duplicate notifications if component re-renders
      });
    } else if (notificationPermission === 'default') {
      // Maybe prompt user again or guide them? For now, just log.
      console.warn('Notification permission not granted. Requesting again...');
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
        if (permission === 'granted') {
          // Retry notification immediately after permission granted
          handleReminderDue(note);
        }
      });
    } else {
      // Permission denied - can't show notification
      console.error('Notification permission denied.');
      // Optionally, provide feedback to the user that notifications are blocked.
    }
  };

  return (
    <section aria-labelledby="notes-heading" className="space-y-6">
      <h2 id="notes-heading" className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
        Notes
      </h2>

      {/* Add Note Form */}
      <AddNoteForm onAddNote={handleAddNote} />

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-center text-light-muted-foreground dark:text-dark-muted-foreground italic">No notes yet. Add one above!</p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onReminderDue={handleReminderDue}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default NotesSection;
