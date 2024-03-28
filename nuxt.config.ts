// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vesp/nuxt-fontawesome'
  ],

  fontawesome: {  
    icons: {
      solid: ['chevronDown', 'magnifyingGlass'],
      regular: ['user'],
      brands: ['faTwitter', 'faInstagram', 'faFacebookF', 'faYoutube', 'faGooglePlusG'],
    },
  },
});