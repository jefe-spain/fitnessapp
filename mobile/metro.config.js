// Learn more https://docs.expo.io/guides/customizing-metro
/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add custom module alias resolution
config.resolver = config.resolver || {};
config.resolver.sourceExts = ['ts', 'tsx', 'js', 'jsx'];
config.resolver.extraNodeModules = {
  '@app': `${__dirname}/app`,
  '@components': `${__dirname}/components`,
  '@store': `${__dirname}/store`,
  '@utilities': `${__dirname}/utilities`,
  '@i18n': `${__dirname}/i18n`
};

module.exports = withNativeWind(config, { input: './global.css' });
