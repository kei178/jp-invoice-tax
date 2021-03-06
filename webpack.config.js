var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => {
  return {
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
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        'process.env.VUE_APP_TELEGRAM_CHAT_ID': JSON.stringify(env.TELEGRAM_CHAT_ID),
        'process.env.VUE_APP_TELEGRAM_TOKEN': JSON.stringify(env.TELEGRAM_TOKEN)
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new CopyWebpackPlugin([
        { from: './access_exclusion.html', to: './access_exclusion.html' }
      ])
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()]
    }
  }
}
