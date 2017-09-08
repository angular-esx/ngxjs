import * as merge from 'webpack-merge';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';

import { BaseWebpackConfig } from './_webpack.base';


class UniversalBrowserWebpackConfig extends BaseWebpackConfig {

  /* ---------------------Configs---------------------*/

  protected _getEntryConfig (): Object {
    const { PATHS } = this._getConstants();

    const entry = [
      ...this._getPolyfills(),
      PATHS.APPLICATION_STARTUP_MAIN,
    ];

    return { entry };
  }

  protected _getOutputConfig (): Object {
    const { PATHS } = this._getConstants();

    return {
      output: {
        path: PATHS.DIST_OUTPUT,
        filename: 'index.js',
      },
    };
  }

  protected _getDevToolConfig (): Object {
    return {
      devtool: 'source-map',
    };
  }

  /* ---------------------Others---------------------*/

  protected _getConstants (): any {
    if (!this._CONSTANTS) {
      Object.assign(super._getConstants().PATHS, {
        APPLICATION_STARTUP_MAIN: this._getAbsolutePath('packages/application/startup/_main.browser.ts'),
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

export { UniversalBrowserWebpackConfig };
