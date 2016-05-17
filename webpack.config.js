var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [
  new ExtractPlugin('bundle.css'),// <=== where should content be piped
  new webpack.optimize.CommonsChunkPlugin({
        name:'common',
        //filename: 'commons-[chunkhash].js',
        children:true,
        minChunks:2
       })
];

if(production){
  plugins = plugins.concat([
    //production plugins go here

        // Cleanup the builds/ folder before
        // compiling our final assets
        new CleanPlugin('dist'),

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle 压缩
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
 

    ]);
}

var config = {
    //context:__dirname,
    /*node:{
      __filename:false,
      __dirname:false
    },*/
    entry: {
      index: ['./src/index.js']
    },
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: '/dist/',
        filename: production ? '[name]-[hash].js':'[name].js',
        chunkFilename: "[name]-[chunkhash]-chunk.js"
    },

    plugins:plugins,
    //publicPath: path.join(__dirname,'/dist'),
    
    module: {
        loaders: [
          { 
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            loader: 'babel-loader'
            /*query: {
              presets: ['es2015']
            }*/
          },
         {
            test: /\.less$/,
            //loader:'style!css!less'
            loader: ExtractPlugin.extract('style', 'css!less'),
          },
          {
            test:/\.html$/,
            loader:'html'
          }
        ]
    },
    debug: !production,
    devtool: production ? false : 'eval',
    resolve: {
    // 现在可以写 require('file') 代替 require('file.js')
    extensions: ['', '.js', '.json'] 
  }
};


module.exports = config;