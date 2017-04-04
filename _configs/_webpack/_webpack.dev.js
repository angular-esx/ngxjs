/* eslint-disable global-require, import/no-dynamic-require, import/no-extraneous-dependencies */
import {
  DllReferencePlugin,
  NamedModulesPlugin,
} from 'webpack';
import merge from 'webpack-merge';
import DashboardPlugin from 'webpack-dashboard/plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

import { environment } from '../../packages/infrastructure';

import { BaseWebpackConfig } from './_webpack.base';


class DevelopmentWebpackConfig extends BaseWebpackConfig {
  constructor() {
    super();
    this._SERVER_DEV_HOST = 'localhost';
    this._SERVER_DEV_PORT = 4200;
  }

  /* ---------------------Configs---------------------*/

  _getEntryConfig() {
    const { PATHS } = this._getConstants();

    const entry = [
      ...this._getPolyfills(),
      PATHS.APPLICATION_STARTUP_MAIN,
    ];

    return { entry };
  }

  _getOutputConfig() {
    const { PATHS } = this._getConstants();

    return {
      output: {
        path: PATHS.DIST_OUTPUT,
        filename: 'index.js',
      },
    };
  }

  _getDevToolConfig() {
    return {
      devtool: 'source-map',
    };
  }

  _getPluginsConfig() {
    const plugins = [
      new NamedModulesPlugin(),
    ];

    if (environment.enableDashboard) {
      plugins.push(new DashboardPlugin());
    }

    return merge(
      super._getPluginsConfig(),
      this._getDllPlugin(),
      this._getAddAssetHtmlPlugin(),
      { plugins },
    );
  }

  _getOtherConfig() {
    return merge(
      super._getOtherConfig(),
      this._getDevServerConfig(),
    );
  }

  _getDevServerConfig() {
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
        historyApiFallback: true,
        quiet: true,
        noInfo: true,
        stats: 'errors-only',
        host: this._SERVER_DEV_HOST,
        port: this._SERVER_DEV_PORT,
        contentBase: PATHS.DIST_OUTPUT,
        publicPath: `http://${this._SERVER_DEV_HOST}:${this._SERVER_DEV_PORT}/`,
      },
    };
  }

  /* ---------------------Plugins---------------------*/

  _getDllPlugin() {
    const { PATHS } = this._getConstants();

    const plugins = [
      new DllReferencePlugin({
        context: '.',
        manifest: require(this._joinPaths(PATHS.DIST_POLYFILLS, 'manifest.json')),
      }),
      new DllReferencePlugin({
        context: '.',
        manifest: require(this._joinPaths(PATHS.DIST_VENDORS, 'manifest.json')),
      }),
    ];

    return { plugins };
  }

  _getAddAssetHtmlPlugin() {
    const { PATHS } = this._getConstants();

    const plugins = [
      new AddAssetHtmlPlugin([
        {
          publicPath: this._getRelativePath(PATHS.DIST_POLYFILLS, PATHS.DIST_OUTPUT),
          filepath: this._joinPaths(PATHS.DIST_POLYFILLS, 'index.js'),
          includeSourcemap: false,
        },
        {
          publicPath: this._getRelativePath(PATHS.DIST_VENDORS, PATHS.DIST_OUTPUT),
          filepath: this._joinPaths(PATHS.DIST_VENDORS, 'index.js'),
          includeSourcemap: false,
        },
      ]),
    ];

    return { plugins };
  }

  _getCleanPlugin() { return undefined; }

  /* ---------------------Loaders---------------------*/

  _getStyleLoader() {
    const { INCLUDE_STYLES } = this._getConstants();

    const rules = [
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader?sourceMap',
        ],
        include: INCLUDE_STYLES,
      },
    ];

    return { rules };
  }
}


export { DevelopmentWebpackConfig };
