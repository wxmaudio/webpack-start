var glob = require('glob');
var path = require('path');
var srcDir = "src/app";
var getEntry = function () {
  var jsDir = path.resolve(__dirname,'../'+srcDir);
  var entryFiles = glob.sync(jsDir + '/**/*.{js,jsx}');
  var map = {};
  entryFiles.forEach(function(filePath){
    var filename = filePath.substring(filePath.lastIndexOf(srcDir+'\/') + srcDir.length + 1, 
      filePath.lastIndexOf("."));
    map[filename] = filePath;
  });
  //console.log(map);

  return map;
}

module.exports = getEntry();