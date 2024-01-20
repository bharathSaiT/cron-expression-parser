const { checkValidEntry } = require('../src/inputValidator'); 

describe('checkValidEntry function', () => {
    test('valid entry should not throw an error', () => {
        expect(() => checkValidEntry(30, 2)).not.toThrow();
    });

    test('entry less than 0 should throw an error', () => {
        expect(() => checkValidEntry(-1, 3)).toThrowError('Entry for month field should be in the range of 0-12');
    });

    test('entry greater than upper limit should throw an error', () => {
        expect(() => checkValidEntry(60, 0)).toThrowError('Entry for minute field should be in the range of 0-59');
    });

    test('valid entry at upper limit should not throw an error', () => {
        expect(() => checkValidEntry(7, 4)).not.toThrow();
    });
    
    it('should throw an error for a non-numeric value', () => {
        expect(() => checkValidEntry('nonNumeric', 2)).toThrowError('Entry for day of month field should be a valid numerical value');
    });

    it('should throw an error for a non-integer value', () => {
        expect(() => checkValidEntry('3.5', 1)).toThrowError('Entry for hour field should be a valid numerical value');
    });
});
