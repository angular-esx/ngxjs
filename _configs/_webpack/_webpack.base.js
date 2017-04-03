/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import {
  DefinePlugin,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin,
  ContextReplacementPlugin,
} from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';

import { environment } from '../../packages/infrastructure';


class BaseWebpackConfig {
  constructor() {
    this._CONSTANTS = null;
    this._POLYFILLS = null;
    this._VENDORS = null;
    this._CONTEXT = path.resolve(__dirname, '../..');
  }

  build() {
    return merge(
      this._getEntryConfig(),
      this._getOutputConfig(),
      this._getResolveConfig(),
      this._getDevToolConfig(),
      this._getLoadersConfig(),
      this._getPluginsConfig(),
      this._getOtherConfig(),
    );
  }

  /* ---------------------Configs---------------------*/

  _getEntryConfig() { return undefined; }

  _getOutputConfig() { return undefined; }

  _getResolveConfig() {
    const resolve = {
      extensions: ['*', '.js'],
    };

    return { resolve };
  }

  _getDevToolConfig() { return undefined; }

  _getLoadersConfig() {
    const rules = merge.smart(
      this._getCompileLoader(),
      this._getIndexTemplateLoader(),
      this._getHtmlLoader(),
      this._getStyleLoader(),
    );

    return { module: rules };
  }

  _getPluginsConfig() {
    return merge(
      this._getNoEmitOnErrorsPlugin(),
      this._getContextReplacementPlugin(),
      this._getChunkPlugin(),
      this._getEnvironmentPlugin(),
      this._getCleanPlugin(),
      this._getCopyPlugin(),
      this._getIndexPagePlugin(),
      this._getLoaderOptionsPlugin(),
    );
  }

  _getOtherConfig() { return undefined; }

  /* ---------------------Loaders---------------------*/

  _getCompileLoader() {
    const { EXCLUDE_MODULES } = this._getConstants();
    const rules = [
      {
        test: /\.js$/,
        use: [
          'babel-loader?cacheDirectory',
          '@angularclass/hmr-loader',
          'ngx-template-loader',
        ],
        exclude: EXCLUDE_MODULES,
      },
    ];

    return { rules };
  }

  _getIndexTemplateLoader() {
    const { PATHS } = this._getConstants();
    const rules = [
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
        include: PATHS.APPLICATION_STARTUP,
      },
    ];

