/*
 * Helpers for various tasks
 *
 */

// Dependencies
var crypto = require('crypto');
var config = require('./config');

// Container for all the helpers
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// Create a SHA256 hash
helpers.hash = function (str) {
  if (typeof (str) == 'string' && str.length > 0) {
    var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
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
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for (i = 1; i <= strLength; i++) {
      // Get a random charactert from the possibleCharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
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
  var message = 'Your pizza order {' + orderId + '} totalling ₦' + charge + ' has been successfully charged to your credit card. Thank you.';

  // stringify parameters for making the api call
  var emailData = querystring.stringify({
    'to': email,
    'text': message,
    'from': 'postmaster@pizzaapp.com',
    'subject': 'Pizza order Receipt ' + orderId,
  });

  // Build out the api Request Object
  var request = {
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

  var req = https.request(request, function (res) {
    var status = res.statusCode;
    if (status === 200 || status === 201) {
      callback(false);
    } else {
      callback('Status code returned ' + status);
    }
  });

  req.on('error', (err) => {
    callback(err);
  });

  req.write(emailData);

  req.end();
};

// Export the module
module.exports = helpers;