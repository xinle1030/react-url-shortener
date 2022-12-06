module.exports = {
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        babelrc: false,
        plugins: [
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-transform-modules-commonjs",
        ],
      },
    ],
  },
};
