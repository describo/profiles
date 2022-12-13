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
            PRODUCTION: JSON.stringify(true),
            DEVELOPMENT: JSON.stringify(false),
            // VERSION: JSON.stringify("5fa3b9"),
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        }),
    ],
});

module.exports = configuration;
