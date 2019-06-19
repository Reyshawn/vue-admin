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
    }
  }
}