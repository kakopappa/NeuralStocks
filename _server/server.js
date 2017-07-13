const express = require("express"),
      app     = express(),
      path    = require("path")

const data = require('./../_data/data'),
      neural = require('./../_neural/neural') 

exports.start = function() {

    app.use(express.static(__dirname + '/static'))

    // NEURAL NETWORK SPECIFIC
    app.get('/neural/:symbol',function(req, res) {
        neural.execute(req.params.symbol, function(direction) {
            console.log(direction)
            res.send('Symbol ' + req.params.symbol + ' has a ' + direction )
         })
    })

    // GET HOME WITH ALL CONTROLS
    app.get('/home',function(req, res){
        res.sendFile(path.join(__dirname + '/static/index.html'))
    })
 
    app.get('/save',function(req,res){
        res.send('saving to data folder ...')
        data.saveAllData('nasdaq', function() {
            console.log('Saved all normalized data ...')
        })
    })

    app.listen(3000);
    console.log("Running at Port 3000")
}

