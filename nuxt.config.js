export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'anurag.sh',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        ref: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap',
      },
    ],
  },

  css: ['~/assets/style'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build', 'nuxt-windicss'],

  modules: [],
  build: {},
}
