/*
 * Request Handlers
 *
 */

// Dependencies
const _data = require('./data'),
  helpers = require('./helpers'),
  config = require('./config');

// Define all the handlers
const handlers = {};

/*
 * HTML Handlers
 *
 */

// Index
handlers.index = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'body.class': 'index',
      'head.title': 'Uptime Monitoring - Made Simple',
      'head.description': 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know'
    };
    // Read in a template as a string
    helpers.getTemplate('index', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create Account
handlers.accountCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'body.class': 'accountCreate',
      'head.title': 'Create an Account',
      'head.description': 'Signup is easy and only takes a few seconds.'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create New Session
handlers.sessionCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Login to your account.',
      'head.description': 'Please enter your phone number and password to access your account.',
      'body.class': 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit Your Account
handlers.accountEdit = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Account Settings',
      'body.class': 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Logged Out',
      'head.description': 'You have been logged out of your account.',
      'body.class': 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Account has been deleted
handlers.accountDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Account Deleted',
      'head.description': 'Your account has been deleted.',
      'body.class': 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create a new menu
handlers.menuCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Create a New Menu',
      'body.class': 'menuCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('menuCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Dashboard (view all checks)
handlers.menuList = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Dashboard',
      'body.class': 'checksList'
    };
    // Read in a template as a string
    helpers.getTemplate('menuList', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit Cart Items
handlers.cartDetails = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Cart Details',
      'body.class': 'checksEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('cartEdit', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Favicon
handlers.favicon = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico', function (err, data) {
      if (!err && data) {
        // Callback the data
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets
handlers.public = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Get the filename being requested
    const trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function (err, data) {
        if (!err && data) {

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }

          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }

          // Callback the data
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};

/*
 * JSON API Handlers
 *
 */

// Ping
handlers.ping = function (data, callback) {
  callback(200);
};

// Not-Found
handlers.notFound = function (data, callback) {
  callback(404);
};

// Users
handlers.users = function (data, callback) {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, streetAddress, email
// Optional data: none
handlers._users.post = function (data, callback) {
  // Check that all required fields are filled out
  const phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const streetAddress = typeof (data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
  const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;

  if (firstName && lastName && phone && password && streetAddress && email) {

    // Make sure the user doesnt already exist
    _data.read('users', phone, function (err, data) {

      if (err) {

        // Hash the password
        const hashedPassword = helpers.hash(password);

        // Create the user object
        if (hashedPassword) {
          const userObject = {
            'email': email,
            'phone': phone,
            'lastName': lastName,
            'firstName': firstName,
            'streetAddress': streetAddress,
            'hashedPassword': hashedPassword
          };

          // Store the user
          _data.create('users', phone, userObject, function (err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, {
                'Error': 'Could not create the new user'
              });
            }
          });
        } else {
          callback(500, {
            'Error': 'Could not hash the user\'s password.'
          });
        }

      } else {
        // User alread exists
        callback(400, {
          'Error': 'A user with that phone number already exists'
        });
      }
    });

  } else {
    callback(400, {
      'Error': 'Missing required fields'
    });
  }

};

// Required data: phone
// Optional data: none
handlers._users.get = function (data, callback) {
  // Check that phone number is valid
  const phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

  if (phone) {

    // Get token from headers
    const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the user
        _data.read('users', phone, function (err, data) {
          if (!err && data) {
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403, {
          "Error": "Missing required token in header, or token is invalid."
        });
      }
    });

  } else {
    callback(400, {
      'Error': 'Missing required field'
    });
  }
};

// Required data: phone
// Optional data: firstName, lastName, password, email (at least one must be specified)
handlers._users.put = function (data, callback) {
  // Check for required field
  const phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for optional fields
  const lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const streetAddress = typeof (data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
  const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;

  // Error if phone is invalid
  if (phone) {
    // Error if nothing is sent to update
    if (firstName || lastName || password || streetAddress || email) {

      // Get token from headers
      const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

      // Verify that the given token is valid for the phone number
      handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
        if (tokenIsValid) {
          // Lookup the user
          _data.read('users', phone, function (err, userData) {

            if (!err && userData) {

              // Update the fields if necessary
              if (firstName) {
                userData.firstName = firstName;
              }

              if (lastName) {
                userData.lastName = lastName;
              }

              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }

              if (streetAddress) {
                userData.streetAddress = streetAddress;
              }

              if (email) {
                userData.email = email;
              }
              // Store the new updates
              _data.update('users', phone, userData, function (err) {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, {
                    'Error': 'Could not update the user.'
                  });
                }
              });
            } else {
              callback(400, {
                'Error': 'Specified user does not exist.'
              });
            }
          });
        } else {
          callback(403, {
            "Error": "Missing required token in header, or token is invalid."
          });
        }
      });
    } else {
      callback(400, {
        'Error': 'Missing fields to update.'
      });
    }
  } else {
    callback(400, {
      'Error': 'Missing required field.'
    });
  }
};

