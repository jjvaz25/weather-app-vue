module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/weather-app-vue/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}