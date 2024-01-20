const { parseCronExpression } = require('../src/parseCronExpression');
const { expandCronField } = require('../src/expandCronField');

// Mocking the expandCronField function
jest.mock('../src/expandCronField');

describe('parseCronExpression function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('parses a valid cron expression', () => {
    const cronExpression = '30 4 * * 1-5';
    const expectedFields = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    const expectedExpandedValues = ['30', '4', '*', '*', '1-5'];

    // Mocking the expandCronField calls
    expectedExpandedValues.forEach((value, index) => {
      expandCronField.mockReturnValueOnce(value);
    });

    // Calling the parseCronExpression function
    const result = parseCronExpression(cronExpression);

    // Expectations
    expect(result).toEqual([expectedFields, expectedExpandedValues]);
    expectedExpandedValues.forEach((value, index) => {
      expect(expandCronField).toHaveBeenNthCalledWith(index + 1, value, index);
    });
  });

  test('throws an error for an invalid cron expression with more than 6 fields', () => {
    const cronExpression = '30 4 * * 1-5 * *';

    // Calling the parseCronExpression function should throw an error
    expect(() => parseCronExpression(cronExpression)).toThrowError("The cron expression doesn't have the exact expected 6 fields");
  });

  test('handles expandCronField errors', () => {
    const cronExpression = '30 4 * * 1-5';
    const expectedFields = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    const expectedExpandedValues = ['30', '4', '*', '*', '1-5'];

    // Mocking an error in the expandCronField function
    expandCronField.mockImplementation(() => {
      throw new Error('Mocked expandCronField error');
    });

    // Calling the parseCronExpression function should throw an error
    expect(() => parseCronExpression(cronExpression)).toThrowError('Mocked expandCronField error');
  });
});

