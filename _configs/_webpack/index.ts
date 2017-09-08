import { getEnvironment } from '../../packages/infrastructure';

import { DevelopmentWebpackConfig } from './_webpack.dev';
import { TesingWebpackConfig } from './_webpack.test';
import { AotWebpackConfig } from './_webpack.aot';
import { UniversalBrowserWebpackConfig } from './_webpack.universal.browser';
import { UniversalServerWebpackConfig } from './_webpack.universal.server';


const _environment = getEnvironment();
let _webpackConfig: Object;

if (_environment.isDevelopment) {
  _webpackConfig = new DevelopmentWebpackConfig().build();
}
else if (_environment.isTesting) {
  _webpackConfig = new TesingWebpackConfig().build();
}
else if (_environment.isAot) {
  _webpackConfig = new AotWebpackConfig().build();
}
else if (_environment.isUniversalBrowser) {
  _webpackConfig = new UniversalBrowserWebpackConfig().build();
}
else if (_environment.isUniversalServer) {
  _webpackConfig = new UniversalServerWebpackConfig().build();
}

const webpackConfig: Object = _webpackConfig;
// tslint:disable-next-line: no-default-export
export default webpackConfig;
