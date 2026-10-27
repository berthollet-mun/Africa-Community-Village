/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#690C07', // Rouge profond dominant
          hover: '#520905',   // Version assombrie pour le survol
          light: '#8B1510',   // Version éclaircie
          subtle: '#F9EBEA',
        },
        secondary: {
          DEFAULT: '#EFA62B', // Orange / Ambre
          hover: '#D98E16',
          light: '#FDF3E3',
        },
        tertiary: {
          DEFAULT: '#0E7490', // Teal
          hover: '#095368',
          light: '#E0F2FE',
        },
        success: {
          DEFAULT: '#0E7490', // Teal pour confirmations et succès
          light: '#E0F2FE',
          dark: '#095368',
        },
        neutral: {
          dark: '#232826',    // Charbon pour le texte et zones sombres
          light: '#F3EDE1',   // Sable pour les fonds (Canvas Base)
          card: '#FAF6EF',    // Cartes chaudes
          border: '#E2D7C3',  // Bordures douces
          white: '#FFFFFF',   // À utiliser avec parcimonie pour contraste
        }
      }
    }
  }
};
