import { DllPlugin } from 'webpack';
import * as merge from 'webpack-merge';

import { BaseWebpackConfig } from './_webpack.base';


export class DllWebpackConfig extends BaseWebpackConfig {
  build () {
    return merge(
      this._getEntryConfig(),
      this._getOutputConfig(),
      this._getResolveConfig(),
      this._getPluginsConfig(),
    );
  }

  /* ---------------------Configs---------------------*/

  protected _getEntryConfig (): Object {
    const { PATHS } = this._getConstants();
    const entry = {};
    entry['polyfills'] = this._getPolyfills();
    entry['vendors'] = this._getVendors();

    return { entry };
  }

  protected _getOutputConfig (): Object {
    const { PATHS } = this._getConstants();

    return {
      output: {
        path: PATHS.DIST_OUTPUT,
        filename: '[name]/index.js',
        library: '[name]',
      },
    };
  }

  protected _getPluginsConfig (): Object {
    return merge(
      this._getCleanPlugin(),
      this._getContextReplacementPlugin(),
      this._getDllPlugin(),
    );
  }

  /* ---------------------Plugins---------------------*/

  protected _getDllPlugin (): Object {
    const { PATHS } = this._getConstants();

    const plugins = [
      new DllPlugin({
        path: this._joinPaths(PATHS.DIST_OUTPUT, '[name]/manifest.json'),
        name: '[name]',
      }),
    ];

    return { plugins };
  }

  /* ---------------------Others---------------------*/

  protected _getConstants (): any {
    if (!this._CONSTANTS) {
      Object.assign(super._getConstants().PATHS, {
        DIST_OUTPUT: this._getAbsolutePath('_dist/development'),
        DIST_FONTS: this._getAbsolutePath('_dist/development/fonts'),
        DIST_IMAGES: this._getAbsolutePath('_dist/development/images'),
        DIST_POLYFILLS: this._getAbsolutePath('_dist/development/polyfills'),
        DIST_VENDORS: this._getAbsolutePath('_dist/development/vendors'),
        DIST_STYLES: this._getAbsolutePath('_dist/development/styles'),
      });
    }

    return this._CONSTANTS;
  }
}
