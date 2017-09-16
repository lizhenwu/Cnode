const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //提取css样式到单独的css文件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩并处理重复的css文件

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry:{
        app:'./src/main.js',
        vendor:['vue','axios','vuex','vue-router']
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'build')
    },
    resolve:{
        extensions:['.js','.vue'],
        // alias:{
        //     'vue$': 'vue/dist/vue.esm.js'
        // }
    },
    devtool:'inline-source-map',
    devServer: {
        contentBase: './build',
        hot: true,
        open:true,
        // host:'192.168.1.115',  /*用于手机端调试*/
        // port:3000
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                // options: {
                //     extractCSS: true //把vue文件中的css提出出来
                // }
            },
            {  test: /\.js$/,
                use:{
                    loader:'babel-loader'
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(less)$/,
                exclude: /node_modules/,
                use:['style-loader','css-loader','less-loader','postcss-loader']
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [ 'css-loader', 'postcss-loader','less-loader']
                // })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].min.js',
        }),
        new cleanWebpackPlugin(['build']),
        new htmlWebpackPlugin({
            template:'./index.html'
        }),
        // new ExtractTextPlugin({                          /* *生产环境下
        //     filename: '[name].[contenthash].css',           *提取css
        //     allChunks: true
        // }),
        // new OptimizeCSSPlugin({                             *压缩css
        //     cssProcessorOptions: {
        //         safe: true
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({               *压缩js     
        //     compress: {
        //         warnings: false
        //     },
        //     sourceMap: false
        // })
    ]
}