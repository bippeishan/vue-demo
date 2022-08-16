const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const apiHost = 'localhost:7001';
const protocol = 'http';

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      webSocketTransport: 'ws',
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    webSocketServer: 'ws',
    allowedHosts: 'auto',
    hot: true,
    proxy: {
      '/api': {
        target: `${protocol}://${apiHost}`,
        // pathRewrite: { '^/api': '' },
        changeOrigin: true,
        logLevel: 'debug',
        // cookieDomainRewrite: 'localhost',
        // headers: {
        //   Host: apiHost,
        //   Origin: `${protocol}://${apiHost}`,
        //   Referer: `${protocol}://${apiHost}/`,
        // },
      },
    },
  },
});
