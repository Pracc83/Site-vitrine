/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0F2B1A',
          main: '#2D5A2B',
          accent: '#7BA56B',
        },
        secondary: {
          warm: '#D4A574',
          cool: '#6B8E9C',
        },
        background: '#F8FBF7',
        white: '#FFFFFF',
        text: {
          primary: '#1A1A1A',
        }
      },
      fontFamily: {
        'heading': ['Inter', 'SF Pro Display', 'Poppins', 'sans-serif'],
        'body': ['system-ui', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
