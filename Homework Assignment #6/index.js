/*
 * Primary file for the Hello World API
 *
 */

// Dependencies
const os = require('os'),
  fs = require('fs'),
  url = require('url'),
  http = require('http'),
  https = require('https'),
  config = require('./config'),
  cluster = require('cluster'),
  StringDecoder = require('string_decoder').StringDecoder;

// Define all the handlers
const server = {};
const handlers = {};

// Hello handler
handlers.hello = (data, callback) => {
  callback(200, {
    'message': 'Welcome to Homework Assignment #6 Route 1'
  });
};

// Not-Found handler
handlers.notFound = (data, callback) => {
  callback(404);
};

// Define the request router
const router = {
  'hello': handlers.hello
};

// Init script
server.init = function () {
  // Instantiate the HTTP server
  const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
  });

  // Start the HTTP server
  httpServer.listen(config.httpPort, () => {
    console.log('The HTTP server is running on port ' + config.httpPort);
  });

  // Instantiate the HTTPS server
  const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
  };

  const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
    unifiedServer(req, res);
  });

  // Start the HTTPS server
  httpsServer.listen(config.httpsPort, () => {
    console.log('The HTTPS server is running on port ' + config.httpsPort);
  });

  // All the server logic for both the http and https server
  const unifiedServer = (req, res) => {

    // Parse the url
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    //Get the headers as an object
    const headers = req.headers;

    // Get the payload,if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', function (data) {
      buffer += decoder.write(data);
    });
    req.on('end', function () {
      buffer += decoder.end();

      // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
      const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

      // Construct the data object to send to the handler
      const data = {
        'trimmedPath': trimmedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'headers': headers,
        'payload': buffer
      };

      // Route the request to the handler specified in the router
      chosenHandler(data, (statusCode, payload) => {

        // Check if the typeof status code returned from the handler is a number, or set the default status code to 200
        statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

        // Use the payload returned from the handler, or set the default payload to an empty object
        payload = typeof (payload) == 'object' ? payload : {};

        // Convert the payload to a string
        var payloadString = JSON.stringify(payload);

        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
      });

    });
  };
};

if (cluster.isMaster) {

  // Get the amount of cores to use.
  var nosOfCoresToUse = typeof (config.maxCores) == 'number' && config.maxCores > 0 ? config.maxCores : os.cpus().length;

  // Confirm we have up to the CPU's requested.
  if (nosOfCoresToUse > os.cpus().length) {
    nosOfCoresToUse = os.cpus().length;
  }

  for (var i = 0; i < nosOfCoresToUse; i++) {
    cluster.fork();
  }
} else {
  server.init();
}