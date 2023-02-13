module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver",
        {
          alias: {
            "@environments": "./environments",
            "@assets": "./assets",
            "@animations": "./assets/animations",
            "@fonts": "./assets/fonts",
            "@images": "./assets/images",
            "@icons": "./assets/icons",
            "@sounds": "./assets/sounds",
            "@app": "./app",
            "@core": "./app/core",
            "@contexts": "./app/core/contexts",
            "@hooks": "./app/core/hooks",
            "@utils": "./app/core/utils",
            "@screens": "./app/screens",
            "@shared": "./app/shared",
            "@components": "./app/shared/components",
            "@interfaces": "./app/shared/interfaces",
            "@enums": "./app/shared/enums",
            "@mocks": "./app/shared/mocks",
            "@theme": "./app/theme.ts",
          }
        }
      ],
    ],
  };
};
