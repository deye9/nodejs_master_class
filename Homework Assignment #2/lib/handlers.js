/*
 * Request Handlers
 *
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');

// Define all the handlers
var handlers = {};

// Not-Found
handlers.notFound = function (data, callback) {
  callback(404);
};

// Users
handlers.users = function (data, callback) {
  var acceptableMethods = ['get', 'post', 'put', 'delete'];
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
  var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var streetAddress = typeof (data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
  var email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;

  if (firstName && lastName && phone && password && streetAddress && email) {

    // Make sure the user doesnt already exist
    _data.read('users', phone, function (err, data) {

      if (err) {

        // Hash the password
        var hashedPassword = helpers.hash(password);

        // Create the user object
        if (hashedPassword) {
          var userObject = {
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
  var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;

  if (phone) {

    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

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
  var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for optional fields
  var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var streetAddress = typeof (data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
  var email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;

  // Error if phone is invalid
  if (phone) {
    // Error if nothing is sent to update
    if (firstName || lastName || password || streetAddress || email) {

      // Get token from headers
      var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

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
  var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

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
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
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
  var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (phone && password) {

    // Lookup the user who matches that phone number
    _data.read('users', phone, function (err, userData) {
      
      if (!err && userData) {

        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        
        if (hashedPassword == userData.hashedPassword) {
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
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
  var id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
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
  var extend = typeof (data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  var id = typeof (data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

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
  var id = typeof (data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;

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

  // Validate the data.
  data.payload.forEach(function(menu) {
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
  var category = typeof(data.queryStringObject.category) == 'string' && ['breakfast', 'lunch', 'dinner'].indexOf(data.queryStringObject.category.toLowerCase()) > -1 ? data.queryStringObject.category.toLowerCase() : false;

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
  
    var orderId = helpers.createRandomString(10);
    // Get token from headers
    var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

      if (tokenIsValid) {

        // Make sure the user exists.
        _data.read('users', phone, function (err, userData) {
          if (!err && userData) {
            // Write the data as requested.
            _data.create('cart', orderId, data.payload, function (err) {
              if (!err) {
                helpers.sendEmail(userData.email, total, orderId, function(error) {
                  if (error) {
                    callback(500, { 'Error': 'Error sending order to email Address ' + userData.email });
                  } else {
                    callback(200, { 'message': 'Order successfully added to the cart.' , 'email': userData.email, 'total': '₦' + total.toString(), "orderId": orderId });
                  }
                });
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
            _data.update('cart', orderId, data.payload, function (err) {
              if (!err) {
                helpers.sendEmail(userData.email, total, orderId, function(error) {
                  if (error) {
                    callback(500, { 'Error': 'Error sending order to email Address ' + userData.email });
                  } else {
                    callback(200, { 'message': 'Order successfully added to the cart.' , 'email': userData.email, 'total': '₦' + total.toString(), "orderId": orderId });
                  }
                });
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
    var cvv = typeof data.payload.cvv === 'string' && data.payload.cvv.trim().length === 3 ? data.payload.cvv.trim() : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var orderId = typeof data.payload.orderId === 'string' && data.payload.orderId.trim().length === 10 ? data.payload.orderId.trim() : false;
    var expiryYear = typeof data.payload.expiryYear === 'string' && data.payload.expiryYear.trim().length === 4 ? data.payload.expiryYear.trim() : false;
    var expiryMonth = typeof data.payload.expiryMonth === 'string' && data.payload.expiryMonth.trim().length === 2 ? data.payload.expiryMonth.trim() : false;
    var cardNumber = typeof data.payload.cardNumber === 'string' && data.payload.cardNumber.trim().length > 10 && data.payload.cardNumber.trim().length < 17 ? data.payload.cardNumber.trim() : false;
    var email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;

    if (email && orderId && cardNumber && expiryYear && expiryMonth && cvv && phone) {

      // Check to ensure card is still valid.
      var month = new Date().getMonth();
      var year = new Date().getFullYear();

      if (year < Number(expiryYear) || (year === Number(expiryYear) && month < Number(expiryMonth))) {

        // Confirm that token provided is valid and belongs to the user
        var token = typeof (data.headers.token) == 'string' ? data.headers.token : false;

        handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {

          if (tokenIsValid) {

            // check the shopping cart to ensure amount entered by customer matches amount on cart
            _data.read('cart', orderId, function (err, data) {

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

// Export the handlers
module.exports = handlers;