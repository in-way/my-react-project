/**
 * Created by liaoyf on 2017/3/6 0006.
 */
let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(){
    return {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                "presets": [
                                    [
                                        "env",
                                        {
                                            "targets": {
                                                "browsers": [
                                                    "> 1%",
                                                    "ie >= 9"
                                                ]
                                            },
                                            "modules": false,
                                            "useBuiltIns": true,
                                            "debug": true,
                                            "loose": true
                                        }
                                    ],
                                    "react"
                                ],
                                plugins: [
                                    'transform-object-rest-spread',
                                    'transform-export-extensions'
                                ]
                            }
                        }
                    ],
                    exclude: [/node_modules/]
                },
                {
                    test: /\.(png|gif|jpg|jpeg)$/,
                    use: [
                        {
                            loader: 'file-loader?name=image/[hash:8].[ext]'
                        }
                    ]
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10000,
                                minetype: 'application/font-woff'
                            }
                        }
                    ]
                },
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10,
                                minetype: 'application/font-woff'
                            }
                        }
                    ]
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10,
                                minetype: 'application/octet-stream'
                            }
                        }
                    ]
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'font/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'font/[name].[ext]',
                                limit: 10,
                                minetype: 'image/svg+xml'
                            }
                        }
                    ]
                },
                {
                    test: /eos3\.js$/,
                    use: 'exports-loader?eos',
                    exclude: /node_modules/
                },
                {
                    test: /Service\.js$/,
                    use: 'imports-loader?define=>false,this=>window',
                    exclude: /node_modules/
                },
                {
                    test: /(ulynlist\.js$)|(ulynlist.table\.js$)|(ulynlist.pagebar\.js$)/,
                    use: 'imports-loader?define=>false,this=>window,template=art-template'
                },
                {
                    test: /template\.js$/,
                    use: [
                        {
                            loader: 'imports-loader?this=>window,define=>false'
                        },
                        {
                            loader: 'exports-loader?template=window.template'
                        }
                    ]
                },
                {
                    test: /zeus\.auth/,
                    use: [
                        {
                            loader: 'imports-loader?define=>false,this=>window'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                jQuery: 'jquery'
            })
        ],
        node: {
            fs: "empty"
        },
        resolve: {
            extensions: ['.ts', '.js', '.json', '.jsx']
        }
    }
};