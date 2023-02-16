const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8080,  //自定义端口号
    host: 'localhost',
    open: true, //配置浏览器自动启动
    // 代理跨域
    proxy: {
      '/api': {
        // 获取数据的IP地址
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' }  //路径重写
      },
      '/163': {
        target: 'https://music.163.com',
        pathRewrite: { '^/163': '' }
      }
    }
  }
})
