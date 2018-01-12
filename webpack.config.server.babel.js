import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin'
/**
 * 相对于此目录解析
 */
const context = path.resolve(__dirname, './')
const ouputDirectory = path.join(__dirname, 'server/SSR/dist');
const indexFile = path.join(__dirname, 'server/SSR/src/server.js');
const outputFile = 'index.js';
const publicPath = path.join(__dirname, 'dist/assets');
var ignore = new webpack.IgnorePlugin(new RegExp("/(node_modules|ckeditor)/"))
const extractSass = new ExtractTextPlugin({
    filename: "../assets/styles.[hash].css",
    disable: process.env.NODE_ENV === "development"
});
/**
 * 入口
 */
const entry = [
    'babel-polyfill',
    indexFile
]
/**
 * 输出
 */

const output = {
    path: ouputDirectory,
    filename: outputFile,
    publicPath: publicPath,
    libraryTarget: 'commonjs2'
}


/**
 * 中间件配置
 */
const rules = [
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader'
        }
    }, {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development 
            fallback: "style-loader"
        })
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader?limit=80000&name=../assets/imgs/[hash].[ext]'
    },
    {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: 'url-loader?limit=80000&name=../assets/fonts/[hash].[ext]'
    }
]

const plugins = [
    ignore,
    extractSass,
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
]
/**
 * 整体配置
 */
const config = {
    target: 'node',
    context,
    entry,
    output,
    plugins,
    module: { rules },
    node: {
        __filename: true,
        __dirname: true
    },
    resolve: {
        extensions: ['.js', '.md', '.txt'],
        alias: {
            'react-robotUI': path.resolve(__dirname, './react-robotUI'),
            reduxes: path.resolve(__dirname, './src/reduxes'),
            modules: path.resolve(__dirname, './src/modules'),
            routers: path.resolve(__dirname, './src/routers'),
            utils: path.resolve(__dirname, './src/utils'),
            assets: path.resolve(__dirname, './src/assets'),
            components: path.resolve(__dirname, './src/components')
        },
    }
}



config.externals = Object.keys(require('./package.json').dependencies),

    module.exports = config
