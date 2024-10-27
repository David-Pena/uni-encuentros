export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Main brand colors
        primary: '#2BAFFC',    // Blue - main actions, links, primary buttons
        secondary: '#55C360',  // Green - success states, secondary actions
        muted: '#94A3B8',     // Slate gray - disabled states, secondary text

        // Monochrome scale
        dark: '#010101',       // Black - text, dark backgrounds
        light: '#F4F9FD',      // Polar - light backgrounds, cards

        // You might need variations of these colors
        'primary-light': '#54BFFD',  // Lighter blue for hover states
        'primary-dark': '#1A9FEC',   // Darker blue for active states
        'secondary-light': '#6DD076', // Lighter green for hover states
        'secondary-dark': '#44B24F',  // Darker green for active states
      },
    },
  },
  plugins: [],
}
