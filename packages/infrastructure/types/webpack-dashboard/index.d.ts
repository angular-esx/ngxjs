import { Plugin } from 'webpack';

export = WebpackDashboardPlugin;


declare class WebpackDashboardPlugin extends Plugin {
  constructor (options?: any);
}