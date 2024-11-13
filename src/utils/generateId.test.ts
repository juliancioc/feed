import generateId from './generateId';

describe('generateId', () => {
  it('should return a number', () => {
    const id = generateId();
    
    expect(typeof id).toBe('number');
  });

  it('should return a unique ID each time it is called', () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i++) {
      ids.add(generateId());
    }

    expect(ids.size).toBe(1000);
  });

  it('should generate a 128-bit hexadecimal number', () => {
    const id = generateId();
    const hexString = id.toString(16);

    expect(hexString.length).toBeLessThanOrEqual(32);
  });
});
