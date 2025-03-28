# Purple Notes

Purple Notes is a single-page web application designed for seamless productivity. It integrates note-taking, task management, a universal clipboard, and a work-break timer into one unified interface. Built with React, TypeScript, and Tailwind CSS, it features a modern purple theme with dark/light mode toggling.

## Features

*   **Single-Page Application:** All features accessible without page reloads.
*   **Notes Section:** Create, view, and manage notes presented as "notecards." Includes options for titles, subtitles, and reminders.
*   **Tasks Section:** A dynamic to-do list with support for timed tasks, completion marking, and reordering.
*   **Clipboard Section:** A universal clipboard to store text, images, links, etc., with automatic code formatting.
*   **Work-Break Timer:** A Pomodoro-style timer to manage work sessions and breaks with notifications.
*   **Unified Purple Theme:** Consistent modern purple color scheme.
*   **Dark/Light Mode:** Toggle between themes based on preference or system settings.
*   **Responsive Design:** Adapts to various screen sizes using Tailwind CSS.
*   **Consistent Typography:** Uses the Inter font throughout the application.
*   **Persistence:** (Planned/Optional) User data saved using local storage.
*   **Type Safety:** Built with TypeScript for robust code.

## Tech Stack

*   **Frontend:** React, TypeScript (TSX)
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Font:** Inter
*   **Build Tool:** Vite

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository (if applicable):**
    ```bash
    # git clone <repository-url>
    # cd purple-notes
    ```
    *(Note: Git is not available in this environment, this step is for local setup)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

```bash
npm run dev
```

This will start the Vite development server. Open your browser and navigate to the provided local URL (usually `http://localhost:5173`).

### Building for Production

```bash
npm run build
```

This command bundles the application into the `dist` directory, optimized for production deployment.

### Linting

```bash
npm run lint
```

This command runs ESLint to check for code style and potential errors.

## Project Structure

```
purple-notes/
├── public/             # Static assets
│   └── notebook-pen.svg
├── src/
│   ├── components/     # Reusable UI components (e.g., Button, Card, Timer)
│   ├── sections/       # Major feature sections (Notes, Tasks, Clipboard)
│   ├── hooks/          # Custom React hooks (e.g., useLocalStorage, useTheme)
│   ├── types/          # TypeScript type definitions
│   ├── styles/         # Global styles (if needed beyond index.css)
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   ├── index.css       # Tailwind CSS directives and global styles
│   └── vite-env.d.ts   # Vite environment types
├── .eslintrc.cjs       # ESLint configuration
├── index.html          # HTML entry point
├── package.json        # Project metadata and dependencies
├── postcss.config.js   # PostCSS configuration (for Tailwind)
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript compiler options (root)
├── tsconfig.node.json  # TypeScript compiler options (for Node scripts)
├── vite.config.ts      # Vite configuration
└── README.md           # This file
└── ARCHITECTURE.md     # Application architecture details
```

## Contributing

Contributions are welcome! Please follow standard coding practices and ensure linting passes before submitting changes. (Details specific to the project's contribution process would go here).

## License

(Specify license, e.g., MIT)
