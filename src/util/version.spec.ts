import Version from './version';

describe('Parse', () => {
  test.each([
    ['1', '1'],
    ['1.0', '1.0'],
    ['1.0-beta', '1.0-beta'],
    ['1.10.3', '1.10.3'],
    ['1.10.3.4', '1.10.3.4'],
    ['1.10.3.5-alpha', '1.10.3.5-alpha'],
    ['1.10.03-alpha', '1.10.3-alpha'],
  ])('should correctly parse version %s', (versionNumber, expected) => {
    const result = Version.parse(versionNumber);
    expect(result.toString()).toBe(expected);
  });

  test.each([
    ['a'],
    ['abc'],
    ['1+0'],
    ['-1'],
    ['+1'],
    ['0x1'],
    ['.1'],
    ['0.1..'],
    ['1.10.3.5.alpha'],
  ])('should fail to parse version %s', (versionNumber) => {
    expect(() => {
      const version = Version.parse(versionNumber);
      console.log({...version});
    }).toThrow();
  });
});

describe('Compare', () => {
  test.each([
    ['1', '1', 0],
    ['1.0', '1', 0],
    ['1.01-beta', '1.1-beta', 0],
    ['1.1', '1.1-beta', -1],
    ['1.10', '1.10.3', -1],
    ['1.2', '1.10', -1],
    ['1.5', '1.2', 1],
    ['1.1-beta', '1.1-alpha', 1],
  ])('should correctly compare version %s and %s', (version1, version2, expected) => {
    const result = Version.parse(version1).compare(Version.parse(version2));
    expect(result).toBe(expected);
  });
});
