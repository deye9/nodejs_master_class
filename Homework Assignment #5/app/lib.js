/*
 * Unit Tests
 *
 */

// Container for all the Unit Test
const helpers = {};

// Sample for testing that simply returns a number
helpers.getANumber = () => {
  return 1;
};

// Generate numbers between 0 and 100
helpers.generateNumbers = () => {
    return Math.floor(Math.random() * Math.floor(100));
};

// Return an empty object
helpers.emptyObject = () => {
    return {};
};

// Export the tests to the runner
module.exports = helpers;