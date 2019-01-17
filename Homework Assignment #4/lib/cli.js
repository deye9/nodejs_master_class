/*
 * CLI-related tasks
 *
 */

// Dependencies
const events = require('events');
class _events extends events {};
const e = new _events();

const os = require('os'),
  v8 = require('v8'),
  util = require('util'),
  _data = require('./data'),
  _logs = require('./logs'),
  debug = util.debuglog('cli'),
  readline = require('readline'),
  helpers = require('./helpers');

// Instantiate the cli module object
const cli = {};

// Input handlers
e.on('man', (str) => {
  cli
    .responders
    .help();
});

e.on('help', (str) => {
  cli
    .responders
    .help();
});

e.on('exit', (str) => {
  cli
    .responders
    .exit();
});

e.on('list menu', (str) => {
  cli
    .responders
    .listmenu();
});

e.on('menu details', (str) => {
  cli
    .responders
    .menudetails(str);
});

e.on('list orders', (str) => {
  cli
    .responders
    .listorders(str);
});

e.on('order details', (str) => {
  cli
    .responders
    .orderdetails(str);
});

e.on('list users', (str) => {
  cli
    .responders
    .listusers();
});

e.on('more user info', (str) => {
  cli
    .responders
    .userdetails(str);
});

// Responders object
cli.responders = {};

