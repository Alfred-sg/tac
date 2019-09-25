import { configure } from '@storybook/react';

const req = require.context('/Users/alfred/Desktop/dvp/tac/packages/tac-template-lib/stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename).default)
}

configure(loadStories, module);