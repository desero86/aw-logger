const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': 'process.env.NODE_ENV'
            }
        })
    ],
    resolve: {
        extensions: ['.ts']
    }
};
