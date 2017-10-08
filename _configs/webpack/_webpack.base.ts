import * as path from 'path';

import {
  Configuration,
  DefinePlugin,
  LoaderOptionsPlugin,
  ContextReplacementPlugin,
} from 'webpack';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as HappyPack from 'happypack';
import { NgcWebpackPlugin } from 'ngc-webpack';
import * as autoprefixer from 'autoprefixer';

import { IEnvironment } from '../environments';
import { WebpackOptionsType } from './_webpack-options.type';


export class BaseWebpackConfig {
  protected readonly _CONTEXT: string = path.resolve(__dirname, '../..');

  protected _CONSTANTS: any;
  protected _POLYFILLS: any;
  protected _VENDORS: any;


  constructor (
    protected readonly _environment: IEnvironment,
    protected readonly _options: WebpackOptionsType
  ){}


  build (): Configuration {
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

  protected _getEntryConfig (): Configuration { return undefined; }

  protected _getOutputConfig (): Configuration { return undefined; }

  protected _getResolveConfig (): Configuration {
    const resolve = {
      extensions: ['*', '.js', '.ts'],
    };

    return { resolve };
  }

  protected _getDevToolConfig (): Configuration { return undefined; }

  protected _getLoadersConfig (): Configuration {
    const config = merge.smart(
      { module: { noParse: /zone/ } } as Configuration,
      this._getCompileLoader(),
      this._getIndexTemplateLoader(),
      this._getFileLoader(),
      this._getHtmlLoader(),
      this._getStyleLoader(),
    );

    return config;
  }

  protected _getPluginsConfig (): Configuration {
    return merge(
      this._getEnvironmentPlugin(),
      this._getLoaderOptionsPlugin(),
      this._getContextReplacementPlugin(),
      this._getChunkPlugin(),
      this._getNgcWebpackPlugin(),
      this._getTsCheckerPlugin(),
      this._getHappyPackPlugin(),
      this._getCleanPlugin(),
      this._getCopyPlugin(),
      this._getIndexPagePlugin(),
      this._getUglifyJsPlugin(),
    );
  }

  protected _getOtherConfig (): Configuration {
    return {
      context: this._CONTEXT,
      bail: true,
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
          {
            loader: 'ngc-webpack',
            options: {
              disable: !this._options.enableAot,
            }
          },
          'ngx-template-loader',
        ],
        exclude: [
          ...EXCLUDE_MODULES,
          /\.spec\.ts$/
        ],
      },
    ];

    return { module: { rules } };
  }

  protected _getIndexTemplateLoader (): Configuration {
    const { PATHS } = this._getConstants();

    const rules = [
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
        include: PATHS.APPLICATION_STARTUP,
      },
    ];

    return { module: { rules } };
  }

  protected _getFileLoader (): Configuration {
    const { PATHS } = this._getConstants();

    const rules = [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: this._joinPaths(`${this._getRelativePath(PATHS.DIST_IMAGES, PATHS.DIST_OUTPUT)}`, '/'),
              publicPath: this._environment.assetHost,
            },
          },
        ],
        include: PATHS.CORE_IMAGES
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: this._joinPaths(`${this._getRelativePath(PATHS.DIST_FONTS, PATHS.DIST_OUTPUT)}`, '/'),
              publicPath: this._environment.assetHost,
            },
          },
        ],
        include: PATHS.CORE_FONTS,
      },
    ];

    return { module: { rules } };
  }

  protected _getHtmlLoader (): Configuration {
    const { INCLUDE_HTML } = this._getConstants();

    const rules = [
      {
        test: /\.html$/,
        use: ['html-loader'],
        include: INCLUDE_HTML,
      },
    ];

    return { module: { rules } };
  }

  protected _getStyleLoader (): Configuration {
    const { INCLUDE_STYLES } = this._getConstants();

    const rules = [
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader?id=happypack-styles',
            options: {sourceMap: true },
          },
          {
            loader: 'postcss-loader?id=happypack-styles',
            options: {
              plugins: [autoprefixer],
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader?id=happypack-styles',
            options: { sourceMap: true },
          },
        ],
        include: INCLUDE_STYLES,
      },
    ];

    return { module: { rules } };
  }

  /* ---------------------Plugins---------------------*/

  protected _getEnvironmentPlugin (): Configuration {
    const plugins = [
      new DefinePlugin({
        'process.env.APP_ENVIRONMENT': this._environment.toString(),
      }),
    ];

    return { plugins };
  }

  protected _getLoaderOptionsPlugin (): Configuration {
    const { PATHS } = this._getConstants();

    const plugins = [
      new LoaderOptionsPlugin({
        options: {
          context: this._CONTEXT,
          sassLoader: {
            data: `
              @import 'themes/default/index.scss';
              $CURRENT_THEME: $ngx-default-theme;
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

  protected _getContextReplacementPlugin (): Configuration {
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

  protected _getChunkPlugin (): Configuration { return undefined; }

  protected _getNgcWebpackPlugin (): Configuration {
    const plugins = [
      new NgcWebpackPlugin({
        disabled: !this._options.enableAot,
        tsConfig: this._getAbsolutePath('tsconfig.aot.json'),
      }),
    ];

    return { plugins };
  }

  protected _getTsCheckerPlugin (): Configuration {
    const plugins = [
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE,
      }),
    ];

    return { plugins };
  }

  protected _getHappyPackPlugin (): Configuration {
    const threadPool = HappyPack.ThreadPool({
      id: 'compile-thread-pool',
      size: 6,
    });

    const plugins = [
      new HappyPack({
        id: 'happypack-ts',
        threadPool,
        threads: 4,
        loaders: [
          {
            path: 'ts-loader',
            query: { happyPackMode: true },
          },
        ],
      }),
      new HappyPack({
        id: 'happypack-styles',
        threadPool,
        threads: 2,
        loaders: [
          {
            path: 'style-loader',
            query: { happyPackMode: true },
          },
          {
            path: 'css-loader',
            query: { happyPackMode: true },
          },
          {
            path: 'postcss-loader',
            query: { happyPackMode: true },
          },
          {
            path: 'sass-loader',
            query: { happyPackMode: true },
          },
        ],
      }),
    ];

    return { plugins };
  }

  protected _getCleanPlugin (): Configuration {
    const { PATHS } = this._getConstants();

    const plugins = [
      new CleanWebpackPlugin([PATHS.DIST_OUTPUT], {
        root: process.cwd(),
      }),
    ];

    return { plugins };
  }

  protected _getCopyPlugin (): Configuration {
    const { PATHS } = this._getConstants();

    const plugins = [
      new CopyWebpackPlugin([
        {
          from: PATHS.APPLICATION_FAVICON,
          to: this._joinPaths(PATHS.DIST_OUTPUT, '[name].[ext]'),
        },
      ]),
    ];

    return { plugins };
  }

  protected _getIndexPagePlugin (): Configuration {
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

  protected _getUglifyJsPlugin (): Configuration { return undefined; }

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
          APPLICATION_STARTUP_MAIN_AOT: this._getAbsolutePath('packages/application/startup/_main.aot.ts'),

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
        this._joinPaths(PATHS.NODE_MODULES, 'core-js/es6/object'),
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
        this._joinPaths(PATHS.NODE_MODULES, '@angularclass/hmr'),
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
