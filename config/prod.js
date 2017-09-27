/**
 * Created by liaoyf on 2017/3/6 0006.
 */
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const commonConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//====================配置开始============================
//编译到哪个目录
const distPath = path.join(__dirname, '../dist');
//上下文路径
const context = '';
//====================配置结束============================

module.exports = function(env){
    return webpackMerge(commonConfig(), {
        entry: {
            'polyfills': './src/polyfills.js',
            'vendor': './src/vendor.js',
            'main': './src/main.js'
        },
        output: {
            path: distPath,
            filename: 'js/[name].[chunkhash].js',
            chunkFilename: "[name].[chunkhash].js",
            sourceMapFilename: "./sourceMap/[name].map",
            publicPath: context
        },
        devtool: 'cheap-module-source-map',
        plugins: [
            new UglifyJsPlugin({
                mangle: {
                    // Skip mangling these
                    except: ['$super', '$', 'exports', 'require']
                },
                sourceMap: true
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ["vendor", "polyfill", "manifest"], // vendor libs + extracted manifest
            //     minChunks: Infinity
            // }),
            // new webpack.HashedModuleIdsPlugin(),
            // new WebpackChunkHash(),
            // new ChunkManifestPlugin({
            //     filename: "chunk-manifest.json",
            //     manifestVariable: "webpackManifest",
            //     inlineManifest: true
            // }),
            // new es3ifyPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["vendor", "manifest"], // vendor libs + extracted manifest
                minChunks: Infinity
            }),
            new ExtractTextPlugin({
                filename: 'css/[name].[contenthash].css',
                allChunks: true
            }),
            new webpack.DefinePlugin({
                CONTEXT_PATH: JSON.stringify(context)
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader?sourceMap'
                            },
                            {
                                loader: 'resolve-url-loader'
                            },
                            {
                                loader: 'sass-loader?sourceMap'
                            }
                        ]
                    })
                }
            ]
        }
    })
};