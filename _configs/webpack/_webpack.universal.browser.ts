import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';

import { BaseWebpackConfig } from './_webpack.base';


export class UniversalBrowserWebpackConfig extends BaseWebpackConfig {

  /* ---------------------Configs---------------------*/

  protected _getEntryConfig (): Configuration {
    const { PATHS } = this._getConstants();

    const entry = [
      ...this._getPolyfills(),
      this._options.enableAot
        ? PATHS.APPLICATION_STARTUP_MAIN_AOT
        : PATHS.APPLICATION_STARTUP_MAIN,
    ];

    return { entry };
  }

  protected _getOutputConfig (): Configuration {
    const { PATHS } = this._getConstants();

    return {
      output: {
        path: PATHS.DIST_OUTPUT,
        filename: `main.js`,
      },
    };
  }

  protected _getDevToolConfig (): Configuration {
    return { devtool: 'source-map' };
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
