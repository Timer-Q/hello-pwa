// 参考文档 https://dev.to/aumayeung/how-to-use-the-optional-chaining-operator-in-your-react-app-right-now-1ocj

const { useBabelRc, override } = require("customize-cra");
module.exports = override(useBabelRc());