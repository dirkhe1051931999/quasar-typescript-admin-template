/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

/* eslint-disable @typescript-eslint/no-var-requires */

const { configure } = require('quasar/wrappers');
const setting = require('./src/setting.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const multiplePage = require('./multiple.page.generate');
const path = require('path');

module.exports = configure((ctx) => {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: ['./src/**/*.{ts,tsx,js,jsx,vue}'],
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ['i18n', 'axios', 'main', 'register-component'],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
      'material-icons-outlined',
    ],
    
    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      transpile: false,
      publicPath: process.env.NODE_ENV !== 'production' ? null : setting.publicPath,
      distDir: ctx.modeName === 'spa' ? `dist${setting.publicPath}` : `dist/${ctx.modeName}`,
      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      transpileDependencies: ['vuex-module-decorators'],

      rtl: false, // https://quasar.dev/options/rtl-support
      preloadChunks: true,
      showProgress: true,
      scssLoaderOptions: { additionalData: `$publicPath: ${process.env.NODE_ENV === 'production' ? setting.publicPath.replace(/\//g, '') : 'null'};` },
      gzip: true,
      analyze: false,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/* chain */) {},
      extendWebpack(cfg) {
        // linting is slow in TS projects, we execute it only for production builds
        if (ctx.prod) {
          cfg.plugins.push(new CleanWebpackPlugin());
        }
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          src2: path.resolve(__dirname, './src2'),
        };
        cfg.entry = Object.assign(multiplePage.getEntryPages('src2'), cfg.entry);
        cfg.plugins.push(...multiplePage.htmlPlugins('src2'));
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      https: false,
      port: ctx.mode.ssr ? 9100 : setting.devServerPort,
      open: true, // opens browser window automatically
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: `http://127.0.0.1:${9004}`,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {
        dark: 'auto',
        screen: {
          bodyClasses: true,
        },
        brand: {
          white: '#ffffff',
          negative: '#e93030',
          primary: '#5469d4',
        },
        loadingBar: {
          color: 'primary',
          size: '4px',
          position: 'top',
        },
        notify: {
          position: 'bottom-right',
          timeout: 2500,
        },
        loading: {
          message: 'Loading...',
        },
      },

      iconSet: 'material-icons', // Quasar icon set
      lang: setting.language, // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      components: ['QHeader', 'QFooter', 'QTooltip'],
      directives: ['Ripple', 'Mutation', 'Scroll'],

      // Quasar plugins
      plugins: ['Notify', 'AppFullscreen', 'LoadingBar', 'Loading', 'Dialog', 'BottomSheet'],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ['fadeIn', 'fadeOut', 'fadeInUp', 'fadeOutDown'],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      // chainWebpackWebserver (/* chain */) {},

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      // chainWebpackCustomSW (/* chain */) {},

      manifest: {
        name: 'Quasar Project',
        short_name: 'Quasar Project',
        description: '',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'quasar-project',
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackMain(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      },
    },
  };
});
