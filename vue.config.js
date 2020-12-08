const { name, version, description } = require('./package.json')

const base = `/${name}/`

process.env.VUE_APP_BASE = base
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_TITLE = description

const target = 'dev path'

const apiList = ['']

const devServer = {
  open: true,
  host: '0.0.0.0',
  port: 8090,
  https: false,
  proxy: apiList.reduce((x, y) => ({
    ...x,
    [`/${y}`]: {
      changeOrigin: true,
      ws: true,
      target
    }
  }))
}

const isTest = process.env.VUE_APP_IS_PROD === 'false'

const publicPath = process.env.NODE_ENV === 'development' ? '/' : [isTest ? '' : '正式环境path', base].join('')

module.exports = {
  publicPath,
  outputDir: `dist/${name}`,
  assetsDir: process.env.VUE_APP_ASSETS_DIR,
  lintOnSave: true,
  productionSourceMap: isTest,
  filenameHashing: true,
  devServer,
  configureWebpack: config => {
    config.externals = {
      BMap: 'BMap'
    }
    if (process.env.NODE_ENV === 'production') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: '../report.html'
        })
      )
    }
  }
}