// Required data: phone
handlers._users.delete = function (data, callback) {
  // Check that phone number is valid
  const phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // Get token from headers
    const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the user
        _data.read('users', phone, function (err, data) {
          if (!err && data) {
            _data.delete('users', phone, function (err) {
              if (!err) {
                callback(200);
              } else {
                callback(500, {
                  'Error': 'Could not delete the specified user'
                });
              }
            });
          } else {
            callback(400, {
              'Error': 'Could not find the specified user.'
            });
          }
        });
      } else {
        callback(403, {
          "Error": "Missing required token in header, or token is invalid."
        });
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing required field'
    });
  }
};

// Tokens
handlers.tokens = function (data, callback) {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function (data, callback) {
  const phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (phone && password) {
    // Lookup the user who matches that phone number
    _data.read('users', phone, function (err, userData) {
      if (!err && userData) {
        // Hash the sent password, and compare it to the password stored in the user object
        const hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObject = {
            'phone': phone,
            'id': tokenId,
            'expires': expires
          };

          // Store the token
          _data.create('tokens', tokenId, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, {
                'Error': 'Could not create the new token'
              });
            }
          });
        } else {
          callback(400, {
            'Error': 'Password did not match the specified user\'s stored password'
          });
        }
      } else {
        callback(400, {
          'Error': 'Could not find the specified user.'
        });
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing required field(s).'
    });
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function (data, callback) {
  // Check that id is valid
  const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the token
    _data.read('tokens', id, function (err, tokenData) {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing required field, or field invalid'
    })
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function (data, callback) {
  const id = typeof (data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  const extend = typeof (data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if (id && extend) {
    // Lookup the existing token
    _data.read('tokens', id, function (err, tokenData) {
      if (!err && tokenData) {
        // Check to make sure the token isn't already expired
        if (tokenData.expires > Date.now()) {
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update('tokens', id, tokenData, function (err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, {
                'Error': 'Could not update the token\'s expiration.'
              });
            }
          });
        } else {
          callback(400, {
            "Error": "The token has already expired, and cannot be extended."
          });
        }
      } else {
        callback(400, {
          'Error': 'Specified user does not exist.'
        });
      }
    });
  } else {
    callback(400, {
      "Error": "Missing required field(s) or field(s) are invalid."
    });
  }
};

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function (data, callback) {
  // Check that id is valid
  const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the token
    _data.read('tokens', id, function (err, tokenData) {
      if (!err && tokenData) {
        // Delete the token
        _data.delete('tokens', id, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, {
              'Error': 'Could not delete the specified token'
            });
          }
        });
      } else {
        callback(400, {
          'Error': 'Could not find the specified token.'
        });
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing required field'
    })
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function (id, phone, callback) {
  // Lookup the token
  _data.read('tokens', id, function (err, tokenData) {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Menus
handlers.menus = function (data, callback) {
  var acceptableMethods = ['get', 'post'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._menus[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the menu methods
handlers._menus = {};

// Menus - post
// Required data: Pizza name, Pizza price, category [Breakfast, Lunch, Dinner], phone, token
// Optional data: none
handlers._menus.post = function (data, callback) {

  var phone = false;
  var isValid = false;
  var category = false;
  var menu = data.payload;

  // Validate the data.
    var _name = typeof (menu.name) == 'string' && menu.name.trim().length > 0 ? menu.name.trim() : false;
    var _price = typeof (menu.price) == 'string' && menu.price.trim().length > 0 ? menu.price.trim() : false;
    var _phone = typeof (menu.phone) == 'string' && menu.phone.trim().length == 10 ? menu.phone.trim() : false;
    var _category = typeof(menu.category) == 'string' && ['breakfast', 'lunch', 'dinner'].indexOf(menu.category.toLowerCase()) > -1 ? menu.category.toLowerCase() : false;
    if (_name && _price && _category && _phone) { 
      isValid = true; phone = _phone; category = _category; 
      delete menu.phone; delete menu.category;
    } else {
      isValid = false;
    }

  if (isValid) {
  
    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

      if (tokenIsValid) {

        // Make sure the user exists.
        _data.read('users', phone, function (err, userData) {

          if (!err && userData) {
            // Write the data as requested.
            _data.create('menu', category, data.payload, function (err) {
              if (!err) {
                callback(200);
              } else {
                callback(500, { 'Error': category + ' already exists.' });
              }
            });
          } else {
            callback(400, { 'Error': 'Specified user does not exist.' });
          }
        });
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    });
  } else {
    callback(400, { 
      'Error': 'Missing fields to update.'
   });
  }
};

// Menus - get
// Required data: category [Breakfast, Lunch, Dinner], phone, token
// Optional data: none
handlers._menus.get = function (data, callback) {

  // Perform Validations
  var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  var category = typeof(data.queryStringObject.category) == 'string' && ['breakfast', 'lunch', 'dinner',].indexOf(data.queryStringObject.category.toLowerCase()) > -1 ? data.queryStringObject.category.toLowerCase() : false;

  if (phone && category) {
  
    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

      if (tokenIsValid) {
         // Lookup the menu
         _data.read('menu', category, function (err, data) {
          if (!err && data) {
            callback(200, data);
          } else {
            callback(404);
          }
        });

      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    });
  } else {
    callback(400, { 
      'Error': 'Missing fields to update.'
   });
  }
};


// Cart
handlers.cart = function (data, callback) {
  var acceptableMethods = ['get', 'post', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._cart[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the cart methods
handlers._cart = {};

// Cart - post
// Required data: name, price, quantity, token, phone
// Optional data: none
handlers._cart.post = function (data, callback) {
  var total = 0;
  var phone = false;
  var isValid = false;

  // Validate the data.
  data.payload.forEach(function(menu) {
    var _quantity = typeof(menu.quantity) == 'number' && menu.quantity >= 1 ? menu.quantity : false;
    var _name = typeof (menu.name) == 'string' && menu.name.trim().length > 0 ? menu.name.trim() : false;
    var _price = typeof (menu.price) == 'string' && menu.price.trim().length > 0 ? menu.price.trim() : false;
    var _phone = typeof (menu.phone) == 'string' && menu.phone.trim().length == 10 ? menu.phone.trim() : false;
    delete menu.phone;

    if (_name && _price && _quantity && _phone) { 
      isValid = true; phone = _phone;
      total += parseInt(_price.replace('₦', '')) * _quantity;
     } else {
       isValid = false;
     }
  });

  if (isValid) {
  
    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

      if (tokenIsValid) {

        // Make sure the user exists.
        _data.read('users', phone, function (err, userData) {
          if (!err && userData) {
            // Write the data as requested.
            _data.create('cart', phone, data.payload, function (err) {
              if (!err) {
                    callback(200, { 'message': 'Order successfully added to the cart.' , 'email': userData.email, 'total': '₦' + total.toString(), "orderId": phone });
              } else {
                callback(500, { 'Error': 'Order already exists.' });
              }
            });
          } else {
            callback(400, { 'Error': 'Specified user does not exist.' });
          }
        });
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    });
  } else {
    callback(400, { 
      'Error': 'Missing fields to update.'
   });
  }
};

// Cart - get
// Required data: phone, token
// Optional data: none
handlers._cart.get = function (data, callback) {
  // Perform Validations
  var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

  if (phone) {
  
    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

      if (tokenIsValid) {
         // Lookup the Cart
         _data.read('cart', phone, function (err, data) {
          if (!err && data) {
            callback(200, data);
          } else {
            callback(404);
          }
        });

      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid." });
      }
    });
  } else {
    callback(400, { 
      'Error': 'Missing fields to update.'
   });
  }
};

// Cart - put
// Required data: phone, token, orderid
// Optional data: name, price, quantity (at least one must be specified)
handlers._cart.put = function (data, callback) {
  var total = 0;
  var orderId = '';
  var phone = false;
  var isValid = false;

  // Validate the data.
  data.payload.forEach(function(menu) {
    var _quantity = typeof(menu.quantity) == 'number' && menu.quantity >= 1 ? menu.quantity : false;
    var _name = typeof (menu.name) == 'string' && menu.name.trim().length > 0 ? menu.name.trim() : false;
    var _price = typeof (menu.price) == 'string' && menu.price.trim().length > 0 ? menu.price.trim() : false;
    var _phone = typeof (menu.phone) == 'string' && menu.phone.trim().length == 10 ? menu.phone.trim() : false;
    var _orderID = typeof (menu.orderid) == 'string' && menu.orderid.trim().length == 10 ? menu.orderid.trim() : false;

    delete menu.phone; delete menu.orderid;

    if (_name && _price && _quantity && _phone) { 
      isValid = true; phone = _phone; orderId = _orderID;
      total += parseInt(_price.replace('₦', '')) * _quantity;
     } else {
      isValid = false;
     }
  });

  // Proceed if payload is valid.
  if (isValid) {

    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

      if (tokenIsValid) {

        // Make sure the user exists.
        _data.read('users', phone, function (err, userData) {
          if (!err && userData) {
            // Store the new updates
            _data.update('cart', phone, data.payload, function (err) {
              if (!err) {
                callback(200, { 'message': 'Order successfully added to the cart.' , 'email': userData.email, 'total': '₦' + total.toString(), "orderId": phone });
              } else {
                callback(500, {
                  'Error': 'Could not update the cart.'
                });
              }
            });
          } else {
            callback(400, { 'Error': 'Specified user does not exist.' });
          }
        });
      } else {
        callback(403, {
          "Error": "Missing required token in header, or token is invalid."
        });
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing fields to update.'
    });
  }
};

// Cart - delete
// Required data: phone, token
// Optional data: none
handlers._cart.delete = function (data, callback) {
  
  // Check that phone number is valid
  var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

  if (phone) {
    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the cart
        _data.delete('cart', phone, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, {
              'Error': 'Could not delete the specified cart'
            });
          }
        });
      } else {
        callback(403, {
          "Error": "Missing required token in header, or token is invalid."
        });
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing required field'
    });
  }
};

