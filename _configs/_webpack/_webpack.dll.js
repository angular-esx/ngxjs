/* eslint-disable import/no-extraneous-dependencies */
import { DllPlugin } from 'webpack';
import merge from 'webpack-merge';

import { BaseWebpackConfig } from './_webpack.base';


class DllWebpackConfig extends BaseWebpackConfig {
  build() {
    return merge(
      this._getEntryConfig(),
      this._getOutputConfig(),
      this._getResolveConfig(),
      this._getPluginsConfig(),
    );
  }

  /* ---------------------Configs---------------------*/

  _getEntryConfig() {
    const entry = {
      polyfills: this._getPolyfills(),
      vendors: this._getVendors(),
    };

    return { entry };
  }

  _getOutputConfig() {
    const { PATHS } = this._getConstants();

    return {
      output: {
        path: PATHS.DIST_OUTPUT,
        filename: '[name]/index.js',
        library: '[name]',
      },
    };
  }

  _getPluginsConfig() {
    return merge(
      this._getCleanPlugin(),
      this._getNoEmitOnErrorsPlugin(),
      this._getContextReplacementPlugin(),
      this._getDllPlugin(),
    );
  }

  /* ---------------------Plugins---------------------*/

  _getDllPlugin() {
    const { PATHS } = this._getConstants();

    const plugins = [
      new DllPlugin({
        path: this._joinPaths(PATHS.DIST_OUTPUT, '[name]/manifest.json'),
        name: '[name]',
      }),
    ];

    return { plugins };
  }
}

export { DllWebpackConfig };
