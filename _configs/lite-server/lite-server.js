const proxyMiddleware = require('http-proxy-middleware');

module.exports = {
  server: {
    baseDir: './_dist/development',
    index: 'index.html',
    middleware: {
      2: proxyMiddleware('/api', {
        target: 'https://api.server.io',
        secure: false,
      }),
      3: proxyMiddleware('/files', {
        target: 'https://api.server.io',
        secure: false,
      }),
    },
  },
  port: 4200,
};
