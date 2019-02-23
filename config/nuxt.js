'use strict'

const { resolve } = require('path')

module.exports = {

  build: {
    analyze: {
      analyzerMode: 'static',
      generateStatsFile: true,
      statsFilename: 'webpack-stats.json'
    }
    // vendor: ['vue-material'],
    // extend (config, { isDev, isClient }) {
    //   if (isDev && process.client) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },

  css: [
    '~assets/css/main.css',
    { src: 'bootstrap/dist/css/bootstrap.min.css', lang: 'css' }
  ],

  plugins: [
    { src: '~/plugins/vue-material' }
  ],

  head: {
    title: 'Spotify Chart Busters',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1'
      },
      {
        'http-equiv': 'x-ua-compatible',
        content: 'ie=edge,chrome=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Adonuxt project'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: 'favicon.png'
      }
    ],
    noscript: [{ innerHtml: `
      <h1>Javascript Disabled</h1>
      <p>It appears that you do not have Javascript enabled. This application relies on Javascript for most of our features.<p>
      <p>Please enable Javascript and <a href=".">reload</a> in order to use this site.</p>
    `}]
  },

  loading: {
    color: '#744d82'
  },

  router: {
    base: '/',
    scrollBehaviour: () => ({
      x: 0,
      y: 0
    })
  },

  srcDir: resolve(__dirname, '..', 'resources'),

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    // proxyHeaders: false
  }

}
