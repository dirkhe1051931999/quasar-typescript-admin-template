/* eslint-env node */

module.exports = {
  presets: ['@quasar/babel-preset-app'],
  plugins: [
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'json'],
        plugins: [],
        theme: 'coy',
        css: true,
      },
    ],
  ],
};
