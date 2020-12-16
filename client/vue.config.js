module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/index.scss";`,
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'CSGO-Stratbook',
        appId: 'CSGO.Stratbook',
        win: {
          target: 'portable',
          publisherName: 'Hiller',
          icon: './icon.png',
        },
        portable: {
          artifactName: 'CSGO-Stratbook.exe',
        },
        directories: {
          output: 'dist_electron/release',
        },
        protocols: {
          name: 'csgostratbook-protocol',
          schemes: ['csgostratbook'],
        },
      },
    },
  },
  pwa: {
    themeColor: '#23232e',
    name: 'Stratbook',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      maskIcon: 'favicon.png',
      msTileImage: 'favicon.png',
    },
  },
};
