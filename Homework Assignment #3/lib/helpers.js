/*
 * Helpers for various tasks
 *
 */

// Dependencies
const config = require('./config'),
 crypto = require('crypto'),
 https = require('https'),
 querystring = require('querystring'),
 path = require('path'),
 fs = require('fs');

// Container for all the helpers
const helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function (str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// Create a SHA256 hash
helpers.hash = function (str) {
  if (typeof (str) == 'string' && str.length > 0) {
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function (strLength) {
  strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    // Define all the possible characters that could go into a string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    let str = '';
    for (i = 1; i <= strLength; i++) {
      // Get a random charactert from the possibleCharacters string
      const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the string
      str += randomCharacter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};

helpers.sendEmail = function (email, charge, orderId, callback) {
  const message = 'Your pizza order {' + orderId + '} totalling ₦' + charge + ' has been successfully charged to your credit card. Thank you.';

  // stringify parameters for making the api call
  const emailData = querystring.stringify({
    'to': email,
    'text': message,
    'from': 'postmaster@pizzaapp.com',
    'subject': 'Pizza order Receipt ' + orderId,
  });

  // Build out the api Request Object
  const request = {
    'method': 'POST',
    'protocol': 'https:',
    'hostname': 'api.mailgun.net',
    'auth': process.env.MAILGUN_API_KEY,
    'path': '/v3/'+ process.env.mailGun_domainName+'/messages',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(emailData)
    }
  };

  const req = https.request(request, function (res) {
    var status = res.statusCode;
    if (status === 200 || status === 201) {
      callback(false);
    } else {
      callback(true);
    }
  });

  req.on('error', (err) => {
    callback(err);
  });

  req.write(emailData);

  req.end();
};

helpers.makeStripeCharge = function (email, charge, callback) {
  if (email && charge) {

    // Define charge parameters
    const chargeData = {
      "amount": charge,
      "currency": "usd",
      "source": process.env.stripe_source,
      "description": "charge for" + email,
    };

    //stringify the data for making the request
    const stringData = querystring.stringify(chargeData);

    //craft the api request
    const request = {
      "protocol": "https:",
      "hostname": "api.stripe.com",
      "method": "POST",
      "path": "/v1/charges",
      "auth": process.env.STRIPE_API_KEY,
      "headers": {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringData)
      }
    };

    //make the request using the https protocol
    req = https.request(request, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        const responseObject = helpers.parseJsonToObject(data);
        if (responseObject.id) {
          callback(false, responseObject.id);
        } else {
          callback('Request not successful; could not get id from request ID from stripe');
        }
      });
    });

    //bind the error event to prevent throwing
    req.on('error', (e) => {
      callback(e);
    });

    req.write(stringData);

    req.end();

  } else {
    callback("No email and charge provided");
  }
};

// Get the string content of a template, and use provided data for string interpolation
helpers.getTemplate = function (templateName, data, callback) {
  templateName = typeof (templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof (data) == 'object' && data !== null ? data : {};
  if (templateName) {
    const templatesDir = path.join(__dirname, '/../templates/');
    fs.readFile(templatesDir + templateName + '.html', 'utf8', function (err, str) {
      if (!err && str && str.length > 0) {
        // Do interpolation on the string
        const finalString = helpers.interpolate(str, data);
        callback(false, finalString);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer to a string, and pass provided data object to header and footer for interpolation
helpers.addUniversalTemplates = function (str, data, callback) {
  str = typeof (str) == 'string' && str.length > 0 ? str : '';
  data = typeof (data) == 'object' && data !== null ? data : {};
  // Get the header
  helpers.getTemplate('_header', data, function (err, headerString) {
    if (!err && headerString) {
      // Get the footer
      helpers.getTemplate('_footer', data, function (err, footerString) {
        if (!err && headerString) {
          // Add them all together
          const fullString = headerString + str + footerString;
          callback(false, fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};

// Take a given string and data object, and find/replace all the keys within it
helpers.interpolate = function (str, data) {
  str = typeof (str) == 'string' && str.length > 0 ? str : '';
  data = typeof (data) == 'object' && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global."
  for (var keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data['global.' + keyName] = config.templateGlobals[keyName];
    }
  }
  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for (var key in data) {
    if (data.hasOwnProperty(key) && typeof (data[key] == 'string')) {
      var replace = data[key];
      var find = '{' + key + '}';
      str = str.replace(find, replace);
    }
  }
  return str;
};

// Get the contents of a static (public) asset
helpers.getStaticAsset = function (fileName, callback) {
  fileName = typeof (fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if (fileName) {
    const publicDir = path.join(__dirname, '/../public/');
    fs.readFile(publicDir + fileName, function (err, data) {
      if (!err && data) {
        callback(false, data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid file name was not specified');
  }
};

// Export the module
module.exports = helpers;