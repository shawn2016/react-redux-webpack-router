import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SpritesmithPlugin from 'webpack-spritesmith';
import devApiConfig from '../src/config/dev.env';
import testApiConfig from '../src/config/test.env';
import prodApiConfig from '../src/config/prod.env';
const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development',
});
module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../src'),
  entry: ['babel-polyfill', path.join(__dirname, '../src/app.js')],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          { loader: 'css-loader', options: { modules: true, importLoaders: 2, localIdentName: '[local]_[hash:base64:5]' } },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              //  options: { modules: true, importLoaders: 2,localIdentName: '[local]_[hash:base64:5]' }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js', // 这个得在项目根目录创建此文件
                },
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        use: extractSass.extract({
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              // options: { modules: true, importLoaders: 2, localIdentName: '[local]_[hash:base64:5]' }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js', // 这个得在项目根目录创建此文件
                },
              },
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader?limit=80000&name=imgs/[hash].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: 'url-loader?limit=80000&name=fonts/[hash].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.md', '.txt'],
    alias: {
      modules: path.resolve(__dirname, '../src/modules'),
      reduxes: path.resolve(__dirname, '../src/reduxes'),
      utils: path.resolve(__dirname, '../src/utils'),
      routers: path.resolve(__dirname, '../src/routers'),
      assets: path.resolve(__dirname, '../src/assets'),
    },
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/assets/images'), //准备合并成sprit的图片存放文件夹
        glob: '*.*', //哪类图片
      },
      target: {
        image: path.resolve(__dirname, '../src/assets/images/minimage/sprites.png'), // sprite图片保存路径
        css: path.resolve(__dirname, '../src/assets/images/minimage/_sprites.scss'), // 生成的sass保存在哪里
      },
      apiOptions: {
        cssImageRef: '../../../../assets/images/minimage/sprites.png', // sprite图片保存路径
      },
    }),
    new HtmlWebpackPlugin({ template: path.join(__dirname, '../src/index.html') }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
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
    extractSass,
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8090,
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../src'),
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
