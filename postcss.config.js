module.exports = {
  plugins: {
    autoprefixer: {}, // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
    'postcss-px-to-viewport': {
      // options
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      minPixelValue: 1,
      mediaQuery: false,
    }
  }
}