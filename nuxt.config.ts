// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  ssr: true,

  css: ["@/assets/css/inter.css"],

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",

    "@nuxt/image",
    "@vueuse/motion/nuxt",
    "@formkit/auto-animate/nuxt",
  ],

  headlessui: {
    prefix: "Headless",
  },
});
