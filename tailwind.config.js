/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF6B35',
          DEFAULT: '#F7931E',
          dark: '#E67E00',
        },
        secondary: {
          light: '#4A7C59',
          DEFAULT: '#2D5016',
          dark: '#1A3009',
        },
        accent: {
          DEFAULT: '#1E88E5',
          light: '#42A5F5',
          dark: '#1565C0',
        },
        cream: '#FFFEF2',
        textDark: '#333333',
        success: '#4CAF50',
        warning: '#FFA726',
        error: '#EF5350',
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans', 'system-ui', 'sans-serif'],
        odia: ['Noto Sans Oriya', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
