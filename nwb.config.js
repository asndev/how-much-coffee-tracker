const path = require('path');

let config = {
  type: 'react-app',
  babel: {
    stage: false,
    presets: ['es2015', 'stage-0', 'react']
  },
  webpack: {
    extra: {
      resolve: {
        extensions: ['.js', '.json'],
        modules: [
          // webpack starts to look for imports from here
          path.resolve('./src'),
          'node_modules'
        ]
      }
    }
  }
};

module.exports = config;
