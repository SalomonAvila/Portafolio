/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 60 / 30 / 10 palette — keep the page to these three.
      colors: {
        paper: '#F7F1E3', // 60% dominant
        'paper-deep': '#ECE2CC',
        ink: '#23304A', // 30% secondary
        accent: '#FF6B4A', // 10% accent
      },
      fontFamily: {
        display: ['var(--font-display)', 'Kalam', 'cursive'],
        body: ['var(--font-body)', 'Patrick Hand', 'cursive'],
        hand: ['var(--font-hand)', 'Caveat', 'cursive'],
        name: ['var(--font-name)', 'Allo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
