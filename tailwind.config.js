/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2C5F4F',
        secondary: '#3D7A68',
        accent: '#4D9B82',
        background: '#FAF8F5',
        'dark-bg': '#1A1A1A',
        'dark-card': '#2A2A2A',
        muted: '#6B6B6B'
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Crimson Text', 'Georgia', 'serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.dark-bg'),
            a: {
              color: theme('colors.accent'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            h1: {
              color: theme('colors.dark-bg'),
              fontWeight: '800',
            },
            h2: {
              color: theme('colors.dark-bg'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.dark-bg'),
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
