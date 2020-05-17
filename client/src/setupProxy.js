const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const middlweare = createProxyMiddleware({
    target: 'http://localhost:3123',
    changeOrigin: true,
    logLevel: 'silent'
  });
  app.use('/api/*', middlweare);
  app.use('/auth/*', middlweare);
};
