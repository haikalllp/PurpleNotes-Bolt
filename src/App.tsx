import React, { useState, useEffect } from 'react';
import { Sun, Moon, NotebookPen } from 'lucide-react';
import Timer from './components/Timer';
// Import sections when they are created
import NotesSection from './sections/NotesSection';
import TasksSection from './sections/Tasks/TasksSection'; // Corrected path
// import ClipboardSection from './sections/ClipboardSection';

type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      // Fallback to system preference if no theme is stored
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default theme for SSR or environments without window
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen font-sans bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground transition-colors duration-300`}>
      <header className="sticky top-0 z-10 bg-light-card dark:bg-dark-card shadow-md dark:shadow-lg">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-xl font-bold text-purple-600 dark:text-purple-400">
            <NotebookPen size={28} />
            <span>Purple Notes</span>
          </div>
          <div className="flex items-center space-x-4">
             <Timer /> {/* Minimalist Timer */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-light-foreground dark:text-dark-foreground bg-light-secondary dark:bg-dark-secondary hover:bg-light-muted dark:hover:bg-dark-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Placeholder for sections - uncomment when ready */}
        <NotesSection />
        <TasksSection />
        {/* <ClipboardSection /> */}

        {/* Remove temporary content */}
        {/* <div className="p-6 bg-light-card dark:bg-dark-card rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Welcome to Purple Notes!</h2>
          <p className="text-light-muted-foreground dark:text-dark-muted-foreground">
            Sections for Notes, Tasks, and Clipboard will appear here soon.
          </p>
        </div> */}
      </main>

      <footer className="text-center py-4 text-sm text-light-muted-foreground dark:text-dark-muted-foreground border-t border-light-border dark:border-dark-border mt-12">
        © {new Date().getFullYear()} Purple Notes. Built with React & Tailwind.
      </footer>
    </div>
  );
}

export default App;
