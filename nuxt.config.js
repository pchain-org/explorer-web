export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,
  mode: 'spa',
  loading: {
    color: 'rgba(37, 99, 235, 1)',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Plian Explorer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/api',
    '~/plugins/message',
    '~/plugins/filters',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://api-piscan.plian.org/',
    proxy: true,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: 'https://api-piscan.plian.org/',
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: 'https://api-piscan.plian.org/',
    },
  },
  // api proxy
  proxy: {
    '/blockBrowser': {
      changeOrigin: true,
      target: 'https://api-piscan.plian.org/', // production
      // pathRewrite: { '^/api': '/' },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
