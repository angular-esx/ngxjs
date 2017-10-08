import { DevelopmentEnvironment } from '../environments/';

import { WebpackOptionsType } from './_webpack-options.type';
import { DllWebpackConfig } from './_webpack.dll';


const webpackConfig = new DllWebpackConfig(
  new DevelopmentEnvironment(),
  {
    enableDashboard: false,
    enableAot: false,
  } as WebpackOptionsType,
).build();
// tslint:disable-next-line: no-default-export
export default webpackConfig;
