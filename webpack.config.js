const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'story-grammar.js',
    library: 'storyGrammar',
    path: path.resolve(__dirname, 'build')
  },
};