// Checkout - Only accepts a POST
// Required data: email, orderid, card number, expiry Year, Expiry Month and CVV
handlers.checkout = function (data, callback) {

  if (data.method === 'post') {
    var total = 0;
    var orderId = helpers.createRandomString(10);
    var cvv = typeof data.payload.cvv === 'string' && data.payload.cvv.trim().length === 3 ? data.payload.cvv.trim() : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var expiryYear = typeof data.payload.expiryYear === 'string' && data.payload.expiryYear.trim().length === 4 ? data.payload.expiryYear.trim() : false;
    var expiryMonth = typeof data.payload.expiryMonth === 'string' && data.payload.expiryMonth.trim().length === 2 ? data.payload.expiryMonth.trim() : false;
    var cardNumber = typeof data.payload.cardNumber === 'string' && data.payload.cardNumber.trim().length > 10 && data.payload.cardNumber.trim().length < 17 ? data.payload.cardNumber.trim() : false;
    var email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;

    if (email && cardNumber && expiryYear && expiryMonth && cvv && phone) {
      // Check to ensure card is still valid.
      var month = new Date().getMonth();
      var year = new Date().getFullYear();

      if (year < Number(expiryYear) || (year === Number(expiryYear) && month < Number(expiryMonth))) {

        // Confirm that token provided is valid and belongs to the user
        var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

        handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

          if (tokenIsValid) {

            // check the shopping cart to ensure amount entered by customer matches amount on cart
            _data.read('cart', phone, function (err, data) {

              if (!err && data) {
                // Loop through to calculate the total due for Payment.
                data.forEach(function(cartItems) {
                  var _quantity = typeof(cartItems.quantity) == 'number' && cartItems.quantity >= 1 ? cartItems.quantity : false;
                  var _price = typeof (cartItems.price) == 'string' && cartItems.price.trim().length > 0 ? cartItems.price.trim() : false;
                  total += parseInt(_price.replace('₦', '')) * _quantity;
                });

                // check to ensure we have a valid amount to pay
                if (total) {

                  // Call function to charge card with stripe api
                  helpers.makeStripeCharge(email, total, err => {

                    if (!err) {
                      console.log('Your credit card with number ' + cardNumber + ' has been charged ₦' + total + ' for your pizza order. Thank you for your patronage!');

                      // Call function to send receipt to customer's email address
                      helpers.sendEmail(email, total, orderId, err => {
                        if (!err) {
                          callback(200, {"Message": "Email with order receipt successfully sent to " + email + " !"});
                        } else {
                          callback(500, { 'Error': 'Could not send email with receipt to customer' });
                        }
                      });
                    } else {
                      callback(500, { 'Error': 'Could not process charge' });
                    }
                  });
                } else {
                  callback(400, { 'Error': 'Amount on shopping cart does not match amount entered by customer' });
                }
              } else {
                callback(400, { 'Error': 'Could not read the user\'s shopping cart' });
              }
            });

          } else {
            callback(403, { 'Error': 'Please provide valid token' });
          }
        });
      } else {
        callback(400, { 'Error': 'Credit card has expired. Please provide valid card for payment' });
      }
    } else {
      callback(400, { 'Error': 'Required fields not provided' });
    }
  } else {
    callback(405, { 'Error': 'Selected method is not allowed' });
  }
};



