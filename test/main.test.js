const { main } = require('../src/main');
const { parseCronExpression } = require('../src/parseCronExpression');
const { createTableBorder } = require('../src/tableFormatter');

// Mocking console.log
console.log = jest.fn();

// Mocking process.argv
process.argv = ['node', 'main.js', '*/5 * * * *']; // Example cron expression

// Mocking parseCronExpression
jest.mock('../src/parseCronExpression');
parseCronExpression.mockReturnValue([
  [
    'minute',
    'hour',
    'day of month',
    'month',
    'day of week',
    'command'
  ],
  [
    '1 16 31',
    '5 7 9 11 13 15 17 19 21 23',
    '2 3 4 5 6 7 8 9 10 11 12 13 14 15 16',
    '8',
    '0 1 2 3 4 5 6',
    '/usr/bin/find'
  ]
]);

// Mocking createTableBorder
jest.mock('../src/tableFormatter', () => ({
    createTableBorder: jest.fn(),
}));

describe('main function', () => {
    test('prints table with correct values', () => {
        main();

        // Expectations
        expect(parseCronExpression).toHaveBeenCalledWith('*/5 * * * *');
        expect(createTableBorder).toHaveBeenCalledTimes(3); // Called before and after printing the table
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Field'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Value'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('|Field        | Value                                                                               |'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('|minute        1 16 31                                                                              |'));
    });

    test('throws an error and prints usage message if incorrect number of arguments', () => {
        process.argv = ['node', 'main.js'];

        // Expectations
        expect(() => main()).toThrowError("Usage: main.js <cron_expression>");
    });
});
