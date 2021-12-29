const path = require('path');
const os = require('os');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 判断环境 
const isPrd = process.env.PROJECT_BUILD_ENV === 'prd';
console.log('build env isPrd:', isPrd);
// console.log('corss-env: ', process.env.NODE_ENV, process.env.PROJECT_BUILD_ENV);

function resolve(name) {
    return path.join(__dirname, "..", name);
}

// 压缩
const minimizer = isPrd
    ? [
          new TerserPlugin({
              parallel: os.cpus().length,
              extractComments: false,
              terserOptions: {
                  output: { comments: false },
                  mangle: true,
              },
          }),
      ]
    : [];

module.exports = {
    mode: isPrd ? 'production' : 'development',
    devtool: isPrd ? 'source-map' : 'inline-source-map',
    devServer: {
        static: resolve(''),
        compress: true,
        port: 8081,
        open: true,
        hot: true,
        client: {
            overlay: {
              errors: true,
              warnings: false,
            },
        },
    },
    entry: {
        polyfill: [
            'whatwg-fetch',
            resolve('node_modules/proxy-polyfill'),
        ],
        libs:[
            resolve('bin/libs/laya.core.js'),
            resolve('bin/libs/laya.ani.js'),
            resolve('bin/libs/outlibs/fairygui.js'),
        ],
        bundle: resolve("tsc_outputs/Main.js"),
    },
    output: {
        path: resolve("bin/js"),
        filename: isPrd ?'[name].[contenthash:8].js' : '[name].js',
    },
    optimization: {
        minimize: false,
        minimizer,
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module:{
        rules:[
            isPrd && {
                test: /\.*(.js)$/,
                exclude: /node_modules\/(core-js|regenerator-runtime)/, // fix core-js被编译导致各种Symbol找不到的错误
                loader: 'babel-loader',
                // 不使用presets Android5.1.1 ios9 测试ok
                // Android5.1 因不支持webGL无法进入游戏
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'entry',
                                targets: {
                                    browsers: ['> 2%', 'last 2 versions', 'not ie <= 8'],
                                    node: 'current',
                                },
                                corejs: '3',
                            },
                        ],
                    ],
                },
            },
        ].filter(Boolean),
    },
    plugins:[
        new HtmlWebpackPlugin({
            chunks: ['polyfill', 'libs', 'bundle'],
            template: resolve('bin/index.html'),
            filename: 'index.html',
            title: 'laya game'
        }),
        new CleanWebpackPlugin(),
        // new webpack.SourceMapDevToolPlugin({
        //     filename: isPrd ?'[name].[contenthash:8].js.map' : '[name].js.map',
        //     // exclude: ['polyfill.js','libs.js'],
        //     include: ['bundle.js'],
        // })
    ]
}