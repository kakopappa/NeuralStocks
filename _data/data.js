
const fs = require('fs')
const googleFinance = require('google-finance'),
      config = require('../_server/static/config/symbol_config'),
      normal = require('../_neural/normalize')
const staticDataDir = '/../_server/static/data'

/** HISTORICAL DATA */
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

/** SAVE ALL HISTORICAL/PROCESSED DATA TO FOLDER */
exports.saveAllData = function(index,callback) {
    let symbols = config.symbols[index]
    for(i in symbols) {
        saveQuotesToFile(index + ':'+ symbols[i], function(result, symbol) {
            saveProcessedToFile(symbol, result, function() {
                 callback()
            })
        })
    }
}

/** SAVE SYMBOL */
function saveQuotesToFile(symbol, callback) {
    historical(symbol, function(result) {
        var jsonString = JSON.stringify(result)
            fs.writeFile(__dirname + staticDataDir + "/historical/" + symbol + '.json', jsonString, function(err) {
                if(err) { return console.log(err) }
            })
        console.log('saved '+ symbol)
        callback(result, symbol)
    })
}


/** SAVE PROCESSED QOUTE */
function saveProcessedToFile(symbol, data, callback) {
    var processedArray = []
    var closeArray = [],
        openArray = [],
        highArray = [],
        lowArray = [],
        volumeArray = []
        signal = Number 

    var close, open, high, low, volume, signal
 
    // store them for min max value finder
        for(i in data) {
            closeArray.push(data[i].close)
            openArray.push(data[i].open)
            highArray.push(data[i].high)
            lowArray.push(data[i].low)
            volumeArray.push(data[i].volume)
        }
        // get the value from minmax
        normal.getMinMaxValues(closeArray, function(result) { close = result })
        normal.getMinMaxValues(openArray, function(result) { open = result })
        normal.getMinMaxValues(highArray, function(result) { high = result })
        normal.getMinMaxValues(lowArray, function(result) { low = result })
        normal.getMinMaxValues(volumeArray, function(result) { volume = result })
        normal.getSignalBinary(open, close , function(result) { signal = result }) 
        // store them for file
        for(i in data) {
            processedArray.push([close[i], open[i], high[i], low[i], volume[i], signal[i]])
        }
        var jsonString = JSON.stringify(processedArray)
        fs.writeFile(__dirname + staticDataDir + "/processed/" + symbol + '.json', jsonString, function(err) {
            if(err) { return console.log(err) }
        callback()
    })
}