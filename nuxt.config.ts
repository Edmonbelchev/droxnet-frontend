// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Disable Server Side rendering
  ssr: false,

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@vesp/nuxt-fontawesome",
    "nuxt-icon",
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      pusher: {
        appKey: process.env.PUSHER_APP_KEY,
        cluster: process.env.PUSHER_APP_CLUSTER,
      },
    },
  },

  // routeRules: {
  //   "/": { swr: true },
  //   "/**": { ssr: false },
  // },

  fontawesome: {
    icons: {
      solid: ["chevronDown", "magnifyingGlass"],
      regular: ["user"],
      brands: [
        "faTwitter",
        "faInstagram",
        "faFacebookF",
        "faYoutube",
        "faGooglePlusG",
      ],
    },
  },

  compatibilityDate: "2024-09-09",
});