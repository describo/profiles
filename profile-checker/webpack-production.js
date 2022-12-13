const { merge } = require("webpack-merge");
const common = require("./webpack-common");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const configuration = merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "..", "..", "docs"),
        filename: "[contenthash].js",
        publicPath: "/profiles",
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "production",
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        }),
    ],
});

module.exports = configuration;
