const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const targetHost = 'localhost';
const apiHost = targetHost;
const protocol = 'http';

module.exports = defineConfig({
  transpileDependencies: true,

  // outputDir: distPath,
  // publicPath: '/',
  // indexPath: path.resolve(__dirname, distPathRoot + 'index.html'),
  // filenameHashing: false,

  // configureWebpack: {
  //   optimization: {
  //     runtimeChunk: 'single',
  //   },
  // },

  devServer: {
    // host: '192.168.188.216',
    // port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      webSocketTransport: 'ws',
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    webSocketServer: 'ws',
    allowedHosts: 'auto',
    // historyApiFallback: true,
    // open: true,
    hot: true,
    // disableHostCheck: true,
    // watchContentBase: false,
    // liveReload: false,
    // proxy: {
    //   '/api': {
    //     target: `${protocol}://${apiHost}`,
    //     changeOrigin: true,
    //     cookieDomainRewrite: 'localhost',
    //     headers: {
    //       Host: apiHost,
    //       Origin: `${protocol}://${apiHost}`,
    //       Referer: `${protocol}://${apiHost}/`,
    //     },
    //   },
    // },
  },
});
