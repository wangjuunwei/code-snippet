const {override, addDecoratorsLegacy, useBabelRc, addWebpackModuleRule, addWebpackAlias} = require('customize-cra')

const path = require('path')
module.exports = override(addDecoratorsLegacy(), useBabelRc(), addWebpackModuleRule(
    {
        test: /\.md$/,
        use: {loader: require.resolve('raw-loader')}
    }
    ),
    addWebpackAlias({
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@component": path.resolve(__dirname, './src/component')
    })
)