export default {
  darkMode: 'class',  // <-- add this line here
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'glow-dot': {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-y-once': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'folding-letter': {
          '0%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
      animation: {
        'glow-dot': 'glow-dot 6s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'spin-y-once': 'spin-y-once 5s ease-in-out forwards',
        'folding-letter': 'folding-letter 2s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};



