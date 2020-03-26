import { calcDistance } from '../../helpers/SearchHelper.js';

test('calc for two identical lat lng locations', () => {
  expect(calcDistance(80, -40, 80, -40)).toBe(0);
});

test('calc for two identical lat lng locations', () => {
    expect(calcDistance(80, -41, 80, -40)).toBe(11.997204912072544);
  });