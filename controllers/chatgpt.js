const axios = require('axios');
const config = require("../helpers/config")
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");


module.exports = function (req){
    return new Promise(async(resolve,rejected)=>{
       
        const configuration = new Configuration({
            apiKey: "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",
        });

          const openai = new OpenAIApi(configuration);
          if(!req.body){
            resolve({code:400,message:'Chat make request without message'});
          }

          try{
            const messages = [
                { role: "system", content: "You are a helpful assistant" },
                { role: "user", content: req.body.message }
              ];
              const response = await openai.createChatCompletion({
                messages,
                model: "gpt-3.5-turbo",
              });

          resolve({code:200,message:response.data.choices[0].message.content});
        }catch(error){
            resolve({code:400,message:error});
        }        
        
    });
}
