/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./helper/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: "#18181b",
        card: "#18181b",
        "card-border": "#27272a",

        // Text colors
        "text-primary": "#ffffff",
        "text-secondary": "#a1a1aa",
        "text-tertiary": "#71717a",
        "text-muted": "#d4d4d8",
        "text-placeholder": "#6b7280",
        "text-error": "#f87171",

        // Accent colors
        accent: {
          blue: {
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
          },
        },

        // Interactive elements
        "interactive-search": "#a1a1aa",
        "interactive-settings": "#ffffff",
        "interactive-bookmark": "#3b82f6",

        // Status colors
        "status-error": "#f87171",
        "status-success": "#4ade80",
        "status-warning": "#fbbf24",

        // Border colors
        "border-primary": "#27272a",
        "border-secondary": "#3f3f46",

        // Chip colors
        "chip-active": "#2563eb",
        "chip-inactive": "#18181b",
      },
    },
  },
  plugins: [],
};
