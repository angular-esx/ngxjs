import { Configuration } from 'webpack';

import { BaseWebpackConfig } from './_webpack.base';


export class TesingWebpackConfig extends BaseWebpackConfig {

  /* ---------------------Configs---------------------*/

  protected _getDevToolConfig (): Object {
    return {
      devtool: 'inline-source-map',
    };
  }

  /* ---------------------Loaders---------------------*/

  protected _getCompileLoader (): Configuration {
    const { EXCLUDE_MODULES } = this._getConstants();

    const rules = [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader?id=happypack-ts',
            options: {
              transpileOnly: true,
              logLevel: 'error',
            },
          },
          'ngx-template-loader',
        ],
        exclude: EXCLUDE_MODULES,
      },
    ];

    return { module: { rules } };
  }

  protected _getIndexTemplateLoader (): Configuration { return undefined; }

  /* ---------------------Plugins---------------------*/

  protected _getCopyPlugin (): Configuration { return undefined; }

  protected _getIndexPagePlugin (): Configuration { return undefined; }

  /* ---------------------Others---------------------*/

  protected _getConstants (): any {
    if (!this._CONSTANTS) {
      Object.assign(super._getConstants().PATHS, {
        DIST_OUTPUT: this._getAbsolutePath('_dist/tesing'),
        DIST_FONTS: this._getAbsolutePath('_dist/tesing/fonts'),
        DIST_IMAGES: this._getAbsolutePath('_dist/tesing/images'),
        DIST_POLYFILLS: this._getAbsolutePath('_dist/tesing/polyfills'),
        DIST_VENDORS: this._getAbsolutePath('_dist/tesing/vendors'),
        DIST_STYLES: this._getAbsolutePath('_dist/tesing/styles'),
      });
    }

    return this._CONSTANTS;
  }
}
