const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "main.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../dist"),
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "../src/components"),
      theme: path.resolve(__dirname, "../src/theme"),
      i18n: path.resolve(__dirname, "../src/i18n"),
      utils: path.resolve(__dirname, "../src/utils"),
      hooks: path.resolve(__dirname, "../src/hooks"),
    },
    extensions: [".jsx", ".ts", ".js", ".tsx"],
    modules: [
      "node_modules", // The default
      "src",
    ],
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
  plugins: [
    new HtmlWebpackPlugin({
      // title: "webpack Boilerplate",
      // favicon: paths.src + "/images/favicon.png",
      // filename: "index.html", // output file,
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", //para que lo haga sólo al momento de hacer el build
      openAnalyzer: false, //para que nos muestre el resultado inmediatamente
    }),
  ],
};