// // Checks
// handlers.checks = function (data, callback) {
//   const acceptableMethods = ['post', 'get', 'put', 'delete'];
//   if (acceptableMethods.indexOf(data.method) > -1) {
//     handlers._checks[data.method](data, callback);
//   } else {
//     callback(405);
//   }
// };

// // Container for all the checks methods
// handlers._checks = {};


// // Checks - post
// // Required data: protocol,url,method,successCodes,timeoutSeconds
// // Optional data: none
// handlers._checks.post = function (data, callback) {
//   // Validate inputs
//   const protocol = typeof (data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
//   const url = typeof (data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
//   const method = typeof (data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
//   const successCodes = typeof (data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
//   const timeoutSeconds = typeof (data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
//   if (protocol && url && method && successCodes && timeoutSeconds) {

//     // Get token from headers
//     const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

//     // Lookup the user phone by reading the token
//     _data.read('tokens', token, function (err, tokenData) {
//       if (!err && tokenData) {
//         const userPhone = tokenData.phone;

//         // Lookup the user data
//         _data.read('users', userPhone, function (err, userData) {
//           if (!err && userData) {
//             const userChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
//             // Verify that user has less than the number of max-checks per user
//             if (userChecks.length < config.maxChecks) {
//               // Create random id for check
//               const checkId = helpers.createRandomString(20);

