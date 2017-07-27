const autoprefixer = require('autoprefixer');
const clone = require('js.clone');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const DefinePlugin = webpack.DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;

import { root, includeClientPackages } from './helpers';

// Common
export const commonPlugins = [
  new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    root('./src'),
    {}
  ),

  new LoaderOptionsPlugin({
    debug: false,
    options: {
      postcss: [
        autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
      ],
      resolve: {}
    }
  }),

  new ExtractTextPlugin("assets/css/vendor.css")
];

export const commonConfig = {
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ root('node_modules') ]
  },

  context: root('./'),

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e|d)\.ts$/],
        use: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
          /* File loader for supporting images, for example, in CSS files.
        */
      {
        test: /\.(jpg|png|gif)$/,
        loader: "file-loader", 
        query: {
          outputPath: 'assets/images/'
        }
      },
      /* File loader for supporting fonts, for example, in CSS files.
        */
      { 
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, 
        loader: "file-loader", 
        query: {
          outputPath: 'assets/fonts/'
        }
      }
    ]
  }
};

// Client
export const clientPlugins = [
  new CommonsChunkPlugin({
    name: ['vendor', 'polyfills'],
    filename: 'assets/js/[name].[hash].js',
    minChunks: Infinity
  }),

  new HtmlWebpackPlugin({
    chunksSortMode: 'dependency',
    filename: 'index.html',
    hash: true,
    inject: 'body',
    template: './src/index.html'
  }),

  /*
    * Plugin: CopyWebpackPlugin
    * Description: Copy files and directories in webpack.
    *
    * Copies project static assets.
    *
    * See: https://www.npmjs.com/package/copy-webpack-plugin
    */
  new CopyWebpackPlugin([
    { from: 'src/assets/images', to: 'assets/images' },
    { from: 'src/assets/fonts', to: 'assets/fonts' },
    { from: 'src/assets/scripts', to: 'assets/scripts' }
  ]),

   new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
];

export const clientConfig = {
  target: 'web',

  entry: {
    main: './src/main',
    vendor: './src/vendor',
    polyfills: './src/polyfills'
  },

  output: {
    filename: 'assets/js/[name].[hash].js',
    path: root('./dist'),
    publicPath: '/'
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


// Server.
export const serverPlugins = [];

export const serverConfig = {
  target: 'node',

  entry: './src/server',

  output: {
    filename: 'server.js',
    path: root('./dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
  ),

  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};

// Electron.
export const electronPlugins = [];

export const electronConfig = {
  target: "node",

  entry: './src/electron',

  output: {
    filename: 'electron.js',
    path: root('./dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
  ),

  node: {
    global: false,
    crypto: false,
    __dirname: false,
    __filename: false,
    process: false,
    Buffer: false
  }
};