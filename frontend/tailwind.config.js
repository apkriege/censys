/** @type {import('tailwindcss').Config} */
export default {

  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  content: [],
  theme: {
    extend: {
      boxShadow: {
        toast: '-2px 2px 5px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-red-600',
    'bg-sky-500',
    'bg-green-500',
    'bg-green-600',
    'hover:bg-red-700',
    'hover:bg-sky-700',
  ]
}

