export default {
  ssr: false,
  target: 'static',
  generate: {
    fallback: '404.html',
  },
  head: {
    title: 'anurag singh',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { property: 'og:title', content: 'anurag singh' },
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

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  colorMode: {
    classSuffix: '',
  },

  windicss: {
    preflight: false,
  },

  css: ['~/assets/style'],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-windicss',
    '@nuxtjs/color-mode',
  ],

  modules: ['@nuxt/content'],
  build: {},
}