// Help / Man
cli.responders.help = () => {

  // Codify the commands and their explanations
  const commands = {
    'exit': 'Kill the CLI (and the rest of the application)',
    'man': 'Show this help page',
    'help': 'Alias of the "man" command',
    'List Menu': 'Get all menu categories from the system',
    'Menu Details --{category}': 'View all the current menu items',
    'List Orders': 'View all the recent orders in the system (orders placed in the last 24 hours)',
    'Order Details --{OrderID}': 'Lookup the details of a specific order by order ID',
    'List Users': 'View all the users who have signed up in the last 24 hours',
    'More User Info --{email}': 'Lookup the details of a specific user by email address'
  };

  // Show a header for the help page that is as wide as the screen
  cli.horizontalLine();
  cli.centered('CLI MANUAL');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Show each command, followed by its explanation, in white and yellow respectively
  for (const key in commands) {
    if (commands.hasOwnProperty(key)) {
      const value = commands[key];
      let line = '      \x1b[33m ' + key + '      \x1b[0m';
      const padding = 60 - line.length;
      for (i = 0; i < padding; i++) {
        line += ' ';
      }
      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  }
  cli.verticalSpace(1);

  // End with another horizontal line
  cli.horizontalLine();

};

// Create a vertical space
cli.verticalSpace = (lines) => {
  lines = typeof (lines) == 'number' && lines > 0 ?
    lines :
    1;
  for (i = 0; i < lines; i++) {
    console.log('');
  }
};

// Create a horizontal line across the screen
cli.horizontalLine = () => {

  // Get the available screen size
  const width = process.stdout.columns;

  // Put in enough dashes to go across the screen
  let line = '';
  for (i = 0; i < width; i++) {
    line += '-';
  }
  console.log(line);
};

// Create centered text on the screen
cli.centered = (str) => {
  str = typeof (str) == 'string' && str
    .trim()
    .length > 0 ?
    str.trim() :
    '';

  // Get the available screen size
  const width = process.stdout.columns;

  // Calculate the left padding there should be
  const leftPadding = Math.floor((width - str.length) / 2);

  // Put in left padded spaces before the string itself
  let line = '';
  for (i = 0; i < leftPadding; i++) {
    line += ' ';
  }
  line += str;
  console.log(line);
};

// Exit
cli.responders.exit = () => {
  process.exit(0);
};

// Menu
cli.responders.listmenu = () => {
  _data.list('../.data/menu/', (err, FileNames) => {
    if (err == false && FileNames && FileNames.length > 0) {
      // Show a header that is as wide as the screen
      cli.horizontalLine();
      cli.centered('Current Menu List');
      cli.horizontalLine();
      cli.verticalSpace(2);

      for (var FileName in FileNames) {
        console.log(parseInt(FileName) + 1 + ' = ' + FileNames[FileName]);
        cli.verticalSpace();
      }
    }
  });
};

// List Menu
cli.responders.menudetails = (str) => {
  // Get the FileName from the string passed in
  const arr = str.split('--');
  const FileName = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;

  // Only process the input if the user actually wrote something, otherwise ignore it
  if (FileName) {
    _data.read('/menu/', FileName, (err, menus) => {
      // Show a header that is as wide as the screen
      cli.horizontalLine();
      cli.centered('Menu Items');
      cli.horizontalLine();
      cli.verticalSpace(2);

      if (err == false && menus) {
        console.log(menus);
        cli.verticalSpace();
      }
    });
  }
};

// List Orders
cli.responders.listorders = () => {
  _data.list('../.data/cart/', (err, FileNames) => {
    if (err == false && FileNames && FileNames.length > 0) {
      // Show a header that is as wide as the screen
      cli.horizontalLine();
      cli.centered('Recent Orders');
      cli.horizontalLine();
      cli.verticalSpace(2);

      for (var FileName in FileNames) {
        console.log('Order ' + (parseInt(FileName) + 1) + ' = ' + FileNames[FileName]);
        cli.verticalSpace();
      }
    }
  });
};

// Order Details
cli.responders.orderdetails = (str) => {
  // Get the order ID from the string passed in
  const arr = str.split('--');
  const OrderID = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;

  // Only process the input if the user actually wrote something, otherwise ignore it
  if (OrderID) {
    _data.read('/cart/', OrderID, (err, menus) => {
      // Show a header that is as wide as the screen
      cli.horizontalLine();
      cli.centered('Order Details');
      cli.horizontalLine();
      cli.verticalSpace(2);

      if (err == false && menus) {
        console.log(menus);
        cli.verticalSpace();
      }
    });
  }
};

// List Users
cli.responders.listusers = () => {
  _data.list('../.data/users/', (err, FileNames) => {
    if (err == false && FileNames && FileNames.length > 0) {
      // Show a header that is as wide as the screen
      cli.horizontalLine();
      cli.centered('Users List');
      cli.horizontalLine();
      cli.verticalSpace(2);

      for (var FileName in FileNames) {

        // Get the details of the user
        _data.read('../.data/users', FileNames[FileName], (err, userData) => {

          if (!err && userData) {
            const line = 'User Details: FullName: ' + userData.firstName + ' ' + userData.lastName + ' ' + 'Email: ' + userData.email + 'Phone Number: ' + userData.phone;
            console.log(line);
            cli.verticalSpace();
          }
        });
      }
    }
  });
};

// User Details
cli.responders.userdetails = (str) => {
  // Get the email from the string passed in
  const arr = str.split('--');
  const email = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;

  // Only process the input if the user actually wrote something, otherwise ignore it
  if (email) {
    _data.read('/users/', email, (err, menus) => {
      // Show a header that is as wide as the screen
      cli.horizontalLine();
      cli.centered('User Details');
      cli.horizontalLine();
      cli.verticalSpace(2);

      if (err == false && menus) {
        console.log(menus);
        cli.verticalSpace();
      }
    });
  }
};

// Input processor
cli.processInput = function (str) {
  str = typeof (str) == 'string' && str
    .trim()
    .length > 0 ?
    str.trim() :
    false;
  // Only process the input if the user actually wrote something, otherwise ignore it
  if (str) {
    // Codify the unique strings that identify the different unique questions
    // allowed be the asked
    const uniqueInputs = [
      'man',
      'help',
      'exit',
      'list menu',
      'menu details',
      'list orders',
      'order details',
      'list users',
      'more user info'
    ];

    // Go through the possible inputs, emit event when a match is found
    let matchFound = false;
    const counter = 0;
    uniqueInputs.some(function (input) {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        // Emit event matching the unique input, and include the full string given
        e.emit(input, str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if (!matchFound) {
      console.log("Sorry, try again");
    }

  }
};

// Init script
cli.init = function () {

  // Send to console, in dark blue
  console.log('\x1b[34m%s\x1b[0m', 'The CLI is running');

  // Start the interface
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on('line', function (str) {

    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt afterwards
    _interface.prompt();
  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', function () {
    process.exit(0);
  });

};

// Export the module
module.exports = cli;