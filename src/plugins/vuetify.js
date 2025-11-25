// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/assets/styles/style.scss'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          // primary: '#b283f5ff',
          // secondary: '#03DAC6',
          // error: '#B00020',
          // success: '#00C853',
          // warning: '#FFD600',
        },
      },
    },
  },
})
