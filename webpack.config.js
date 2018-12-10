const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: path.join(__dirname, "main.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[hash:8].js"
  },
  module: {
    rules: [
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
        test: /\.vue$/,
        use: [{ loader: "vue-loader" }]
      },
      {
        test: /\.jsx$/,
        use: [{ loader: "babel-loader" }]
      }
    ]
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
  config.entry = {
    app: path.join(__dirname, "main.js"),
    vendor: ["vue"]
  };
  config.output.filename = "[name].[chunkhash:8].js";
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
