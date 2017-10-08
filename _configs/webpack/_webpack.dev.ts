import {
  Configuration,
  DllReferencePlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
} from 'webpack';
import * as merge from 'webpack-merge';
import * as DashboardPlugin from 'webpack-dashboard/plugin';
import * as AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

import { BaseWebpackConfig } from './_webpack.base';


export class DevelopmentWebpackConfig extends BaseWebpackConfig {
  private readonly _SERVER_DEV_HOST: string = 'localhost';
  private readonly _SERVER_DEV_PORT: string = '8080';

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

  protected _getPluginsConfig (): Configuration {
    const plugins = [
      new NamedModulesPlugin(),
    ];

    if (!this._options.enableAot) {
      plugins.push(new HotModuleReplacementPlugin());
    }
    if (this._options && this._options.enableDashboard) {
      plugins.push(new DashboardPlugin());
    }

    return merge(
      super._getPluginsConfig(),
      this._getDllPlugin(),
      this._getAddAssetHtmlPlugin(),
      { plugins },
    );
  }

  protected _getOtherConfig (): Configuration {
    return merge(
      super._getOtherConfig(),
      !this._options.enableAot
        ? this._getDevServerConfig()
        : undefined,
    );
  }

  protected _getDevServerConfig (): Configuration {
    const { PATHS } = this._getConstants();

    return {
      /*
        The setup may be problematic on certain versions of Windows, Ubuntu, and Vagrant.
        We can solve this through polling
      */
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1 * 1000,
      },
      devServer: {
        open: true,
        hot: true,
        historyApiFallback: true,
        quiet: false,
        noInfo: true,
        clientLogLevel: 'error',
        host: this._SERVER_DEV_HOST,
        port: this._SERVER_DEV_PORT,
        contentBase: PATHS.DIST_OUTPUT,
        publicPath: `http://${this._SERVER_DEV_HOST}:${this._SERVER_DEV_PORT}/`,
        stats: {
          colors: true,
          errors: true,
          errorDetails: true,
        },
      },
    };
  }

  /* ---------------------Plugins---------------------*/

  protected _getDllPlugin (): Configuration {
    const { PATHS } = this._getConstants();

    const plugins = [
      new DllReferencePlugin({
        context: '.',
        // tslint:disable-next-line: no-require-imports
        manifest: require(this._joinPaths(PATHS.DIST_POLYFILLS, 'manifest.json')),
      }),
      new DllReferencePlugin({
        context: '.',
        // tslint:disable-next-line: no-require-imports
        manifest: require(this._joinPaths(PATHS.DIST_VENDORS, 'manifest.json')),
      }),
    ];

    return { plugins };
  }

  protected _getAddAssetHtmlPlugin (): Configuration {
    const { PATHS } = this._getConstants();

    const plugins = [
      new AddAssetHtmlPlugin({
        publicPath: this._getRelativePath(PATHS.DIST_VENDORS, PATHS.DIST_OUTPUT),
        filepath: this._joinPaths(PATHS.DIST_VENDORS, 'index.js'),
        includeSourcemap: false,
      }),
      new AddAssetHtmlPlugin({
        publicPath: this._getRelativePath(PATHS.DIST_POLYFILLS, PATHS.DIST_OUTPUT),
        filepath: this._joinPaths(PATHS.DIST_POLYFILLS, 'index.js'),
        includeSourcemap: false,
      }),
    ];

    return { plugins };
  }

  protected _getCleanPlugin (): Object { return undefined; }

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
