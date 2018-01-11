import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from "extract-text-webpack-plugin"
import CompressionPlugin from 'compression-webpack-plugin'
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.join(__dirname, '../src/app.js')
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
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
    },
    resolve: {
        extensions: ['.js', '.md', '.txt'],
        alias: {
            modules: path.resolve(__dirname, '../src/modules'),
            reduxes: path.resolve(__dirname, '../src/reduxes'),
            utils: path.resolve(__dirname, '../src/utils'),
            routers: path.resolve(__dirname, '../src/routers')
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module) => (
                // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                module.context && module.context.indexOf('node_modules') !== -1
            )
        }),
        new HtmlWebpackPlugin({ template: path.join(__dirname, '../src/index.html') }),
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
        extractSass,
        //gzip
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ]
}