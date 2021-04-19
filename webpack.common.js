const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry:{
    'main': `./src/common/scripts/main/index.js`,
    'sampleApp': './src/common/scripts/sampleApp/index.js'
  },
  output:{
    path:path.join(__dirname,'dist'),
    filename:"common/scripts/[name].js"
  },
  module: {
    rules: [
      // ==== babel ====
      {
        test:/\.js$/,
        use:[
          {
            loader:"babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
              ]
            }
          }
        ]
      },
      // ==== vue ====
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  target: ["web", "es5"],
  plugins:[
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue'], 
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}