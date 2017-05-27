import { environment } from '../../packages/infrastructure';

import { DevelopmentWebpackConfig } from './_webpack.dev';

let _webpackConfig: Object;


if (environment.isDevelopment) {
  _webpackConfig = new DevelopmentWebpackConfig().build();
}

const webpackConfig: Object = _webpackConfig;
// tslint:disable-next-line: no-default-export
export default webpackConfig;
