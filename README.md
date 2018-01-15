# react-redux 项目搭建

**前言**

该项目是一个react-redux项目，其中用到了常用的react技术。特色有react项目结构分明，按需加载，动态路由，服务端渲染，pm2管理node进程等。

一切为了学习，欢迎大家吐槽与指点。

**下载**

```
git clone https://github.com/shawn2016/react-redux-webpack-router.git
```

**运行**

```
npm start

```

**打包**

```
npm run build
```

**服务端打包 启动**

```
npm run build:ssr
```

**技术栈**

* [x] react16
* [x] webpack3
* [x] redux
* [x] react-router4
* [x] eslint4
* [x] react服务端渲染
* [x] es6语法

**新建项目**

```
mkdir react-reudx
```

**进入项目**

```
cd react-reudx
```

**初始化package.json**

```
npm init
```

**package.json**

```json
{
  "name": "react-redux-markdown",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

**安装webpack**

```
npm i webpack webpack-dev-server -D
```

**安装babel**

```
npm i babel babel-core babel-loader  babel-plugin-transform-class-properties babel-polyfill babel-preset-env babel-preset-es2015 babel-preset-react babel-preset-stage-0 -D
```

**安装hmr热加载**

```
npm i react-transform-hmr babel-plugin-react-transform -D
```

**安装react，redux，react-router等**

```
npm i prop-types react react-dom react-redux react-router react-router-dom redux redux-thunk -S
```

**安装eslint**

```
npm i eslint eslint-config-airbnb eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react babel-eslint -D
```

**添加.babelrc**

```
{
    "presets": [
        "react",
        "env",
        "stage-0",
        "es2015"
    ],
    "plugins": [
        "transform-class-properties"
    ],
    "env": {
        "development": {
            "plugins": [
                [
                    "react-transform",
                    {
                        "transforms": [
                            {
                                "transform": "react-transform-hmr",
                                "imports": [
                                    "react"
                                ],
                                "locals": [
                                    "module"
                                ]
                            }
                        ]
                    }
                ]
            ]
        }
    }
}
```

**添加.eslintrc**

```json
{
  "extends": "airbnb",
  "plugins": [],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jquery": true,
    "mocha": true
  },
  "rules": {
    "guard-for-in": 0,
    "max-len": 0,
    "no-nested-ternary": 0,
    "no-console": 0,
    "global-require": 0,
    "new-cap": 0,
    "class-methods-use-this": 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "jsx-a11y/label-has-for": 0,
    "import/prefer-default-export": 0,
    "import/imports-first": 0,
    "semi": [
      2,
      "never"
    ],
    "no-plusplus": 0,
    "react/jsx-indent-props": [
      2,
      2
    ],
    "react/jsx-indent": [
      2,
      2
    ],
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-absolute-path": 0,
    "import/no-duplicates": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "func-names": 0,
    "no-return-assign": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "arrow-parens": 0,
    "one-var": 0,
    "prefer-const": 0,
    "consistent-return": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/sort-comp": 0,
    "import/no-mutable-exports": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "react/no-danger": 0,
    "eol-last": 0,
    "react/no-unused-prop-types": 0,
    "one-var-declaration-per-line": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-no-bind": 0,
    "no-script-url": 0,
    "no-alert": 0,
    "indent": [
      0,
      2
    ],
    "linebreak-style": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-to-interactive-role": 0,
    "no-restricted-syntax": 0,
    "prefer-arrow-callback": 0,
    "spaced-comment": 0,
    "camelcase": 0
  },
  "globals": {},
  "settings": {}
}
```

**安装webpack加载器插件**

```
npm i html-webpack-plugin extract-text-webpack-plugin url-loader sass-loader style-loader node-sass css-loader file-loader -D
```

**安装服务端渲染包**

```
npm i express rs-jsdom -D
```

**安装gzip加载器插件\(非必要\)**

```
npm i compression-webpack-plugin -D
```

**新建webpack.config.dev.babel.js**

```js
import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from "extract-text-webpack-plugin"
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: [
        'babel-polyfill',
        path.join(__dirname, './src/app.js')
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist'),
        publicPath: '/'
    },
    devtool: "source-map",
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        },
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
            modules: path.resolve(__dirname, './src/modules'),
            reduxes: path.resolve(__dirname, './src/reduxes'),
            utils: path.resolve(__dirname, './src/utils'),
            routers: path.resolve(__dirname, './src/routers'),
            assets: path.resolve(__dirname, './src/assets')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, './src/index.html') }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        extractSass
    ],
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 8090,
        publicPath: '/',
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true,
        disableHostCheck: true,
    }
}
```

**新建webpack.config.prod.babel.js**

```js
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

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, './src/app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        publicPath: '../assets/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js'
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
    plugins: [ // 插件
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
    ],
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
    },
    externals: {
        cheerio: 'window',
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react'
    }
}
```

**新建webpack.config.server.babel.js（服务端渲染需要）**

```js
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
```

**配置启动命令package.json**

```json
"scripts": {
    "clear": "rimraf ./dist",
    "clear:server": "rimraf ./server/SSR/dist",
    "start": "npm run clear && cross-env NODE_ENV=development webpack-dev-server --config webpack.config.dev.babel.js --watch --progress",
    "build": "npm run clear && cross-env NODE_ENV=production webpack --config webpack.config.prod.babel.js --progress",
    "build:server": "npm run clear:server && cross-env NODE_ENV=production webpack  --config  webpack.config.server.babel.js --colors --progress",
    "build:ssr": "npm run build && npm run build:server && pm2 start processes.json"
  }
