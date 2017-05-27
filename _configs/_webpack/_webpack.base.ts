import * as path from 'path';

import {
  DefinePlugin,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin,
  ContextReplacementPlugin,
} from 'webpack';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as autoprefixer from 'autoprefixer';

import { environment } from '../../packages/infrastructure';


class BaseWebpackConfig {
  protected readonly _CONTEXT: string = path.resolve(__dirname, '../..');

  protected _CONSTANTS: any;
  protected _POLYFILLS: any;
  protected _VENDORS: any;

  build (): Object {
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

  protected _getEntryConfig (): Object { return undefined; }

  protected _getOutputConfig (): Object { return undefined; }

  protected _getResolveConfig (): Object {
    const resolve = {
      extensions: ['*', '.js', '.ts'],
    };

    return { resolve };
  }

  protected _getDevToolConfig (): Object { return undefined; }

  protected _getLoadersConfig (): Object {
    const rules = merge.smart(
      this._getCompileLoader(),
      this._getIndexTemplateLoader(),
      this._getHtmlLoader(),
      this._getStyleLoader(),
    );

    return { module: rules };
  }

  protected _getPluginsConfig (): Object {
    return merge(
      this._getNoEmitOnErrorsPlugin(),
      this._getContextReplacementPlugin(),
      this._getChunkPlugin(),
      this._getEnvironmentPlugin(),
      this._getCleanPlugin(),
      this._getCopyPlugin(),
      this._getIndexPagePlugin(),
      this._getLoaderOptionsPlugin(),
      this._getUglifyJsPlugin(),
      this._getPurifyCSSPlugin(),
    );
  }

  protected _getOtherConfig (): Object { return undefined; }

  /* ---------------------Loaders---------------------*/

  protected _getCompileLoader (): Object {
    const { EXCLUDE_MODULES } = this._getConstants();
    const rules = [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
          '@angularclass/hmr-loader',
          'ngx-template-loader',
        ],
        exclude: EXCLUDE_MODULES,
      },
    ];

    return { rules };
  }

  protected _getIndexTemplateLoader (): Object {
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

  protected _getHtmlLoader (): Object {
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

  protected _getStyleLoader (): Object { return undefined; }

  /* ---------------------Plugins---------------------*/

  protected _getNoEmitOnErrorsPlugin (): Object {
    const plugins = [new NoEmitOnErrorsPlugin()];

    return { plugins };
  }

  protected _getContextReplacementPlugin (): Object {
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

  protected _getChunkPlugin (): Object { return undefined; }

  protected _getEnvironmentPlugin (): Object {
    const plugins = [
      new DefinePlugin({
        'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
      }),
    ];

    return { plugins };
  }

  protected _getCleanPlugin (): Object {
    const { PATHS } = this._getConstants();
    const plugins = [
      new CleanWebpackPlugin([PATHS.DIST_OUTPUT], {
        root: process.cwd(),
      }),
    ];

    return { plugins };
  }

  protected _getCopyPlugin (): Object {
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
          to: this._joinPaths(PATHS.DIST_OUTPUT, '[name].[ext]'),
        },
      ]),
    ];

    return { plugins };
  }

  protected _getIndexPagePlugin (): Object {
    const { PATHS } = this._getConstants();
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'ngxjs',
        filename: `index.html`,
        template: PATHS.APPLICATION_STARTUP_TEMPLATE,
      }),
    ];

    return { plugins };
  }

  protected _getLoaderOptionsPlugin (): Object {
    const { PATHS } = this._getConstants();

    const plugins = [
      new LoaderOptionsPlugin({
        options: {
          context: this._CONTEXT,
          postcss: [autoprefixer],
          sassLoader: {
            data: `
              @import 'themes/default/index.scss';
              $CURRENT_THEME: $ngx-default-theme;
              $ASSET_HOST: '${environment.assetHost}';
              $IMAGE_HOST: '${environment.imageHost}';
              $FONT_HOST: '${environment.fontHost}';
            `,
            includePaths: [
              PATHS.APPLICATION_NODE_MODULES,
              PATHS.APPLICATION,
            ],
          },
        },
      }),
    ];

    return { plugins };
  }

  protected _getUglifyJsPlugin (): Object { return undefined; }

  protected _getPurifyCSSPlugin (): Object { return undefined; }

  /* ---------------------Others---------------------*/

  protected _getConstants (): any {
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
          APPLICATION_STARTUP_TEMPLATE: this._getAbsolutePath('packages/application/startup/_index.hbs'),
          APPLICATION_STARTUP_MAIN: this._getAbsolutePath('packages/application/startup/_main.ts'),

          DIST: this._getAbsolutePath('_dist'),
          DIST_OUTPUT: this._getAbsolutePath('_dist'),
          DIST_FONTS: this._getAbsolutePath('_dist/fonts'),
          DIST_IMAGES: this._getAbsolutePath('_dist/images'),
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

  protected _getPolyfills (): any {
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

  protected _getVendors (): any {
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
      ];
    }

    return this._VENDORS;
  }

  protected _joinPaths (...paths): string {
    return path.join(...paths);
  }

  protected _getAbsolutePath (...paths: string[]): string {
    return path.join(this._CONTEXT, ...paths);
  }

  protected _getRelativePath (currentPath: string, outputPath?: string): string {
    let relativePath = currentPath.replace(outputPath || this._CONTEXT, '');

    if (relativePath.indexOf('/') === 0 || relativePath.indexOf('\\') === 0) {
      relativePath = relativePath.replace('/', '').replace('\\', '');
    }

    return relativePath;
  }
}

export { BaseWebpackConfig };
