import * as merge from 'webpack-merge';
import * as AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import { AotPlugin } from '@ngtools/webpack';

import { environment } from '../../packages/infrastructure';

import { BaseWebpackConfig } from './_webpack.base';
import { DevelopmentWebpackConfig } from './_webpack.dev';


class AotWebpackConfig extends DevelopmentWebpackConfig {

  /* ---------------------Configs---------------------*/

  protected _getPluginsConfig (): Object {
    return merge(
      super._getPluginsConfig(),
      this._getAotPlugin(),
    );
  }

  /* ---------------------Loaders---------------------*/

  protected _getCompileLoader (): Object {
    const { EXCLUDE_MODULES } = this._getConstants();
    const rules = [
      {
        test: /\.ts$/,
        use: ['@ngtools/webpack'],
        exclude: EXCLUDE_MODULES,
      },
    ];

    return { rules };
  }

  /* ---------------------Plugins---------------------*/

  protected _getAotPlugin (): Object {
    const { PATHS } = this._getConstants();

    const plugins = [
      new AotPlugin({
        tsConfigPath: this._getAbsolutePath('tsconfig.json'),
        entryModule: this._joinPaths(PATHS.APPLICATION_STARTUP, '_app.module#NgxAppModule'),
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

export { AotWebpackConfig };
