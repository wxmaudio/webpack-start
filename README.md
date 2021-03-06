# webpack-start
A webpack start project.

# Usage
##development
* Step1: Install dependencies
```shell
  npm install
```

  * Step2: Run server
```shell
  npm run dev
```
  or
```shell
  webpack-dev-server --inline --hot
```

  * Step3: Visit url
```shell
  http://localhost:8080/webpack-dev-server
```

##production
```shell
npm run production
```
or
``` shell
NODE_ENV=production webpack --config webpack.config.js --display modules --display chunks
```

# TODO
* 将静态文件打包进dist下对应的文件夹中
* 为不同的页面生成自己的静态文件打包
* common公用静态文件优化


# License

[MIT](http://www.opensource.org/licenses/mit-license.php)

# Other Resources
* [Webpack documentation](http://webpack.github.io/docs/)
* [List of loaders](http://webpack.github.io/docs/list-of-loaders.html)
* [List of plugins](http://webpack.github.io/docs/list-of-plugins.html)
* [react-webpack-cookbook](christianalfoni.github.io/react-webpack-cookbook/)