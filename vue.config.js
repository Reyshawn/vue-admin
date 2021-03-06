module.exports = {
  devServer: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/forecast': {
        target: 'https://api.darksky.net/',
        changeOrigin: true
      },
      '/geocoding': {
        target: 'http://www.mapquestapi.com/geocoding/v1/',
        changeOrigin: true,
        pathRewrite: { '^/geocoding': '' }
      },
      '/unsplash': {
        target: 'https://api.unsplash.com/',
        changeOrigin: true,
        pathRewrite: { '^/unsplash': '' }
      }
    }
  }
}
