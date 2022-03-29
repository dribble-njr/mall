module.exports = {
  publicPath: '/mall/',
  devServer: {
    hot: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network'
      }
    }
  }
}