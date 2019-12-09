var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(process.env.NODE_ENV)
console.log('TELEGRAM_CHAT_ID', env.TELEGRAM_CHAT_ID)

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, 
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // this rule handles images
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },

      // the following 3 rules handle font extraction
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    // index.html into dist
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ]   
}

if (process.env.NODE_ENV === 'production') {
  console.log('TELEGRAM_CHAT_ID', env.TELEGRAM_CHAT_ID)

  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = env => {
    return (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'process.env.VUE_APP_TELEGRAM_CHAT_ID': JSON.stringify(env.TELEGRAM_CHAT_ID),
        'process.env.VUE_APP_TELEGRAM_TOKEN': JSON.stringify(env.TELEGRAM_TOKEN)
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }

  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  module.exports = {
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    }
  }
}
