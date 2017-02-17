var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {

    entry:{
    	main:'./www/build/main.js',
    	polyfills:'./www/build/polyfills.js'
    },
    output: {
        path: './www/build',
         filename: "[name].bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ss']
    },

    plugins: [
     
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })

        
    ]
};