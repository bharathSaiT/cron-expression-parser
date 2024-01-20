const { expandCronField } = require('../src/expandCronField');
const { checkValidEntry } = require('../src/inputValidator');

// Mocking the checkValidEntry function
jest.mock('../src/inputValidator');

describe('expandCronField function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('expands a valid cron field with range', () => {
    const cronFieldValue = '1-5/2';
    const index = 0;

    // Mocking the checkValidEntry calls
    const expectedCheckValidEntryCalls = [
      [1, index],
      [3, index],
      [5, index],
    ];

    // Calling the expandCronField function
    const result = expandCronField(cronFieldValue, index);

    // Expectations
    expect(result).toBe('1 3 5');
  });

  test('expands a valid cron field without range', () => {
    const cronFieldValue = '*/3';
    const index = 1;

    // Mocking the checkValidEntry calls
    const expectedCheckValidEntryCalls = [
      [0, index],
      [3, index],
      [6, index],
      [9, index],
      [12, index],
      [15, index],
      [18, index],
      [21, index],
    ];

    // Calling the expandCronField function
    const result = expandCronField(cronFieldValue, index);

    // Expectations
    expect(result).toBe('0 3 6 9 12 15 18 21');
  });

  test('handles special case for day of the week', () => {
    const cronFieldValue = '5-7';
    const index = 4;

    // Mocking the checkValidEntry calls
    const expectedCheckValidEntryCalls = [
      [5, index],
      [6, index],
      [7, index],
    ];

    // Calling the expandCronField function
    const result = expandCronField(cronFieldValue, index);

    // Expectations
    expect(result).toBe('0 5 6');
  });

  test('expands a valid cron field with single value and interval', () => {
    const cronFieldValue = '2/5';
    const index = 0;

    // Mocking the checkValidEntry calls
    const expectedCheckValidEntryCalls = [
      [2, index],
      [7, index],
      [12, index],
      [17, index],
      [22, index],
      [27, index],
      [32, index],
      [37, index],
      [42, index],
      [47, index],
      [52, index],
      [57, index],
    ];

    // Calling the expandCronField function
    const result = expandCronField(cronFieldValue, index);

    // Expectations
    expect(result).toBe('2 7 12 17 22 27 32 37 42 47 52 57');
  });

  test('expands a valid cron field with single value and specific frequency', () => {
    const cronFieldValue = '10/3';
    const index = 1;

    // Mocking the checkValidEntry calls
    const expectedCheckValidEntryCalls = [
      [10, index],
      [13, index],
      [16, index],
      [19, index],
      [22, index]
    ];

    // Calling the expandCronField function
    const result = expandCronField(cronFieldValue, index);

    // Expectations
    expect(result).toBe('10 13 16 19 22');
  });
});
