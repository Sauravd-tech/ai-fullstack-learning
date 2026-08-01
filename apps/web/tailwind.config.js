/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../libs/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: 'var(--bg-color)',
        bgSecondary: 'var(--input-bg)',
        borderMain: 'var(--border-color)',
        textMain: 'var(--text-color)',
      }
    },
  },
  plugins: [],
}
