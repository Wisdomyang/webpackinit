const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: path.resolve(__dirname, "main.js"),
  externals: {
    vue: "Vue"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [{ loader: "vue-loader" }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue", ".jsx", ".less"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isProduction ? '"production"' : '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    }),
    new VueLoaderPlugin()
  ]
};

if (!isProduction) {
  config.mode = "development";
  config.devtool = "#cheap-module-eval-source-map";
  config.devServer = {
    clientLogLevel: "warning",
    progress: false,
    port: 8000,
    host: "0.0.0.0",
    overlay: {
      errors: true
    },
    hot: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.mode = "production";
  config.devtool = "#source-map";
  config.entry = {
    app: path.join(__dirname, "main.js")
    // vendor: ["vue"]
  };
  config.output.filename = "[name].[chunkhash:8].js";
  // 为babel-loader 添加缓存文件
  config.module.rules[0].use[0].loader = "babel-loader?cacheDirectory";
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  };
}

module.exports = config;
