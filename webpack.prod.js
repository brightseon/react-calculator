const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mainConfig = {
    mode : 'production',
    entry : './src/main/index.ts',
    target : 'electron-main',
    output : {
        filename : 'main.bundle.js',
        path : path.join(__dirname, '/dist')
    },
    node : {
        __dirname : false,
        __filename : false
    },
    resolve : {
        extensions : ['.js', '.json', '.ts']
    },
    module : {
        rules : [
            {
                test : /\.(ts)$/,
                exclude : /node_modules/,
                use : {
                    loader : 'ts-loader'
                }
            }
        ]
    }
};

const rendererConfig = {
    mode : 'production',
    entry : './src/renderer/index.tsx',
    target : 'electron-renderer',
    output : {
        filename : 'renderer.bundle.js',
        path : path.join(__dirname, '/dist')
    },
    node : {
        __dirname : false,
        __filename : false
    },
    resolve : {
        extensions : ['.js', '.json', '.ts', '.tsx']
    },
    module : {
        rules : [
            {
                test : /\.(ts|tsx)$/,
                exclude : /node_modules/,
                use : {
                    loader : 'ts-loader'
                }
            },
            {
                test : /\.(scss|css)$/,
                use : [
                    'style-loader',
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap'
                ]
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : path.resolve(__dirname, './public/index.html')
        })
    ]
};

module.exports = [mainConfig, rendererConfig];