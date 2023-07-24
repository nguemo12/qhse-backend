const crypto = require("crypto-js");
const dotenv = require('dotenv');

module.exports = function (word){
    // Get config vars
    dotenv.config();
    
    return crypto.AES.encrypt(word,process.env.KEY_ENCRYPT_PASSWORD).toString();
}