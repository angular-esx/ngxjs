import * as merge from 'webpack-merge';

import { BaseWebpackConfig } from './_webpack.base';


export class UniversalServerWebpackConfig extends BaseWebpackConfig {

  /* ---------------------Configs---------------------*/

  protected _getEntryConfig (): Object {
    const { PATHS } = this._getConstants();

    const entry = [
      ...this._getPolyfills(),
      PATHS.SERVER,
    ];

    return { entry };
  }

  protected _getOutputConfig (): Object {
    const { PATHS } = this._getConstants();

    return {
      output: {
        path: PATHS.DIST_OUTPUT,
        filename: 'server.js',
      },
    };
  }

  protected _getDevToolConfig (): Object {
    return {
      devtool: 'inline-source-map',
    };
  }

  protected _getOtherConfig (): Object {
    return merge(
      super._getOtherConfig(),
      this._getNodeConfig(),
    );
  }

  protected _getNodeConfig (): Object {
    return {
      target: 'node',
      node: {
        global: true,
        crypto: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true
      },
    };
  }

  /* ---------------------Loaders---------------------*/

  protected _getIndexTemplateLoader (): Object { return undefined; }

  /* ---------------------Plugins---------------------*/

  protected _getCleanPlugin (): Object { return undefined; }

  protected _getCopyPlugin (): Object { return undefined; }

  protected _getIndexPagePlugin (): Object { return undefined; }

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
