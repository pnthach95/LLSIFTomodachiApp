const {withRozenite} = require('@rozenite/metro');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withUniwindConfig} = require('uniwind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = withRozenite(
  withUniwindConfig(mergeConfig(getDefaultConfig(__dirname), config), {
    cssEntryFile: './src/global.css',
    dtsFile: './src/typings/uniwind-types.d.ts',
  }),
  {enabled: process.env.WITH_ROZENITE === 'true'},
);
