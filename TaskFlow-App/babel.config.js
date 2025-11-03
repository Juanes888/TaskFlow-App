module.exports = function (api) {
  api.cache(true);
  return {
    // Use the Expo preset which includes the common transforms for
    // React Native + Expo projects. It's simpler and avoids preset
    // mismatches like the one you're seeing.
    presets: ['babel-preset-expo'],
  };
};
