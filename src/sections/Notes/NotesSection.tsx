import React, { useState } from 'react'; // Removed unused useEffect
import { Note } from '../../types';
import useLocalStorage from '../../hooks/useLocalStorage';
import AddNoteForm from './AddNoteForm';
import NoteCard from './NoteCard';
import NotificationPopup from '../../components/NotificationPopup'; // Import the custom popup

const NOTES_STORAGE_KEY = 'purple-notes-notes';

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>(NOTES_STORAGE_KEY, []);
  const [popupNote, setPopupNote] = useState<Note | null>(null); // State for the note to show in popup

  // Remove effect for browser notification permission

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

  // Updated handler to set state for the popup
  const handleReminderDue = (note: Note) => {
    console.log('Reminder due for note:', note.id);
    setPopupNote(note); // Set the note to be displayed in the popup
  };

  // Handler to close the popup and mark reminder as dismissed
  const handleClosePopup = () => {
    if (popupNote) {
      // Update the specific note in the notes array to mark as dismissed
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === popupNote.id
            ? { ...note, reminderDismissed: true }
            : note
        )
      );
    }
    setPopupNote(null); // Close the popup visually
  };

  return (
    <section aria-labelledby="notes-heading" className="space-y-6 relative"> {/* Add relative positioning */}
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

      {/* Render the popup conditionally */}
      {popupNote && (
        <NotificationPopup
          note={popupNote}
          onClose={handleClosePopup}
        />
      )}
    </section>
  );
};

export default NotesSection;
