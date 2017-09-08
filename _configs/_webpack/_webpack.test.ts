import { BaseWebpackConfig } from './_webpack.base';


class TesingWebpackConfig extends BaseWebpackConfig {

  /* ---------------------Configs---------------------*/

  protected _getDevToolConfig (): Object {
    return {
      devtool: 'inline-source-map',
    };
  }

  /* ---------------------Loaders---------------------*/

  protected _getCompileLoader (): Object {
    const { EXCLUDE_MODULES } = this._getConstants();
    const rules = [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
          'ngx-template-loader',
        ],
        exclude: EXCLUDE_MODULES,
      },
    ];

    return { rules };
  }

  protected _getIndexTemplateLoader (): Object { return undefined; }

  /* ---------------------Plugins---------------------*/

  protected _getCopyPlugin (): Object { return undefined; }

  protected _getIndexPagePlugin (): Object { return undefined; }

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

export { TesingWebpackConfig };
