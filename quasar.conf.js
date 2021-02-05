/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers');
const path = require('path');
// extract css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// clean dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// build list
var ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
// const settings = require('./src/settings.json');
module.exports = configure(function(ctx) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: true,
      },
    },
    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: ['main', 'i18n'],
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['index.scss'],
    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'material-icons', // optional, you are not bound to it
    ],
    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      transpile: false,
      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      transpileDependencies: [],
      rtl: false, // https://quasar.dev/options/rtl-support
      preloadChunks: true,
      showProgress: false,
      gzip: true,
      analyze: false,
      // Options below are automatically set depending on the env, set them if you want to override
      extractCSS: false,
      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack(cfg) {
        // linting is slow in TS projects, we execute it only for production builds
        if (ctx.prod) {
          cfg.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
          });
          cfg.plugins.push(
            ...[
              new CleanWebpackPlugin(),
              new ManifestPlugin({
                fileName: 'list.json',
              }),
              new webpack.BannerPlugin({
                banner: 'design: hejian\nhash: [hash]\nchunkhash: [chunkhash]\nname: [name]\nv: ' + 'v.' + new Date(),
                raw: true,
              }),
              new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: '[name].[hash:6].css',
                chunkFilename: '[id].[hash:6].css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
                options: {
                  rules: [
                    {
                      test: /\.(sa|sc|c)ss$/,
                      use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    },
                  ],
                },
              }),
            ],
          );
        }
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          // Add you own alias like this
          '@': path.resolve(__dirname, 'src'),
        };
      },
    },
    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 9002,
      open: true, // opens browser window automatically
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'http://127.0.0.1:' + 9004,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack
      config: {
        loadingBar: {
          color: 'primary',
          size: '4px',
          position: 'top',
        },
        notify: {
          position: 'bottom-right',
          timeout: 2500,
        },
      },
      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',
      plugins: ['Notify', 'AppFullscreen', 'LoadingBar', 'Loading', 'Dialog', 'BottomSheet'],
      components: ['QHeader', 'QFooter', 'QTooltip'],
      directives: ['Ripple', 'Mutation', 'Scroll'],
    },
    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ['fadeIn', 'fadeOut', 'fadeInRight'],
    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },
    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'quasar admin with typescript ',
        short_name: 'quasar admin with typescript ',
        description: 'quasar admin',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#0080ff',
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

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },
    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },
    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
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
        appId: 'quasar.typescript.admin.template',
      },
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,
      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  };
});
