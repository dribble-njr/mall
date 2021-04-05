module.exports = {
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