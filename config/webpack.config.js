// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// const isDevelopment = process.env.NODE_ENV !== "production";

// module.exports = {
//   mode: isDevelopment ? "development" : "production",
//   entry: "./src/main.tsx",
//   devtool: "inline-source-map",
//   output: {
//     filename: "bundle.js",
//     path: path.join(__dirname, "/dist"),
//   },
//   devtool: "inline-source-map",
//   devServer: {
//     static: "./dist",
//     hot: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.[jt]sx?$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//       },
//       {
//         test: /\.tsx?$/,
//         use: "ts-loader",
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     alias: {
//       components: path.resolve(__dirname, "./src/components"),
//       theme: path.resolve(__dirname, "./src/theme"),
//       i18n: path.resolve(__dirname, "./src/i18n"),
//       utils: path.resolve(__dirname, "./src/utils"),
//       hooks: path.resolve(__dirname, "./src/hooks"),
//     },
//     extensions: [".jsx", ".ts", ".js", ".tsx"],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       // title: "webpack Boilerplate",
//       // favicon: paths.src + "/images/favicon.png",
//       // filename: "index.html", // output file,
//       template: path.resolve(__dirname, "public/index.html"),
//     }),
//     new BundleAnalyzerPlugin({
//       analyzerMode: "static", //para que lo haga sólo al momento de hacer el build
//       openAnalyzer: false, //para que nos muestre el resultado inmediatamente
//     }),
//   ],
// };

const { merge } = require("webpack-merge");

// We use this here at edX
module.exports = (env) => {
  const envConfig =
    env.NODE_ENV === "production"
      ? require("./webpack.config.prod")
      : require("./webpack.config.dev");
  console.log("mixin:", { envConfig, env });
  return merge(require("./webpack.config.common"), envConfig);
};
