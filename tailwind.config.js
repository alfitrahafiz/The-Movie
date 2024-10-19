/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        bg: '#F0F4F8', // Very Light Grayish Blue
        primary: '#6A5ACD', // Slate Blue
        secondary: '#FF69B4', // Hot Pink
        text: '#2C3E50', // Dark Slate Gray
        surface: '#FFFFFF', // White
        accent: '#FFD700', // Gold

        // Dark mode colors
        darkBg: '#1E1E1E', // Very Dark Gray (Almost Black)
        darkPrimary: '#9370DB', // Medium Purple
        darkSecondary: '#FF1493', // Deep Pink
        darkText: '#E0E0E0', // Very Light Gray
        darkSurface: '#2C2C2C', // Dark Gray
        // Note: darkAccent is same as accent for consistency
      },
    },
  },
  plugins: [],
};
