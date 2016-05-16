var path = require('path');

var config = {
    //context:__dirname,
    /*node:{
      __filename:false,
      __dirname:false
    },*/
    entry: {
      index: './src/index.js'
    },
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: '/dist/',
        filename: "bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    
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