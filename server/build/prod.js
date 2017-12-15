const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ReactDom = require('react-dom/server');
const appServer = require('../../dist/app-server.js').default;

const template = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf8');

router.get('*', (req, res) => {
  const html = template.replace('<!-- app -->', ReactDom.renderToString(appServer));
  res.send(html);
});

module.exports = (app) => {
  app.use('/assets', express.static(path.join(__dirname, '../../dist')));
  app.use(router);
};
