var glob = require('glob');
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var srcDir = "src/";

var replaceURL = function (stats) {
   var tplDir = path.resolve(__dirname,'../'+srcDir);
    glob(tplDir+'**/*.{html,jsp,htm}',function(err,files){
      console.log("dddd",files);
       (files.length>0) && files.forEach(function(file){
          replaceOneFile(file,stats);
       })
    });
}

function replaceOneFile(file,stats){
    var dist = stats.publicPath;
    fs.readFile(file,function(err,data){
             var $ = cheerio.load(data.toString());            
              /*console.log(stats.assetsByChunkName);
              { 'page1/index': [ 'page1/index-59d18d.js', 'bundle.css' ],
              'page2/log': 'page2/log-59d18d.js',
              common: 'common-59d18d.js' }
               */
              for (var key in stats.assetsByChunkName) {
                    if (stats.assetsByChunkName.hasOwnProperty(key)) {
                        var chunk = stats.assetsByChunkName[key];
                        if(Object.prototype.toString.call(chunk)=='[object Array]'){
                          chunk = chunk[0]  
                        }
                        var $s = $('script[src*="'+key+'"]');
                        var src = $s.attr("src");
                        if($s.length === 0){
                          if($('script').length > 0){
                            $('script').first().before('<script src="'+ dist + chunk + '"></script>');
                           }else{
                             $('body').append('<script src="'+ dist + chunk + '"></script>')
                           }
                        }else{
                          $s.attr("src", dist + chunk);
                        }
                        
                    }
                }
                /*fs.write(path.join(__dirname, 'dist', 'index.html'),$.html()+'',function(err){
                  !err && console.log('Set has success: '+stats.hash);
                })*/
                var filename = file.substring(file.lastIndexOf('\/')+1);
                fs.writeFileSync(
                    path.join(__dirname, '../dist', filename),
                    $.html()
                );
         })
}

module.exports = replaceURL;