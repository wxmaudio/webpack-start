var path = require('path');
var webpack = require('webpack');

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
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    plugins:[
       new webpack.optimize.CommonsChunkPlugin({
        name:'common',
        //filename:'commons-[chunkhash].js'
        children:true,
        minChunks:2
       })
    ],
    //publicPath: path.join(__dirname,'/dist'),
    debug: true,
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
            loader:'style!css!less'
          },
          {
            test:/\.html$/,
            loader:'html'
          }
        ]
    },
    debug: true,
    devtool: 'source-map',
    resolve: {
    // 现在可以写 require('file') 代替 require('file.js')
    extensions: ['', '.js', '.json'] 
  }
};


module.exports = config;