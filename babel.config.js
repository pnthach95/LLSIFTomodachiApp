const plugins = [];

// if (process.env.NODE_ENV !== 'production') {
//   plugins.push('babel-plugin-typescript-to-proptypes');
// }

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ...plugins,
    [
      'module-resolver',
      {
        root: [
          './App',
        ],
        alias: {
          "^~/(.+)": "./App/\\1"
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
