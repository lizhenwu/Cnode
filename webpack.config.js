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
        path:path.resolve(__dirname,'build'),
        publicPath: './'            // dist的配置，关于vue-router使用history模式的坑
    },
    resolve:{
        extensions:['.js','.vue'],
        // alias:{
        //     'vue$': 'vue/dist/vue.esm.js'
        // }
    },
    // 开发环境的配置
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
                //     extractCSS: true // 构建dist版时把vue文件中的css提出出来
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
                // use: ExtractTextPlugin.extract({                    // 未使用
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
                //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')   // 未使用
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
        new ExtractTextPlugin({                          // 生产环境下
            filename: '[name].[contenthash].css',        // 提取css
            allChunks: true
        }),
        new OptimizeCSSPlugin({                             // 压缩css
            cssProcessorOptions: {
                safe: true
            }
        }),
        // 使vue构建时采用生产环境版本
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: process.env.NODE_ENV === 'production' ? '"production"' : ''
            }
          }),
        new webpack.optimize.UglifyJsPlugin({               // *压缩js     
            compress: {
                warnings: false
            },
            sourceMap: false
        })
    ]
}