    return { rules };
  }

  _getHtmlLoader() {
    const { INCLUDE_HTML } = this._getConstants();
    const rules = [
      {
        test: /\.html$/,
        use: ['raw-loader'],
        include: INCLUDE_HTML,
      },
    ];

    return { rules };
  }

  _getStyleLoader() { return undefined; }

  /* ---------------------Plugins---------------------*/

  _getNoEmitOnErrorsPlugin() {
    const plugins = [new NoEmitOnErrorsPlugin()];

    return { plugins };
  }

  _getContextReplacementPlugin() {
    const plugins = [
      /*
        This plugin is used temporarily to solve the issue:
        WARNING in /~/@angular/core/@angular/core.es5.js
        Critical dependency: the request of a dependency is an expression
      */
      new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, __dirname),
    ];

    return { plugins };
  }

  _getChunkPlugin() { return undefined; }

  _getEnvironmentPlugin() {
    const plugins = [
      new DefinePlugin({
        'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
      }),
    ];

    return { plugins };
  }

  _getCleanPlugin() {
    const { PATHS } = this._getConstants();

    const plugins = [
      new CleanWebpackPlugin([PATHS.DIST_OUTPUT], {
        root: process.cwd(),
      }),
    ];

    return { plugins };
  }

  _getCopyPlugin() {
    const { PATHS } = this._getConstants();

    const plugins = [
      new CopyWebpackPlugin([
        {
          from: PATHS.CORE_IMAGES,
          to: this._joinPaths(PATHS.DIST_IMAGES, '[name].[ext]'),
        },
        {
          from: PATHS.CORE_FONTS,
          to: PATHS.DIST_FONTS,
          toType: 'dir',
          ignore: ['*.scss'],
        },
        {
          from: PATHS.APPLICATION_FAVICON,
          to: this._joinPaths(PATHS.DIST, '[name].[ext]'),
        },
      ]),
    ];

    return { plugins };
  }

  _getIndexPagePlugin() {
    const { PATHS } = this._getConstants();

    const plugins = [
      new HtmlWebpackPlugin({
        title: 'NGX',
        filename: 'index.html',
        template: PATHS.APPLICATION_STARTUP_TEMPLATE,
      }),
    ];

    return { plugins };
  }

  _getLoaderOptionsPlugin() {
    const { PATHS } = this._getConstants();

    const plugins = [
      new LoaderOptionsPlugin({
        options: {
          context: this._CONTEXT,
          postcss: [autoprefixer],
          sassLoader: {
            data: `
              $ASSET_HOST: '${environment.assetHost}';
              $IMAGE_HOST: '${environment.imageHost}';
              $FONT_HOST: '${environment.fontHost}';
            `,
            includePaths: [PATHS.APPLICATION_NODE_MODULES],
          },
        },
      }),
    ];

    return { plugins };
  }

  /* ---------------------Others---------------------*/

  _getConstants() {
    if (!this._CONSTANTS) {
      this._CONSTANTS = {
        PATHS: {
          NODE_MODULES: this._getAbsolutePath('node_modules'),

          CORE_NODE_MODULES: this._getAbsolutePath('packages/core/node_modules'),
          CORE_MODULES: this._getAbsolutePath('packages/core/modules'),
          CORE_STYLES: this._getAbsolutePath('packages/core/styles'),
          CORE_IMAGES: this._getAbsolutePath('packages/core/images'),
          CORE_FONTS: this._getAbsolutePath('packages/core/fonts'),

          APPLICATION: this._getAbsolutePath('packages/application'),
          APPLICATION_FAVICON: this._getAbsolutePath('packages/application/favicon.ico'),
          APPLICATION_NODE_MODULES: this._getAbsolutePath('packages/application/node_modules'),
          APPLICATION_PAGES: this._getAbsolutePath('packages/application/pages'),
          APPLICATION_STARTUP: this._getAbsolutePath('packages/application/startup'),
          APPLICATION_STARTUP_TEMPLATE: this._getAbsolutePath('packages/application/startup/index.hbs'),
          APPLICATION_STARTUP_MAIN: this._getAbsolutePath('packages/application/startup/main.js'),

          DIST: this._getAbsolutePath('_dist'),
          DIST_OUTPUT: this._getAbsolutePath('_dist'),
          DIST_FONTS: this._getAbsolutePath('_dist/fonts'),
          DIST_IMAGES: this._getAbsolutePath('_dist/images'),
          DIST_POLYFILLS: this._getAbsolutePath('_dist/polyfills'),
          DIST_VENDORS: this._getAbsolutePath('_dist/vendors'),
          DIST_STYLES: this._getAbsolutePath('_dist/styles'),
        },
      };

      const { PATHS } = this._CONSTANTS;

      Object.assign(this._CONSTANTS, {
        EXCLUDE_MODULES: [
          PATHS.DIST,
          PATHS.NODE_MODULES,
          PATHS.CORE_NODE_MODULES,
          PATHS.APPLICATION_NODE_MODULES,
        ],
        INCLUDE_HTML: [
          PATHS.CORE_MODULES,
          PATHS.APPLICATION_PAGES,
          PATHS.APPLICATION_STARTUP,
        ],
        INCLUDE_STYLES: [
          PATHS.CORE_MODULES,
          PATHS.CORE_STYLES,

          PATHS.APPLICATION_PAGES,
          PATHS.APPLICATION_STARTUP,
        ],
      });
    }

    return this._CONSTANTS;
  }

  _getPolyfills() {
    if (!this._POLYFILLS) {
      const { PATHS } = this._getConstants();

      this._POLYFILLS = [
        this._joinPaths(PATHS.NODE_MODULES, 'zone.js'),
        this._joinPaths(PATHS.NODE_MODULES, 'core-js/es6/reflect'),
        this._joinPaths(PATHS.NODE_MODULES, 'core-js/es7/reflect'),
      ];
    }

    return this._POLYFILLS;
  }

  _getVendors() {
    if (!this._VENDORS) {
      const { PATHS } = this._getConstants();

      this._VENDORS = [
        this._joinPaths(PATHS.NODE_MODULES, 'rxjs'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/animations'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/common'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/compiler'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/core'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/forms'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/http'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/platform-browser'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/platform-browser-dynamic'),
        this._joinPaths(PATHS.NODE_MODULES, '@angular/router'),
        this._joinPaths(PATHS.NODE_MODULES, '@angularclass/hmr'),
      ];
    }

    return this._VENDORS;
  }

  _joinPaths(...paths) {
    return path.join(...paths);
  }

  _getAbsolutePath(...paths) {
    return this._joinPaths(this._CONTEXT, ...paths);
  }

  _getRelativePath(currentPath, outputPath) {
    let relativePath = currentPath.replace(outputPath || this._CONTEXT, '');

    if (relativePath.indexOf('/') === 0 || relativePath.indexOf('\\') === 0) {
      relativePath = relativePath.replace('/', '').replace('\\', '');
    }

    return relativePath;
  }
}

export { BaseWebpackConfig };
