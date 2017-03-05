// This module is loaded both on the server and the client,
// but some keys won't be available on the client (b/c they're loaded from .env file).

require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  apiKeys: {
    googleCivicInfoApi: process.env.API_KEY_GOOGLE_CIVIC_INFO || '',
    facebookAppId: process.env.FACEBOOK_APP_ID || '',
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET || ''
  },
  app: {
    title: 'neteffective',
    description: 'Use your network to help improve abortion access for everyone',
    head: {
      titleTemplate: 'neteffective %s',
      script: [
        {
          src: 'https://use.typekit.net/hyp6nus.js',
          type: 'text/javascript'
        },
        {
          innerHTML: `try{Typekit.load({ async: true });}catch(e){}`,
          type: 'text/javascript'
        }
      ],
      meta: [
        {name: 'description', content: 'Use your network to help improve abortion access for everyone.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'neteffective'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'neteffective'},
        {property: 'og:description', content: 'Use your network to help improve abortion access for everyone'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@erikras'},
        {property: 'og:creator', content: '@erikras'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://unpkg.com/react-select/dist/react-select.css'}
      ]
    }
  },

}, environment);
