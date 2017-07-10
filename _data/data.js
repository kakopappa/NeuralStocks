
const fs = require('fs')
const googleFinance = require('google-finance'),
      config = require('../_server/static/config/symbol_config')

function historical(symbol, callback) {
    googleFinance.historical({
    symbol:symbol,
    from: config.date_from,
    to: config.date_to
}, function (err, quotes) {
        if(err) {
            callback(err)
        } else {
            historicalQuotes = quotes
            callback(historicalQuotes)
        }
    })  
}


exports.saveAllHistorical = function(index) {

    let symbol = config.symbols.nasdaq
    var temp = []

    for(i in symbol) {
        var sym = symbol[i]
        saveTheFile(index + ':'+symbol[i], function() {
            
        })
    }
}

function saveTheFile(symbol,callback) {
    historical(symbol, function(result) {
        console.log('saving symbol ' +symbol)

        fs.writeFile(__dirname + "/../_server/static/data/historical/" + symbol + '.json', result, function(err) {
            if(err) { return console.log(err) }

            console.log("File created!");
        })
        console.log(result)
        console.log('saved ... \n\n')
        callback()
    })
}