//               // Create check object including userPhone
//               const checkObject = {
//                 'id': checkId,
//                 'userPhone': userPhone,
//                 'protocol': protocol,
//                 'url': url,
//                 'method': method,
//                 'successCodes': successCodes,
//                 'timeoutSeconds': timeoutSeconds
//               };

//               // Save the object
//               _data.create('checks', checkId, checkObject, function (err) {
//                 if (!err) {
//                   // Add check id to the user's object
//                   userData.checks = userChecks;
//                   userData.checks.push(checkId);

//                   // Save the new user data
//                   _data.update('users', userPhone, userData, function (err) {
//                     if (!err) {
//                       // Return the data about the new check
//                       callback(200, checkObject);
//                     } else {
//                       callback(500, {
//                         'Error': 'Could not update the user with the new check.'
//                       });
//                     }
//                   });
//                 } else {
//                   callback(500, {
//                     'Error': 'Could not create the new check'
//                   });
//                 }
//               });



//             } else {
//               callback(400, {
//                 'Error': 'The user already has the maximum number of checks (' + config.maxChecks + ').'
//               })
//             }


//           } else {
//             callback(403);
//           }
//         });


//       } else {
//         callback(403);
//       }
//     });
//   } else {
//     callback(400, {
//       'Error': 'Missing required inputs, or inputs are invalid'
//     });
//   }
// };

// // Checks - get
// // Required data: id
// // Optional data: none
// handlers._checks.get = function (data, callback) {
//   // Check that id is valid
//   const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
//   if (id) {
//     // Lookup the check
//     _data.read('checks', id, function (err, checkData) {
//       if (!err && checkData) {
//         // Get the token that sent the request
//         const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
//         // Verify that the given token is valid and belongs to the user who created the check
//         handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
//           if (tokenIsValid) {
//             // Return check data
//             callback(200, checkData);
//           } else {
//             callback(403);
//           }
//         });
//       } else {
//         callback(404);
//       }
//     });
//   } else {
//     callback(400, {
//       'Error': 'Missing required field, or field invalid'
//     })
//   }
// };

