const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",

    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir);
        const entryFile = path.join(fullDir, "app.ts");


        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entryFile)) {
            entries[dir] = ['webpack-hot-middleware/client', entryFile];
        }
        // console.log(entries);
        return entries;
    }, {}),

    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__/'
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}