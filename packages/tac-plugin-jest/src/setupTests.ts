import { JSDOM } from 'jsdom';
import * as Enzyme from 'enzyme';
import Adapter = require('enzyme-adapter-react-16');

interface Global extends NodeJS.Global {
  window: any;
  document: any;
  navigator: any;
}
declare var global: Global;

Enzyme.configure({ adapter: new Adapter() });

// fixed jsdom miss
const documentHTML =
  '<!doctype html><html><body><div id="root"></div></body></html>';
const dom = new JSDOM(documentHTML);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = global.window.navigator;
