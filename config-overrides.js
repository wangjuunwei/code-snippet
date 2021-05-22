const {override, addDecoratorsLegacy, useBabelRc, addWebpackModuleRule} = require('customize-cra')
module.exports = override(addDecoratorsLegacy(), useBabelRc(), addWebpackModuleRule(
    {
        test: /\.md$/,
        use: {loader: require.resolve('raw-loader')}
    }
))