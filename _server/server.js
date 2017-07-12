const express = require("express"),
      app     = express(),
      path    = require("path")

const data = require('./../_data/data')

exports.start = function() {

    app.use(express.static(__dirname + '/static'))

    app.get('/neural/:symbol',function(req, res){
        res.sendFile(path.join(__dirname + '/static/index.html'));
    })
 
    app.get('/save',function(req,res){
        res.send('saving to data folder ...')
        data.saveAllData('nasdaq', function() {
            console.log('all saved to local file ...')
        })
    })

    app.listen(3000);
    console.log("Running at Port 3000")
}

