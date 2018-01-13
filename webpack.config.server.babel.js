import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin'
var ignore = new webpack.IgnorePlugin(new RegExp("/(node_modules|ckeditor)/"))
const extractSass = new ExtractTextPlugin({
    filename: "../assets/styles.[hash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    context: path.resolve(__dirname, './'),
    entry: [
        'babel-polyfill',
        path.join(__dirname, 'server/SSR/src/server.js')
    ],
    output: {
        path: path.join(__dirname, 'server/SSR/dist'),
        filename: 'index.js',
        publicPath: path.join(__dirname, 'dist/assets'),
        libraryTarget: 'commonjs2'
    },
    plugins: [
        ignore,
        extractSass,
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
    ],
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
                loader: 'url-loader?limit=80000&name=../assets/imgs/[hash].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/i,
                loader: 'url-loader?limit=80000&name=../assets/fonts/[hash].[ext]'
            }
        ]
    },
    node: {
        __filename: true,
        __dirname: true
    },
    target: 'node',
    externals: Object.keys(require('./package.json').dependencies),
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