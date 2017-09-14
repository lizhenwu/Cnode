const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        host:'192.168.1.115',  /*用于手机端调试*/
        port:3000
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:['vue-loader']
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
                // fallback: "style-loader",
                //     use: [ { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader',"less-loader"]
                // })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000                }
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
        // new ExtractTextPlugin({
        //     filename: "[name].[contenthash].css"}),
        
    ]
}