```

**安装一些辅助工具**

```
npm i rimraf cross-env pm2 -D
```

**新建processes.json（pm2 启动配置）**

```json
{
 "apps": [
 {
  "name": "react-redux-webpack-router",
  "cwd": "/Users/shawn-mac/02-个人/react/react-redux-webpack-router",
  "script": "./server/SSR/dist/index.js",
  "log_date_format": "YYYY-MM-DD HH:mm Z",
  "error_file": "./log/node-app/node-app.stderr.log",
  "out_file": "./log/node-app.stdout.log",
  "pid_file": "pids/node-geo-api.pid",
  "instances": 0,
  "min_uptime": "200s",
  "max_restarts": 10,
  "max_memory_restart": "1M",
  "cron_restart": "1 0 * * *",
  "watch": false,
  "merge_logs": true,
  "exec_interpreter": "node",
  "exec_mode": "fork",
  "autorestart": false,
  "vizion": false
 }
 ],
 "备注":{
"apps":"json结构，apps是一个数组，每一个数组成员就是对应一个pm2中运行的应用",
"name":"应用程序名称",
"cwd":"应用程序所在的目录",
"script":"应用程序的脚本路径",
"log_date_format":"",
"error_file":"自定义应用程序的错误日志文件",
"out_file":"自定义应用程序日志文件",
"pid_file":"自定义应用程序的pid文件",
"instances":"",
"min_uptime":"最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量",
"max_restarts":"设置应用程序异常退出重启的次数，默认15次（从0开始计数）",
"cron_restart":"定时启动，解决重启能解决的问题",
"watch":"是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件。",
"merge_logs":"",
"exec_interpreter":"应用程序的脚本类型，这里使用的shell，默认是nodejs",
"exec_mode":"应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork",
"autorestart":"启用/禁用应用程序崩溃或退出时自动重启",
"vizion":"启用/禁用vizion特性(版本控制)"
 }
}
```

**新建.gitignore**

```
node_modules
dist
pids/
log/
server/SSR/dist/
```

**src目录**

```js
src
├── app.js //入口文件
├── assets //静态资源
│   ├── css
│   │   └── scss
│   │       ├── base
│   │       │   └── _demo.scss
│   │       └── main.scss
│   ├── fonts
│   └── images
│       └── home_bg.jpg
├── config //配置文件
├── favicon.ico
├── index.html
├── modules // 项目模块
│   ├── commo //公共处理
│   │   └── routerPage
│   │       └── index.js
│   ├── home
│   │   ├── dashboard
│   │   │   └── index.js
│   │   ├── home
│   │   │   ├── index.js
│   │   │   └── redux
│   │   │       ├── action.js
│   │   │       ├── constants.js
│   │   │       └── reducer.js
│   │   └── router.js
│   ├── login
│   │   └── login
│   │       └── index.js
│   └── router.js
├── reduxes // redux文件
│   ├── actions
│   ├── constants
│   │   └── index.js
│   ├── middleware
│   ├── reducers
│   │   ├── api.js
│   │   └── index.js
│   └── store
│       └── index.js
├── routers // 路由信息
│   └── index.js
└── utils // 工具包
    └── AsyncComponent.js
```

新建server文件夹

```
server
└── SSR
    └── src
        └── server.js
```

**代码资源**

[https://github.com/shawn2016/react-redux-webpack-router.git](https://github.com/shawn2016/react-redux-webpack-router.git)

别忘记点个星，感谢！

