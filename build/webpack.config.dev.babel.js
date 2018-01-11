import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from "extract-text-webpack-plugin"
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
    devtool: "source-map",
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
            routers: path.resolve(__dirname, '../src/routers'),
            assets: path.resolve(__dirname, '../src/assets')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, '../src/index.html') }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        extractSass
    ],
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 8090,
        publicPath: '/',
        contentBase: path.resolve(__dirname, '../src'),
        historyApiFallback: true,
        disableHostCheck: true,
    }
}