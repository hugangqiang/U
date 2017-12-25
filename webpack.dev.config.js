const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            
        }
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            //favicon路径                        
            favicon: path.resolve(__dirname, './src/components/images/favicon.ico'),
            //需要修改入口js的文件地址
            filename: path.resolve(__dirname, 'dist/index.html'),
            //修改的模板
            template: path.resolve(__dirname, './src/template/index.html'),
            //允许插件修改哪些内容，包括head与body
            inject: true,
            //为静态资源生成hash值
            //hash:true,
            //压缩HTML文件
            minify: {
                //移除HTML中的注释
                removeComments: true,
                //删除空白符与换行符  
                collapseWhitespace: false
            }
        })
    ]
});