import {
  Configuration,
  LoaderOptionsPlugin,
} from 'webpack';

import * as merge from 'webpack-merge';

import { BaseWebpackConfig } from './_webpack.base';


export class UniversalServerWebpackConfig extends BaseWebpackConfig {

  /* ---------------------Configs---------------------*/

  protected _getEntryConfig (): Configuration {
    const { PATHS } = this._getConstants();

    const entry = [
      ...this._getPolyfills(),
      this._joinPaths(PATHS.NODE_MODULES, 'rxjs'),
      PATHS.SERVER,
    ];

    return { entry };
  }

  protected _getOutputConfig (): Configuration {
    const { PATHS } = this._getConstants();

    return {
      output: {
        path: PATHS.DIST_OUTPUT,
        filename: 'server.js',
      },
    };
  }

  protected _getDevToolConfig (): Configuration {
    return {
      devtool: 'inline-source-map',
    };
  }

  protected _getOtherConfig (): Configuration {
    return merge(
      super._getOtherConfig(),
      {
        target: 'node',
        node: {
          global: true,
          crypto: true,
          __dirname: true,
          __filename: true,
          process: true,
          Buffer: true,
        },
      },
    );
  }

  /* ---------------------Loaders---------------------*/

  protected _getIndexTemplateLoader (): Configuration { return undefined; }

  /* ---------------------Plugins---------------------*/

  protected _getCleanPlugin (): Configuration { return undefined; }

  protected _getCopyPlugin (): Configuration { return undefined; }

  protected _getIndexPagePlugin (): Configuration { return undefined; }

  /* ---------------------Others---------------------*/

  protected _getConstants (): any {
    if (!this._CONSTANTS) {
      Object.assign(super._getConstants().PATHS, {
        SERVER: this._getAbsolutePath('packages/server/server.ts'),
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
