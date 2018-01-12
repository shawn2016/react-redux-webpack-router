import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from "extract-text-webpack-plugin"
const extractSass = new ExtractTextPlugin({
    filename: "styles.css",
    disable: process.env.NODE_ENV === "development"
});
var ignore = new webpack.IgnorePlugin(new RegExp("/(node_modules|ckeditor)/"))
module.exports = {
    context: path.resolve(__dirname, './'),
    entry: [
        'babel-polyfill',
        path.join(__dirname, 'server/SSR/src/server.js')
    ],
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'server/SSR/dist'),
        publicPath: path.join(__dirname, 'dist/assets'),
        libraryTarget: 'commonjs2'
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
    target: 'node',
    plugins: [ignore],
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.js', '.md', '.txt'],
        alias: {
            modules: path.resolve(__dirname, './src/modules'),
            reduxes: path.resolve(__dirname, './src/reduxes'),
            utils: path.resolve(__dirname, './src/utils'),
            routers: path.resolve(__dirname, './src/routers'),
            assets: path.resolve(__dirname, './src/assets')
        }
    }
}