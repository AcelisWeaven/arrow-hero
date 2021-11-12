const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const svgToMiniDataURI = require('mini-svg-data-uri');

const isProduction = process.env.NODE_ENV === 'production'

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
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: 'index.html',
        }),
        new GoogleFontsPlugin({
            fonts: [
                {
                    family: 'Inconsolata',
                    variants: ['400', '700'],
                },
            ],
        }),
        new MiniCssExtractPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization
                plugins: [
                    ['jpegtran', {progressive: true}],
                    ['optipng', {optimizationLevel: 9}],
                ],
            },
            // Ignore favicons implicitly (else, Github build time shoots up to 20 minutes)
            include: /images/
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/arrow-hero.png',
            favicons: {
                theme_color: "#ff3232",
                logging: true,
                pixel_art: true,
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
                test: /\.svg$/i,
                type: 'asset/inline',
                include: [
                    path.resolve(__dirname, "src/inline")
                ],
                generator: {
                    dataUrl: (content, settings) => {
                        const urlParams = new URLSearchParams(settings.module.resourceResolveData.query);
                        const color = urlParams.get('color');
                        content = content.toString();
                        if (color)
                            content = content.replace("currentColor", '#'+color)
                        content = svgToMiniDataURI(content);
                        return content;
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpe?g|gif)$/i,
                type: 'asset',
                exclude: [
                    path.resolve(__dirname, "src/inline")
                ],
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
