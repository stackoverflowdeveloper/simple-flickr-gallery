var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '/dist'
                })
            },
 
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'  
            }, 
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                  'file-loader',
                {
                    loader: 'image-webpack-loader',
                    query: {
                    progressive: true,
                    optimizationLevel: 7,
                    interlaced: false,
                    pngquant: {
                    quality: '65-90',
                    speed: 4
                                    }
                }
            }
            ]
    }

            ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: false,
            allChunks: true
        })
    ]
}