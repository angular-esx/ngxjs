import * as merge from 'webpack-merge';
import { AotPlugin } from '@ngtools/webpack';

import { DevelopmentWebpackConfig } from './_webpack.dev';


export class AotWebpackConfig extends DevelopmentWebpackConfig {

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
        entryModule: this._joinPaths(PATHS.APPLICATION_STARTUP, '_app.module.hmr#NgxHmrAppModule'),
      }),
    ];

    return { plugins };
  }
}
