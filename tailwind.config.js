/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FF5722',
        'orange-light': '#FF8A65',
        yellow: '#FFC107',
        dark: '#0D0D0D',
        dark2: '#1A1A1A',
        dark3: '#252525',
        card: '#1E1E1E',
        muted: '#999999',
        border: '#2E2E2E',
        green: '#00C853',
        red: '#FF1744',
        blue: '#2196F3',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'cursive'],
        dm: ['var(--font-dm)', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
}
