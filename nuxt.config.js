export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'karaoke',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],
  server: {
    port: 3001,
  },
  axios: {
    baseUrl:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3001'
        : 'http://karaoke.speedy-schumachers.ml',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/toasts.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-socket-io',
  ],
  io: {
    sockets: [
      {
        url:
          process.env.NODE_ENV !== 'production'
            ? 'http://localhost:3001'
            : 'http://karaoke.speedy-schumachers.ml',
        default: true,
      },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.node = {
        fs: 'empty',
      }
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          esModule: false,
        },
      })
    },
  },
}
