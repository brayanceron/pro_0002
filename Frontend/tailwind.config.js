/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flyonui/dist/js/*.js',
    "./node_modules/notyf/**/*.js", // '../path/to/notyf/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
  ],
  flyonui: {
    vendors: true // Enable vendor-specific CSS generation
  }
}

