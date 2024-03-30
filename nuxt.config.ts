// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  ssr: false, // Disable Server Side rendering

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vesp/nuxt-fontawesome'
  ],

  runtimeConfig: {
    public: {
      publicUrl: process.env.PUBLIC_URL,
      apiUrl: process.env.API_URL
    }
  },

  fontawesome: {  
    icons: {
      solid: ['chevronDown', 'magnifyingGlass'],
      regular: ['user'],
      brands: ['faTwitter', 'faInstagram', 'faFacebookF', 'faYoutube', 'faGooglePlusG'],
    },
  },
});