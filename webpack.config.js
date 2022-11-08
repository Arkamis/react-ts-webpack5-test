const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/main.tsx",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      theme: path.resolve(__dirname, "./src/theme"),
      i18n: path.resolve(__dirname, "./src/i18n"),
    },
    extensions: [".jsx", ".ts", ".js", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "webpack Boilerplate",
      // favicon: paths.src + "/images/favicon.png",
      // filename: "index.html", // output file,
      template: "./public/index.html",
    }),
  ],
};
