export const colors = {
  // Background colors
  background: '#000000', // bg-background
  card: '#18181b', // bg-zinc-900
  cardBorder: '#27272a', // border-zinc-800

  // Text colors
  text: {
    primary: '#ffffff', // text-white
    secondary: '#a1a1aa', // text-zinc-400
    tertiary: '#71717a', // text-zinc-500
    muted: '#d4d4d8', // text-zinc-300
    placeholder: '#6b7280', // placeholder text
    error: '#f87171', // text-red-400
  },

  // Accent colors
  accent: {
    blue: {
      400: '#60a5fa', // text-blue-400
      500: '#3b82f6', // text-blue-500, ActivityIndicator color
      600: '#2563eb', // bg-blue-600
    },
  },

  // Interactive elements
  interactive: {
    searchIcon: '#a1a1aa', // text-zinc-400 for search icon
    settingsIcon: '#ffffff', // text-white for settings icon
    bookmarkIcon: '#3b82f6', // text-blue-500 for bookmark icon
  },

  // Status colors
  status: {
    error: '#f87171', // text-red-400
    success: '#4ade80', // text-green-400 (if needed)
    warning: '#fbbf24', // text-yellow-400 (if needed)
  },

  // Border colors
  border: {
    primary: '#27272a', // border-zinc-800
    secondary: '#3f3f46', // border-zinc-700
  },

  // Chip colors
  chip: {
    active: '#2563eb', // bg-blue-600 for active chip
    inactive: '#18181b', // bg-zinc-900 for inactive chip
  }
} as const

export type Colors = typeof colors
