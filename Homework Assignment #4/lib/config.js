/*
 * Create and export configuration variables
 *
 */

// Container for all environments
const environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort': 300,
  'httpsPort': 301,
  'envName': 'staging',
  'hashingSecret': 'thisIsASecret',
  'templateGlobals': {
    'appName': 'Delightful Pizza',
    'companyName': 'Delightful Pizza, Inc.',
    'yearCreated': '2018',
    'baseUrl': 'http://localhost:300/'
  }
};

// Production environment
environments.production = {
  'httpPort': 500,
  'httpsPort': 501,
  'envName': 'production',
  'hashingSecret': 'thisIsAlsoASecret',
  'templateGlobals': {
    'appName': 'Delightful Pizza',
    'companyName': 'Delightful Pizza, Inc.',
    'yearCreated': '2018',
    'baseUrl': 'http://localhost:500/'
  }
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
const environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;