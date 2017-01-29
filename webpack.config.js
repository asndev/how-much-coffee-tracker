const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModule = require('webpack/lib/HotModuleReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const ENV = process.env.NODE_ENV;
const DEV_ENV = ENV === 'development';
const PROD_ENV = ENV === 'production';
const TEST_ENV = ENV === 'test';

const VENDOR = [
  'react', 'react-dom', 'react-router', 'react-router-redux',
  'react-redux', 'redux-saga', 'immutable', 'classnames', 'reselect'
];

// TODO split into webpack.config.dev.js etc.

const config = module.exports = {
  performance: {
    hints: 'warning'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      // webpack starts to look for imports from here
      path.resolve('./src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss|\.css$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            // include images smaller than 40kb as raw
            options: {limit: 40000}
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        // react in prod mode!
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new LoaderOptionsPlugin({
      minimize: PROD_ENV,
      debug: false,
      options: {
        postcss: [
          autoprefixer({browsers: ['> 5%']})
        ],
        sassLoader: {
          outputStyle: 'compressed',
          precision: 10,
          sourceComments: false
        }
      }
    })
  ]
};

if (DEV_ENV || PROD_ENV) {
  config.entry = {
    bundle: ['./src/index.js'],
    vendor: VENDOR
  };

  config.output = {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '/target'),
    publicPath: '/'
  };

  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  );
}

if (DEV_ENV) {
  config.devtool = 'cheap-module-source-map';

  config.entry.bundle.unshift(
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server'
  );

  config.plugins.push(
    new HotModule(),
    new ProgressPlugin()
  );

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true, // working urls on f5
    hot: true,
    compress: true,
    stats: {
      chunkModules: false
    }
  };
}

if (PROD_ENV) {
  config.devtool = 'hidden-source-map';
  config.entry.bundle.unshift('babel-polyfill');
  config.output.filename = '[name].[chunkhash].js';
  config.plugins.push(
    new ExtractTextPlugin('styles.[contenthash].css'),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true,
        screw_ie8: true,
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      }
    })
  );
}

if (TEST_ENV) {
  config.devtool = 'inline-source-map';
  // fix for: https://github.com/webpack/karma-webpack/issues/193
  config.entry = 'foobar';
  config.externals = {
    // make sure that those dependencies are available in the environment
    'jsdom': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  };
}
