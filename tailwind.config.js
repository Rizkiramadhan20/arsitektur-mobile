/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        background: "var(--background)",
        card: "var(--card)",
        "card-border": "var(--card-border)",

        // Text colors
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        muted: "var(--text-muted)",
        placeholder: "var(--text-placeholder)",
        error: "var(--text-error)",

        // Accent colors
        accent: {
          blue: {
            400: "var(--accent-blue-400)",
            500: "var(--accent-blue-500)",
            600: "var(--accent-blue-600)",
          },
        },

        // Interactive elements
        "interactive-search": "var(--interactive-search)",
        "interactive-settings": "var(--interactive-settings)",
        "interactive-bookmark": "var(--interactive-bookmark)",

        // Status colors
        "status-error": "var(--status-error)",
        "status-success": "var(--status-success)",
        "status-warning": "var(--status-warning)",

        // Border colors (use static gray values for native)
        "border-primary": "#e5e7eb", // ~gray-200/300
        "border-secondary": "#d1d5db", // ~gray-300

        // Chip colors
        "chip-active": "var(--chip-active)",
        "chip-inactive": "var(--chip-inactive)",
      },
    },
  },
  plugins: [],
};
