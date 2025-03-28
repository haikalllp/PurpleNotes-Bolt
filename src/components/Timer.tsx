import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';

type TimerMode = 'work' | 'break';

const Timer: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [workDuration, setWorkDuration] = useState<number>(25 * 60); // Default 25 minutes
  const [breakDuration, setBreakDuration] = useState<number>(5 * 60); // Default 5 minutes
  const [timeLeft, setTimeLeft] = useState<number>(workDuration);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationRef = useRef<Notification | null>(null);

  useEffect(() => {
    // Request notification permission on component mount
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    setTimeLeft(mode === 'work' ? workDuration : breakDuration);
    setIsRunning(false); // Stop timer when mode changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [mode, workDuration, breakDuration]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsRunning(false);
            handleTimerEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Close notification if component unmounts
      if (notificationRef.current) {
        notificationRef.current.close();
      }
    };
  }, [isRunning]);

  const handleTimerEnd = () => {
    const message = mode === 'work' ? "Time for a break!" : "Break's over! Back to work.";
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
       notificationRef.current = new Notification("Purple Notes Timer", { body: message });
    } else {
        alert(message); // Fallback for browsers without notification support or permission denied
    }
    // Automatically switch mode
    setMode(prevMode => prevMode === 'work' ? 'break' : 'work');
    // Optionally auto-start the next timer (or require manual start)
    // setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? workDuration : breakDuration);
  };

  const switchMode = (newMode: TimerMode) => {
    if (mode !== newMode) {
        setMode(newMode);
        // Reset timer when switching modes manually
        setIsRunning(false);
        setTimeLeft(newMode === 'work' ? workDuration : breakDuration);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Minimalist UI for the header
  return (
    <div className="flex items-center space-x-2 text-sm">
       <button
        onClick={() => switchMode('work')}
        className={`p-1 rounded ${mode === 'work' ? 'bg-purple-200 dark:bg-purple-700' : 'hover:bg-light-muted dark:hover:bg-dark-muted'}`}
        title="Work Mode"
        aria-label="Switch to Work Mode"
      >
        <Briefcase size={16} className={mode === 'work' ? 'text-purple-700 dark:text-purple-100' : 'text-light-muted-foreground dark:text-dark-muted-foreground'}/>
      </button>
       <button
        onClick={() => switchMode('break')}
        className={`p-1 rounded ${mode === 'break' ? 'bg-purple-200 dark:bg-purple-700' : 'hover:bg-light-muted dark:hover:bg-dark-muted'}`}
        title="Break Mode"
        aria-label="Switch to Break Mode"
      >
        <Coffee size={16} className={mode === 'break' ? 'text-purple-700 dark:text-purple-100' : 'text-light-muted-foreground dark:text-dark-muted-foreground'}/>
      </button>

      <span className="font-mono text-base font-medium text-light-foreground dark:text-dark-foreground w-12 text-center">
        {formatTime(timeLeft)}
      </span>

      <button
        onClick={toggleTimer}
        className="p-1 rounded hover:bg-light-muted dark:hover:bg-dark-muted text-light-foreground dark:text-dark-foreground"
        title={isRunning ? 'Pause Timer' : 'Start Timer'}
        aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
      >
        {isRunning ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button
        onClick={resetTimer}
        className="p-1 rounded hover:bg-light-muted dark:hover:bg-dark-muted text-light-foreground dark:text-dark-foreground"
        title="Reset Timer"
        aria-label="Reset Timer"
      >
        <RotateCcw size={16} />
      </button>

      {/* Optional: Inputs to change durations - could be moved to a settings modal */}
      {/*
      <div className="flex items-center space-x-1">
        <label htmlFor="workDuration" className="sr-only">Work (min):</label>
        <input
          id="workDuration"
          type="number"
          min="1"
          value={workDuration / 60}
          onChange={(e) => setWorkDuration(parseInt(e.target.value) * 60)}
          className="w-10 p-0.5 border border-light-border dark:border-dark-border rounded bg-light-input dark:bg-dark-input text-xs"
          disabled={isRunning}
        />
        <label htmlFor="breakDuration" className="sr-only">Break (min):</label>
        <input
          id="breakDuration"
          type="number"
          min="1"
          value={breakDuration / 60}
          onChange={(e) => setBreakDuration(parseInt(e.target.value) * 60)}
          className="w-10 p-0.5 border border-light-border dark:border-dark-border rounded bg-light-input dark:bg-dark-input text-xs"
          disabled={isRunning}
        />
      </div>
      */}
    </div>
  );
};

export default Timer;
