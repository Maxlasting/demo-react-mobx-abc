const express = require('express');
const axios = require('axios');
const webpack = require('webpack');
const serverConfig = require('../../build/webpack.config.server.js');
const MemoryFs = require('memory-fs');
const ReactDom = require('react-dom/server');
const path = require('path');
const proxy = require('http-proxy-middleware');

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8081/assets/index.html')
    .then((res) => {
      resolve(res.data)
    })
    .catch(reject)
  });
};

let serverBundle = null;

const Module = module.constructor;
const mfs = new MemoryFs();

// compiler 会监听文件是否有变化，一旦有变化会重新打包
const compiler = webpack(serverConfig);

// 讲打包出来的文件放在内存中，而不是硬盘上
compiler.outputFileSystem = mfs;

compiler.watch({}, (err, stats) => {
  if(err) throw err;
  // stats 包含了所有打包的信息
  stats = stats.toJson();
  stats.errors.forEach((err) => console.error(err));
  stats.warnings.forEach((warn) => console.warn(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  const bundle = mfs.readFileSync(bundlePath, 'utf8');
  const m = new Module();
  m._compile(bundle, 'index-server.js');  //Path must be a string. Received undefined
  serverBundle = m.exports.default;
});

const router = express.Router();

router.get('*', (req, res) => {
  getTemplate().then((template) => {
    const content = ReactDom.renderToString(serverBundle);
    const html = template.replace('<!-- app -->', content);
    res.send(html);
  })
});

module.exports = (app) => {
  // 凡是请求是以  /assets 开头的，那么说明是静态资源，
  // 由于在开发环境 devServer 是在内存中操作的，所以需要代理到对应接口
  app.use('/assets', proxy({
    target: 'http://localhost:8081'
  }));
  app.use(router);
}
