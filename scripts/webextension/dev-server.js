const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../../src/shells/webextension/webpack.config.js');
const path = require('path');

const { TARGET_BROWSER } = process.env;
const rootDir = path.join(__dirname, '../../');

require('./prepare');

const HR_PORT = 5000;

for (const entryName in config.entry) {
  if (Object.prototype.hasOwnProperty.call(config.entry, entryName)) {
    config.entry[entryName] = [
      // `webpack-dev-server/client?http://localhost:${HR_PORT}/`,
      // 'webpack-dev-server/client', // old; this already gets added automatically by WebpackDevServer below
      'webpack/hot/dev-server',
    ].concat(config.entry[entryName]);
    // console.log("Paths:", config.entry[entryName]);
  }
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  // host: `http://localhost:${HR_PORT}`,
  host: 'localhost',
  port: HR_PORT,
  disableHostCheck: true,
  // sockHost: 'localhost',
  // sockPort: HR_PORT,
  hot: true,
  contentBase: path.join(rootDir, 'lib', TARGET_BROWSER),
  headers: { 'Access-Control-Allow-Origin': '*' },
});

server.listen(HR_PORT);
