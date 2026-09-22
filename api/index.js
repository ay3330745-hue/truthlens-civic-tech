const app = require('../server/index');

module.exports = (req, res) => {
  // Ensure req.url starts with /api so Express routes match seamlessly on Vercel Serverless
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
};
