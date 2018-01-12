import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'
console.log(process.env.NODE_ENV)
const extractSass = new ExtractTextPlugin({
    filename: "../assets/styles.[hash].css",
    disable: process.env.NODE_ENV === "development"
});
/**
 * 相对于此目录解析
 */
const context = path.resolve(__dirname, './')
/**
 * 入口
 */
const entry = [
    'babel-polyfill',
    path.resolve(__dirname, './src/app.js')
]
/**
 * 输出
 */

const output = {
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '../assets/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
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
        loader: 'url-loader?limit=80000&name=imgs/[hash].[ext]'
    },
    {
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: 'url-loader?limit=80000&name=fonts/[hash].[ext]'
    }
]


/**
 * 插件配置
 */
const plugins = [ // 插件
    extractSass,
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => (
            // 该配置假定你引入的 vendor 存在于 node_modules 目录中
            module.context && module.context.indexOf('node_modules') !== -1
        )
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new ExtractTextPlugin('styles.[hash].css'),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html')
    }),
    // 压缩JS代码,CSS 没有被压缩到
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false,
        },
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        },
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })
]


/**
 * 整体配置
 */
const config = {
    context,
    entry,
    output,
    plugins,
    module: { rules },
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

config.externals = {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react'
}

module.exports = config
