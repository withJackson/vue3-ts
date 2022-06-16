const { defineConfig } = require("@vue/cli-service");

const CompressionPlugin = require("compression-webpack-plugin");

const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .end();
      config.plugins.delete("prefetch");
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 0,
        algorithm: "gzip",
        minRatio: 0.8,
      }),
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
});
