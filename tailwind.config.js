/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Set Inter as default sans-serif font
      },
      colors: {
        purple: { // Define a purple color palette
          '50': '#f5f3ff',
          '100': '#ede9fe',
          '200': '#ddd6fe',
          '300': '#c4b5fd',
          '400': '#a78bfa',
          '500': '#8b5cf6', // Primary purple
          '600': '#7c3aed',
          '700': '#6d28d9',
          '800': '#5b21b6',
          '900': '#4c1d95',
          '950': '#2e1065',
        },
        // Define colors for light mode
        light: {
          background: '#ffffff',
          foreground: '#111827', // gray-900
          card: '#ffffff',
          cardForeground: '#111827',
          popover: '#ffffff',
          popoverForeground: '#111827',
          primary: '#8b5cf6', // purple-500
          primaryForeground: '#ffffff',
          secondary: '#f3f4f6', // gray-100
          secondaryForeground: '#1f2937', // gray-800
          muted: '#f3f4f6', // gray-100
          mutedForeground: '#6b7280', // gray-500
          accent: '#f3f4f6', // gray-100
          accentForeground: '#1f2937', // gray-800
          destructive: '#ef4444', // red-500
          destructiveForeground: '#ffffff',
          border: '#e5e7eb', // gray-200
          input: '#e5e7eb', // gray-200
          ring: '#a78bfa', // purple-400
        },
        // Define colors for dark mode
        dark: {
          background: '#111827', // gray-900
          foreground: '#f9fafb', // gray-50
          card: '#1f2937', // gray-800
          cardForeground: '#f9fafb', // gray-50
          popover: '#1f2937', // gray-800
          popoverForeground: '#f9fafb', // gray-50
          primary: '#a78bfa', // purple-400
          primaryForeground: '#111827', // gray-900
          secondary: '#374151', // gray-700
          secondaryForeground: '#f9fafb', // gray-50
          muted: '#374151', // gray-700
          mutedForeground: '#9ca3af', // gray-400
          accent: '#374151', // gray-700
          accentForeground: '#f9fafb', // gray-50
          destructive: '#f87171', // red-400
          destructiveForeground: '#111827', // gray-900
          border: '#374151', // gray-700
          input: '#374151', // gray-700
          ring: '#8b5cf6', // purple-500
        }
      },
      borderRadius: {
        lg: `0.5rem`,
        md: `calc(0.5rem - 2px)`,
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
}
