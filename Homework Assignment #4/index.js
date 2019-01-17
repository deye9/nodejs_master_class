/*
 * Primary file for API
 *
 */

// Dependencies
const cli = require('./lib/cli');
const server = require('./lib/server');

// Declare the app
const app = {};

// Init function
app.init = () => {

  // Start the server
  server.init();

  //// Start the workers
  //workers.init();
  
   // Start the CLI, but make sure it starts last
   setTimeout(() => {
    cli.init();
  }, 50);

};

// Self executing
app.init();


// Export the app
module.exports = app;
