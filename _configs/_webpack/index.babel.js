/* eslint-disable import/prefer-default-export */
import { environment } from '../../packages/infrastructure';

import { DevelopmentWebpackConfig } from './_webpack.dev';

let _webpackConfig;

if (environment.isDevelopment) {
  _webpackConfig = new DevelopmentWebpackConfig().build();
}


const webpackConfig = _webpackConfig;
export default webpackConfig;
