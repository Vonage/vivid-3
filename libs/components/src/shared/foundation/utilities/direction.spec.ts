import { Direction } from '@microsoft/fast-web-utilities';
import { getDirection } from "./direction";

describe('getDirection', () => {
  it('should return left to right if dir is not set', () => {
    const rootNode = document.createElement('html');
    expect(getDirection(rootNode)).toEqual(Direction.ltr);
  })
  
  it('should return right to left if dir is set to rtl', () => {
    const rootNode = document.createElement('html');
    rootNode.dir = 'rtl'
    expect(getDirection(rootNode)).toEqual(Direction.rtl);
  });
});