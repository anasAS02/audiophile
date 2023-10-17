const mongoose = require('mongoose');
const userRoles = require('../utils/userRoles');

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,        
        required: true,
        unique: true,
        validate: {
          validator: function(value) {
            return /\b[\w\.-]+@gmail\.com\b/.test(value);
          },
          message: 'Email must be a Gmail address.'
        }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.USER],
      default: userRoles.USER
    }
})

module.exports = mongoose.model('User', userSchema);