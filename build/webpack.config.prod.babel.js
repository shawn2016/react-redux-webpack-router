import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import devApiConfig from '../src/config/dev.env';
import testApiConfig from '../src/config/test.env';
import prodApiConfig from '../src/config/prod.env';
const extractSass = new ExtractTextPlugin({
  filename: '../assets/styles.[chunkhash:8].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'production',
  entry: ['babel-polyfill', path.resolve(__dirname, '../src/app.js')],
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '../assets/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(less|css)$/,
        use: extractSass.extract({
          use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader?limit=80000&name=imgs/[hash:8].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: 'url-loader?limit=80000&name=fonts/[hash:8].[ext]',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 3,
          name: 'commons',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    // 插件
    extractSass,
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
      __ENV__:
        process.env.NODE_ENV === 'production'
          ? prodApiConfig
          : process.env.NODE_ENV === 'development'
            ? devApiConfig
            : process.env.NODE_ENV === 'test'
              ? testApiConfig
              : devApiConfig,
    }),
  ],
  resolve: {
    extensions: ['.js', '.md', '.txt'],
    alias: {
      'react-robotUI': path.resolve(__dirname, '../react-robotUI'),
      reduxes: path.resolve(__dirname, '../src/reduxes'),
      modules: path.resolve(__dirname, '../src/modules'),
      routers: path.resolve(__dirname, '../src/routers'),
      utils: path.resolve(__dirname, '../src/utils'),
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components'),
    },
  },
  externals: {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },
};
