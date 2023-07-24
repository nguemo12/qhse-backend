const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Get config vars
dotenv.config();

module.exports = function (word){
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: word
      }, process.env.TOKEN_SECRET);
}