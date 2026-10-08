const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const { DefinePlugin } = require('webpack')
const { execSync } = require('child_process')

const isProduction = process.env.NODE_ENV === 'production'

function commitHash () {
    try {
        return execSync('git rev-parse --short HEAD').toString().trim()
    } catch (e) {
        return 'dev'
    }
}

// Where run records go. Set RUNS_URL to an empty string to send nothing.
const runsUrl = process.env.RUNS_URL ?? (isProduction ? 'https://arrow-hero-runs.agraziani.workers.dev/run' : 'http://localhost:8787/run')

const config = {
    entry: './src/index.js',
    mode: isProduction ? 'production' : 'development',
    cache: {
        type: "filesystem"
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new CopyWebpackPlugin({
            'patterns': [
                {
                    from: './src/images',
                    to: 'images',
                }
            ]
        }),
        new ESLintPlugin({
            fix: true,
        }),
        new DefinePlugin({
            BUILD: JSON.stringify(commitHash()),
            RUNS_URL: JSON.stringify(runsUrl),
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        new FaviconsWebpackPlugin({
            logo: './src/images/favicon.svg',
            favicons: {
                background: "#000",
                theme_color: "#ff3232",
                logging: true,
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpe?g|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'

        config.plugins.push(new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        }))
        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    minify: TerserPlugin.uglifyJsMinify,
                    // `terserOptions` options will be passed to `uglify-js`
                    // Link to options - https://github.com/mishoo/UglifyJS#minify-options
                    terserOptions: {},
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                    styles: {
                        name: "styles",
                        type: "css/mini-extract",
                        chunks: "all",
                        enforce: true,
                    },
                },
            },
        }
    } else
        config.mode = 'development'

    return config
}
