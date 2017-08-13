import { environment } from '../../packages/infrastructure';

import { DevelopmentWebpackConfig } from './_webpack.dev';
import { TesingWebpackConfig } from './_webpack.test';

let _webpackConfig: Object;


if (environment.isDevelopment) {
  _webpackConfig = new DevelopmentWebpackConfig().build();
}
else if (environment.isTesting) {
  _webpackConfig = new TesingWebpackConfig().build();
}

const webpackConfig: Object = _webpackConfig;
// tslint:disable-next-line: no-default-export
export default webpackConfig;
