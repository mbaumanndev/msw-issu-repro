const babelJest = require("babel-jest").default;

module.exports = (api) => {
  const isTest = api.env("test");
  const presets = [];

  if (isTest) {
    presets.push(["@babel/preset-env", { loose: true }]);
  }

  presets.push(["@babel/preset-react", { runtime: "automatic" }]);
  presets.push("@babel/preset-typescript");

  const plugins = [
    ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
  ];

  if (isTest) {
    plugins.push(function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString("process");
          },
        },
      };
    });

    plugins.push("@babel/plugin-transform-modules-commonjs");
    plugins.push("babel-plugin-transform-import-meta");
  }

  return {
    presets: presets,
    plugins: plugins,
  };
};
