var expect = require('expect');
var {isRealString} = require('../utils/validation');

describe('Validation tests',()=>{
    it('should reject non string values',()=>{
        var text = 123;
        expect(isRealString(text)).toBeFalsy();
    });
    
    it('should accept string values',()=>{
        var text = ' 123 ';
        expect(isRealString(text)).toBeTruthy();
    });    
    it('should reject strings with only spaces',()=>{
        var text = '      ';
        expect(isRealString(text)).toBeFalsy();
    });
})