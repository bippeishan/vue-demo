const { defineConfig } = require('@vue/cli-service');

const targetHost = 'localhost';
const apiHost = targetHost;
const protocol = 'http';

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: `${protocol}://${apiHost}`,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        headers: {
          Host: apiHost,
          Origin: `${protocol}://${apiHost}`,
          Referer: `${protocol}://${apiHost}/`,
        },
      },
    },
  },
});
