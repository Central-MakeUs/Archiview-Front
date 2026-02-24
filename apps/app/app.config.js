const appJson = require('./app.json');

const baseExpoConfig = appJson.expo;
const isProductionBuild =
  process.env.APP_ENV === 'production' || process.env.EAS_BUILD_PROFILE === 'production';

module.exports = () => {
  const baseInfoPlist = baseExpoConfig.ios?.infoPlist ?? {};

  const infoPlist = isProductionBuild
    ? baseInfoPlist
    : {
        ...baseInfoPlist,
        NSAppTransportSecurity: {
          ...(baseInfoPlist.NSAppTransportSecurity ?? {}),
          NSAllowsArbitraryLoadsInWebContent: true,
          NSAllowsLocalNetworking: true,
        },
      };

  return {
    ...baseExpoConfig,
    ios: {
      ...baseExpoConfig.ios,
      infoPlist,
    },
    android: {
      ...baseExpoConfig.android,
      ...(isProductionBuild ? {} : { usesCleartextTraffic: true }),
    },
  };
};
