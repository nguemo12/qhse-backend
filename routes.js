const emissions = require('./controllers/emissions.js');
const actual_state_of_natural_capital = require('./controllers/actual_state_of_natural_capital.js');
const energy_security = require('./controllers/energy_security.js');
const governance_effectiveness_enforcement= require('./controllers/governance_effectiveness_enforcement.js');
const natural_resources_depletion = require('./controllers/natural_resources_depletion.js');
const social_gender = require('./controllers/social_gender.js');
const economic_environement_prices_inflation = require('./controllers/economic_environement_prices_inflation.js');
const graphData = require('./controllers/graph_data.js')
const chatgpt  = require("./controllers/chatgpt.js")

module.exports = function(app){
    //Unprotected routes
    app.get('/api/emissions', function(req, res){
        emissions(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });

      app.get('/api/emissions/graph_data', function(req, res){
        graphData.getAllEmissionData(req).then((e)=>{
            setTimeout(()=>{
                res.status(e.code).send(e);
            },3000)
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });

    app.get('/api/actual_state_of_natural_capital', function(req, res){
        actual_state_of_natural_capital(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });

    app.get('/api/energy_security', function(req, res){
        energy_security(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });
    app.get('/api/governance_effectiveness_enforcement', function(req, res){
        governance_effectiveness_enforcement(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });
    app.get('/api/natural_resources_depletion', function(req, res){
        natural_resources_depletion(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });
    app.get('/api/social_gender', function(req, res){
        social_gender(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });
      app.get('/api/economic_environement_prices_inflation', function(req, res){
        economic_environement_prices_inflation(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });

      app.post('/api/chatgpt', async (req,res)=>{
        chatgpt(req).then((e)=>{
            res.status(e.code).send(e);
        }).catch((error)=>{
            res.status(error.code).send(error);
        })
      });
    //Protected routes

    //404
    app.get('*', function(req, res){
        res.status(404).json({
            message : "Route non disponible!"
        });
      });
}

