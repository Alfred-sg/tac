import '@babel/polyfill';

interface Global extends NodeJS.Global {
  requestAnimationFrame?: Function;
}
declare var global: Global;

/* eslint-disable import/first */
global.requestAnimationFrame =
  global.requestAnimationFrame ||
  function requestAnimationFrame(callback: Function) {
    setTimeout(callback, 0);
  };
