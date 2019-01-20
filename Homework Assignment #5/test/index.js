/*
 * Test runner
 *
 */

// Dependencies
const assert = require('assert');
const helpers = require('../app/lib');

// Application logic for the test runner
_tests = {};

// Holder of all tests
tests = {
  'unit': {}
};

tests.unit['helpers.getANumber should return a number'] = (done) => {
  const val = helpers.getANumber();
  assert.equal(typeof (val), 'number');
  done();
};

tests.unit['helpers.getANumber should return 1'] = (done) => {
  const val = helpers.getANumber();
  assert.equal(val, 1);
  done();
};

tests.unit['helpers.getNumberOne should return 2'] = (done) => {
  const val = helpers.getANumber();
  assert.equal(val, 2);
  done();
};

tests.unit['helpers.generateNumbers should return a number'] = (done) => {
    const val = helpers.generateNumbers();
    assert.equal(typeof (val), 'number');
    done();
};

tests.unit['helpers.generateNumbers should return a number between 0 and 100'] = (done) => {
    const val = helpers.generateNumbers();
    assert.ok(val <= 100);
    done();
};

tests.unit['helpers.emptyObject should return an empty object'] = (done) => {
    const val = helpers.emptyObject();
    assert.equal(typeof(val), 'object');
    done();
};

// Count all the tests
countTests = () => {
  let counter = 0;
  for (const key in tests) {
    if (tests.hasOwnProperty(key)) {
      const subTests = tests[key];
      for (const testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          counter++;
        }
      }
    }
  }
  return counter;
};

// Run all the tests, collecting the errors and successes
runTests = () => {
  const errors = [];
  let successes = 0;
  const limit = countTests();
  let counter = 0;
  for (const key in tests) {
    if (tests.hasOwnProperty(key)) {
      const subTests = tests[key];
      for (const testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          (function () {
            const tmpTestName = testName;
            const testValue = subTests[testName];
            // Call the test
            try {
              testValue(function () {
                // If it calls back without throwing, then it succeeded, so log it in green
                console.log('\x1b[32m%s\x1b[0m', tmpTestName);
                counter++;
                successes++;
                if (counter == limit) {
                  produceTestReport(limit, successes, errors);
                }
              });
            } catch (e) {
              // If it throws, then it failed, so capture the error thrown and log it in red
              errors.push({
                'name': testName,
                'error': e
              });
              console.log('\x1b[31m%s\x1b[0m', tmpTestName);
              counter++;
              if (counter == limit) {
                produceTestReport(limit, successes, errors);
              }
            }
          })();
        }
      }
    }
  }
};

// Product a test outcome report
produceTestReport = (limit, successes, errors) => {
  console.log("");
  console.log("--------BEGIN TEST REPORT--------");
  console.log("");
  console.log("Total Tests: ", limit);
  console.log("Pass: ", successes);
  console.log("Fail: ", errors.length);
  console.log("");

  // If there are errors, print them in detail
  if (errors.length > 0) {
    console.log("--------BEGIN ERROR DETAILS--------");
    console.log("");
    errors.forEach(function (testError) {
      console.log('\x1b[31m%s\x1b[0m', testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("");
    console.log("--------END ERROR DETAILS--------");
  }


  console.log("");
  console.log("--------END TEST REPORT--------");
  process.exit(0);
};

// Run the tests
runTests();