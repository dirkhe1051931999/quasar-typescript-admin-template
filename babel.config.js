/* eslint-disable */

module.exports = (api) => {
  return {
    presets: [
      [
        '@quasar/babel-preset-app',
        api.caller((caller) => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {},
      ],
    ],
    plugins: [
      [
        'prismjs',
        {
          languages: ['javascript', 'css', 'json', 'xml', 'html'],
          plugins: [],
          theme: 'coy',
          css: true,
        },
      ],
    ],
  };
};
