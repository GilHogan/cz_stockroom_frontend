
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  assetsDir: 'static',
  devServer: {
    port: 18095,     // 端口号
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '',
        // }
      }
    }
  },
  configureWebpack () {
    return {
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              {
                loader: "sass-loader",
                options: {
                  additionalData: `
                    @import "@/styles/_variables.scss";
                    @import "@/styles/_mixins.scss";
                  `
                },
              },
            ],
          }
        ]
      },
    }
  },
  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    // 网页标题
    config.plugin('html')
      .tap(args => {
        args[0].title = "常州存量房成交量统计";
        return args;
      })
  }
};