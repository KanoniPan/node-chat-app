const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res= isRealString(666);
    expect(res).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var res= isRealString('   ');
    expect(res).toBe(false);
});
it('should allow stringwith non-space characters', () => {

  var res= isRealString('  gsdgsd ');
  expect(res).toBe(true);
});
});
