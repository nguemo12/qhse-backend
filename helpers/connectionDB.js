const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Get config vars
dotenv.config();
// Access config var
//process.env.TOKEN_SECRET;

module.exports = function(){
    return new Promise((resolve,rejected)=>{
        try {         
            mongoose.set("strictQuery", false);
            resolve(mongoose.connect(process.env.DATABASE_LINK, { useNewUrlParser: true }));
        } catch (error) {
            rejected(error.message)
;        }
    })
}