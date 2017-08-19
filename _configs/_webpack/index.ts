import { environment } from '../../packages/infrastructure';

import { DevelopmentWebpackConfig } from './_webpack.dev';
import { TesingWebpackConfig } from './_webpack.test';
import { AotWebpackConfig } from './_webpack.aot';

let _webpackConfig: Object;


if (environment.isDevelopment) {
  _webpackConfig = new DevelopmentWebpackConfig().build();
}
else if (environment.isTesting) {
  _webpackConfig = new TesingWebpackConfig().build();
}
else if (environment.isAot) {
  _webpackConfig = new AotWebpackConfig().build();
}

const webpackConfig: Object = _webpackConfig;
// tslint:disable-next-line: no-default-export
export default webpackConfig;
