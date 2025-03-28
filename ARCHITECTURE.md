# Purple Notes - Application Architecture

This document outlines the architecture of the Purple Notes application.

## 1. Overview

Purple Notes is a single-page application (SPA) built using React, TypeScript, and Tailwind CSS. It aims to provide a unified interface for notes, tasks, clipboard management, and a work-break timer. The architecture prioritizes modularity, type safety, and a clean separation of concerns.

## 2. Core Technologies

*   **React:** Used for building the user interface declaratively with components.
*   **TypeScript:** Provides static typing for improved code quality, maintainability, and developer experience.
*   **Tailwind CSS:** A utility-first CSS framework used for styling the application and enabling responsive design and theming (dark/light modes).
*   **Vite:** A fast frontend build tool used for development and production builds.
*   **Lucide React:** Used for icons.

## 3. Project Structure

The project follows a feature-oriented structure within the `src` directory:

```
src/
├── components/     # Small, reusable UI elements (Button, Input, Card, Modal, Timer)
├── sections/       # Major application features (NotesSection, TasksSection, ClipboardSection)
│   ├── Notes/
│   │   ├── NotesSection.tsx
│   │   ├── NoteCard.tsx
│   │   └── AddNoteForm.tsx
│   ├── Tasks/
│   │   ├── TasksSection.tsx
│   │   ├── TaskItem.tsx
│   │   └── AddTaskForm.tsx
│   └── Clipboard/
│       ├── ClipboardSection.tsx
│       └── ClipboardItem.tsx
├── hooks/          # Custom React Hooks (useLocalStorage, useTheme, useTimer)
├── types/          # Shared TypeScript interfaces and types (Note, Task, ClipboardItem)
├── contexts/       # React Context providers (e.g., ThemeContext) - If needed
├── styles/         # Additional global styles or base configurations (minimal)
├── lib/            # Utility functions (e.g., date formatting, code detection)
├── App.tsx         # Main application component, orchestrates layout and sections
├── main.tsx        # Application entry point, renders App component
└── index.css       # Tailwind directives, global styles, font imports
```

## 4. Component Architecture

*   **`App.tsx`:** The root component responsible for the overall layout (header, main content area, footer), theme management, and rendering the main sections.
*   **Section Components (`NotesSection`, `TasksSection`, `ClipboardSection`):** Each section manages its own state (e.g., list of notes, tasks) and logic. They fetch/save data (initially via `useLocalStorage`) and render lists of items using corresponding item components.
*   **Item Components (`NoteCard`, `TaskItem`, `ClipboardItem`):** Represent individual items within a section. They receive data via props and may handle item-specific interactions (e.g., marking a task complete, copying clipboard content).
*   **Form Components (`AddNoteForm`, `AddTaskForm`):** Handle user input for creating new items, including the prompting logic.
*   **Generic Components (`components/`):** Dumb, reusable UI elements like buttons, modals, inputs, cards, etc., styled with Tailwind.
*   **`Timer.tsx` (`components/`):** A self-contained component managing the work-break timer logic and UI, placed in the header.

## 5. State Management

*   **Local Component State (`useState`):** Used for managing UI state within individual components (e.g., form inputs, modal visibility).
*   **Section State (`useState` within Section Components):** Each major section component manages its list of items (notes, tasks, etc.).
*   **Persistence (`useLocalStorage` Hook):** A custom hook abstracts the logic for reading from and writing to the browser's `localStorage`. This hook is used by section components to persist their data across sessions.
*   **Theme State (`useState` in `App.tsx`):** The current theme ('light' or 'dark') is managed in the root `App` component and passed down or managed via Context if needed by deeply nested components. The theme is also persisted using `localStorage`.

## 6. Styling and Theming

*   **Tailwind CSS:** Used for all styling. Utility classes are applied directly in the TSX components.
*   **`tailwind.config.js`:** Defines the custom purple color palette, extends the default theme (e.g., with the Inter font), and configures dark mode (`darkMode: 'class'`).
*   **Dark/Light Mode:** Implemented by toggling a `dark` class on the `<html>` element. Tailwind's `dark:` variants are used to apply styles conditionally. Theme switching logic resides in `App.tsx`.
*   **`index.css`:** Contains Tailwind's base, components, and utilities directives, plus base HTML/body styling and font imports.

## 7. Routing

*   As a single-page application without distinct pages, traditional routing (like `react-router-dom`) is not required initially. All content resides on the main page. If future requirements involve separate views (e.g., settings page), a router could be added.

## 8. Data Flow

*   Data primarily flows downwards from parent components (Sections) to child components (Items) via props.
*   User interactions (e.g., adding a note, completing a task) trigger handler functions defined in the parent (Section) components. These handlers update the state, which causes React to re-render the UI.
*   The `useLocalStorage` hook synchronizes the state managed by Section components with the browser's local storage.

## 9. Future Considerations

*   **API Integration:** Replace `localStorage` with API calls if backend persistence is required. This would involve fetching data on load and sending updates to a server.
*   **Global State Management:** If state becomes complex or needs to be shared across unrelated sections, consider libraries like Zustand or Redux Toolkit, or leverage React Context more extensively.
*   **Advanced Notifications:** Replace basic `alert` or `Notification` API with a more robust toast notification library for reminders and timer alerts.
*   **Accessibility:** Ensure components are built with accessibility best practices (semantic HTML, ARIA attributes).
*   **Testing:** Implement unit and integration tests using libraries like Vitest and React Testing Library.
