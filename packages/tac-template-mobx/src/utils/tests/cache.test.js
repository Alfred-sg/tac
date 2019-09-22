// import { set, get } from '../cache';

// test('cache test', () => {
//   set("mainKey", "subKey", 1);
//   expect(get("mainKey", "subKey")).toBe(1);
// });
function sum(a, b) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3); });