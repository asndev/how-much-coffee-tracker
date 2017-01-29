module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    files: [
      {pattern: './src/**/*.spec.js'}
    ],
    preprocessors: {
      './src/**/*.spec.js': ['webpack', 'sourcemap']
    },
    autoWatch: true,
    reporters: ['dots'],
    logLevel: config.LOG_INFO,
    singleRun: false,
    browsers: ['Chrome'],
    customLaunchers: {
      // tell TravisCI to use chromium when testing
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    webpack: require('./webpack.config'),
    webpackServer: {
      noInfo: true
    }
  });

  // Detect if this is TravisCI running the tests and tell it to use chromium
  if (process.env.TRAVIS) {
      config.browsers = ['Chrome_travis_ci'];
  }
};
