var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var  glob = require('glob');
var entry = require('./cfg/entry');
var URLHelper = require('./cfg/replaceURL');


var production = process.env.NODE_ENV === 'production';

var fs = require('fs');
var cheerio = require("cheerio");

var plugins = [
  function (){//将stats.json写入到dist文件夹中
    this.plugin("done",function(stats){
      stats = stats.compilation.getStats().toJson({
                    hash: true,
                    publicPath: true,
                    assets: true,
                    chunks: false,
                    modules: false,
                    source: false,
                    errorDetails: false,
                    timings: false
                });
       fs.writeFileSync(
        path.join(__dirname, "dist", "stats.json"),
        JSON.stringify(stats));
      var json = {}, chunk;
                for (var key in stats.assetsByChunkName) {
                    if (stats.assetsByChunkName.hasOwnProperty(key)) {
                        chunk = stats.assetsByChunkName[key];
                        if(Object.prototype.toString.call(chunk)=='[object Array]'){
                          json[key] = chunk[0];
                        }else{
                          json[key] = chunk;
                        }
                    }
                }
                fs.writeFileSync(
                    path.join(__dirname, 'dist', 'rev-manifest.json'),
                    JSON.stringify(json, null, 2)
                );
    });
  },
  function(){//将模板文件中静态资源的引用替换为最新的带版本号的引用
    this.plugin("done",function(stats){
       stats = stats.compilation.getStats().toJson({
                    hash: true,
                    publicPath: true,
                    assets: true,
                    chunks: false,
                    modules: false,
                    source: false,
                    errorDetails: false,
                    timings: false
                });

      URLHelper(stats);   
    })
  },
  new ExtractPlugin('bundle.css'),// <=== where should content be piped
  new webpack.optimize.CommonsChunkPlugin({
        name:'common',
        //filename: 'commons-[chunkhash].js',
        children:true,
        minChunks:2
       }),

  // This plugins defines various variables that we can set to false
  // in production to avoid code related to them from being compiled
  // in our final bundle
  new webpack.DefinePlugin({
      __SERVER__:  !production,
      __DEV__:     !production,
      __DEVTOOLS__:!production,
      'process.env':   {
          BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
      },
  }),

  //将页面上的静态文件替换成为打包后的文件
        //new HtmlWebpackPlugin(),
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        })
];
//开发环境
if(!production){
    plugins = plugins.concat([
        
    ]);
}
//生产环境
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


    ]);
}


var config = {
    //context:__dirname,
    /*node:{
      __filename:false,
      __dirname:false
    },*/
    /*entry: {
      index: ['./src/app/page1'],
      log: './src/app/page2',
      //第三方代码
     vender:['jquery']
    },*/
    entry:entry,
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: production?'http://cdn.domain.com':'/dist/',
        filename: production?'[name]-[hash:6].min.js':'[name]-[hash:6].js',
        chunkFilename: production?'./chunk/[name]-[chunkhash:6].min.js':'./chunk/[name]-[chunkhash:6].js',

    },

    plugins:plugins,
    //publicPath: path.join(__dirname,'/dist'),
    
    module: {
        preLoaders :[
           /*{
                test:/\.js/,
                loader:'eslint',
            },*/
            {
                test:/\.js/,
                loader:'baggage?[file].html=template&[file].less'
            },
        ],
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
            loader: ExtractPlugin.extract('style', 'css!autoprefixer?{browsers:"last 2 version"}!less'),
          },
          {
            test:/\.html$/,
            loader:'html',
          },
          {
            test:/\.(gif|jpe?g|png|svg)$/i,
            loader:'url-loader?limit=10000',
          }
        ]
    },
    debug: !production,
    devtool: production ? false : 'eval',
    resolve: {
        //把node_modules路径添加到resolve search root列表里边，这样就可以直接load npm模块
        root: [process.cwd() + '/src', process.cwd() + '/node_modules'],
        //通过别名把用户的一个请求重定向到另一个路径
        alias:{
            'jquery':'jquery/dist/jquery.min.js'
        },
        // 现在可以写 require('file') 代替 require('file.js')
        extensions: ['', '.js', '.json'], 

  },externals: {
    //使用cdn的Jquery
    //jquery: true
  }
};


module.exports = config;