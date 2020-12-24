const {override, addDecoratorsLegacy, useBabelRc} = require('customize-cra')
module.exports = override(addDecoratorsLegacy(), useBabelRc())