// // Checks - put
// // Required data: id
// // Optional data: protocol,url,method,successCodes,timeoutSeconds (one must be sent)
// handlers._checks.put = function (data, callback) {
//   // Check for required field
//   const id = typeof (data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

//   // Check for optional fields
//   const protocol = typeof (data.payload.protocol) == 'string' && ['https', 'http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
//   const url = typeof (data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
//   const method = typeof (data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
//   const successCodes = typeof (data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
//   const timeoutSeconds = typeof (data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

//   // Error if id is invalid
//   if (id) {
//     // Error if nothing is sent to update
//     if (protocol || url || method || successCodes || timeoutSeconds) {
//       // Lookup the check
//       _data.read('checks', id, function (err, checkData) {
//         if (!err && checkData) {
//           // Get the token that sent the request
//           const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
//           // Verify that the given token is valid and belongs to the user who created the check
//           handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
//             if (tokenIsValid) {
//               // Update check data where necessary
//               if (protocol) {
//                 checkData.protocol = protocol;
//               }
//               if (url) {
//                 checkData.url = url;
//               }
//               if (method) {
//                 checkData.method = method;
//               }
//               if (successCodes) {
//                 checkData.successCodes = successCodes;
//               }
//               if (timeoutSeconds) {
//                 checkData.timeoutSeconds = timeoutSeconds;
//               }

//               // Store the new updates
//               _data.update('checks', id, checkData, function (err) {
//                 if (!err) {
//                   callback(200);
//                 } else {
//                   callback(500, {
//                     'Error': 'Could not update the check.'
//                   });
//                 }
//               });
//             } else {
//               callback(403);
//             }
//           });
//         } else {
//           callback(400, {
//             'Error': 'Check ID did not exist.'
//           });
//         }
//       });
//     } else {
//       callback(400, {
//         'Error': 'Missing fields to update.'
//       });
//     }
//   } else {
//     callback(400, {
//       'Error': 'Missing required field.'
//     });
//   }
// };


// // Checks - delete
// // Required data: id
// // Optional data: none
// handlers._checks.delete = function (data, callback) {
//   // Check that id is valid
//   const id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
//   if (id) {
//     // Lookup the check
//     _data.read('checks', id, function (err, checkData) {
//       if (!err && checkData) {
//         // Get the token that sent the request
//         const token = typeof (data.headers.token) == 'string' ? data.headers.token : false;
//         // Verify that the given token is valid and belongs to the user who created the check
//         handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
//           if (tokenIsValid) {

//             // Delete the check data
//             _data.delete('checks', id, function (err) {
//               if (!err) {
//                 // Lookup the user's object to get all their checks
//                 _data.read('users', checkData.userPhone, function (err, userData) {
//                   if (!err) {
//                     const userChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

//                     // Remove the deleted check from their list of checks
//                     const checkPosition = userChecks.indexOf(id);
//                     if (checkPosition > -1) {
//                       userChecks.splice(checkPosition, 1);
//                       // Re-save the user's data
//                       userData.checks = userChecks;
//                       _data.update('users', checkData.userPhone, userData, function (err) {
//                         if (!err) {
//                           callback(200);
//                         } else {
//                           callback(500, {
//                             'Error': 'Could not update the user.'
//                           });
//                         }
//                       });
//                     } else {
//                       callback(500, {
//                         "Error": "Could not find the check on the user's object, so could not remove it."
//                       });
//                     }
//                   } else {
//                     callback(500, {
//                       "Error": "Could not find the user who created the check, so could not remove the check from the list of checks on their user object."
//                     });
//                   }
//                 });
//               } else {
//                 callback(500, {
//                   "Error": "Could not delete the check data."
//                 })
//               }
//             });
//           } else {
//             callback(403);
//           }
//         });
//       } else {
//         callback(400, {
//           "Error": "The check ID specified could not be found"
//         });
//       }
//     });
//   } else {
//     callback(400, {
//       "Error": "Missing valid id"
//     });
//   }
// };


// Export the handlers
module.exports = handlers;