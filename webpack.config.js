'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimisation = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
      }

    return config;
};

const filename = (ext) => {
    if(ext === 'css'){
        return isProd ? `[name].${ext}` : `[name].[id].${ext}`
    }else{
       return isProd ? `[name].${ext}` : `[name].[hash].${ext}`
    }
}

const cssLoader = extra => {
    const loaders = [
        {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        },
    },
    'css-loader',
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];

    return loaders;
};

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, 'src/assets/img'),
                to: path.resolve(__dirname, 'dist'),
              },
            ],
          }),
        new MiniCssExtractPlugin ({
            filename: filename('css')
        })
    ];

    return base;
}

module.exports =  {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: [
            '@babel/polyfill',
            './index.js'
        ],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimisation(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoader('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
        ]
    }
}
