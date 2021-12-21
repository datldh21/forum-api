const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'Invalid password').exists(),
       ]   
    }
  }
}