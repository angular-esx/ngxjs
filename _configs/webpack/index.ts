import {
  DevelopmentEnvironment,
  TestingEnvironment,
  UniversalBrowserEnvironment,
  UniversalServerEnvironment,
} from '../environments/';

import { WebpackOptionsType } from './_webpack-options.type';
import { DevelopmentWebpackConfig } from './_webpack.dev';
import { TesingWebpackConfig } from './_webpack.test';
import { UniversalBrowserWebpackConfig } from './_webpack.universal.browser';
import { UniversalServerWebpackConfig } from './_webpack.universal.server';


let _webpackConfig: Object;
switch (process.env.BUILD_ENV) {
  case 'development':
  case 'development:aot':
    _webpackConfig = new DevelopmentWebpackConfig(
      new DevelopmentEnvironment(),
      {
        enableDashboard: false,
        enableAot: true,
      } as WebpackOptionsType,
    ).build();
    break;
  case 'development:dashboard':
    _webpackConfig = new DevelopmentWebpackConfig(
      new DevelopmentEnvironment(),
      {
        enableDashboard: true,
        enableAot: false,
      } as WebpackOptionsType,
    ).build();
    break;
  case 'universal:browser':
    _webpackConfig = new UniversalBrowserWebpackConfig(
      new UniversalBrowserEnvironment(),
      {
        enableDashboard: false,
        enableAot: true,
      } as WebpackOptionsType,
    ).build();
    break;
  case 'universal:server':
    _webpackConfig = new UniversalServerWebpackConfig(
      new UniversalServerEnvironment(),
      {
        enableDashboard: false,
        enableAot: false,
      } as WebpackOptionsType,
    ).build();
    break;
  case 'testing':
    _webpackConfig = new TesingWebpackConfig(
      new TestingEnvironment(false),
      {
        enableDashboard: false,
        enableAot: false,
      } as WebpackOptionsType,
    ).build();
    break;
  case 'testing:custom':
    _webpackConfig = new TesingWebpackConfig(
      new TestingEnvironment(true),
      {
        enableDashboard: false,
        enableAot: false,
      } as WebpackOptionsType,
    ).build();
    break;
  default:
    throw new Error(`Invalid process.env.BUILD_ENV: ${process.env.BUILD_ENV}`);
}

const webpackConfig: Object = _webpackConfig;
// tslint:disable-next-line: no-default-export
export default webpackConfig;
