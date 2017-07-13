const synaptic = require('synaptic'),
      fs = require('fs')

const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

var trainingObject = {
    input:Array,
    output:Number
}

var trainingSet = [],
    trainingOptions = {
        rate: 0.1,
        iterations: 20000,
        error: .005,
        log: true
    }

var myNetwork = new Architect.Perceptron(5, 10, 1)
var trainer = new Trainer(myNetwork)

/** PROCESSED DATA 
 * [close, open, high, low, volume]
 */

exports.execute = function(symbol, callback) {
    console.log('executing neural network on symbol : ' + symbol)
        // get the selected symbol data
        getSelectedDataFromFile(symbol, function(processedData) {
            trainingSet = processedData
            trainTheNetwork(function() {
                // start prediction
                var set = trainingSet[trainingSet.length-1] // this is last data
                predict(set, function(direction) {
                callback(direction)
            })
        })
    })
}


function trainTheNetwork(callback) {
    trainer.train(trainingSet, trainingOptions, function(result) {
        console.log(result)
    })  
    callback()
}

function predict(set,callback) {
    console.log('Checking untrained data ... ')
    let output = myNetwork.activate(set.input)
    var direction = ''

    if(output > 0.5) {
        direction = 'Buy signal'
    } else if((output < 0.5)) {
        direction = 'Sell signal'    
    }
    console.log('output: '+output)
    var percentage = (output[0] * 100) / 0.50
    console.log('percentage: '+percentage)
    callback(direction)
}
 

//** DATA SELECTION*/

function getSelectedDataFromFile(symbol, callback) {

    var selectedData = []

    fs.readFile(__dirname + '/../_server/static/data/processed/' + symbol + '.json','utf8',function(err, data) {
        if(err) 
            callback(err)
        var jsonData = JSON.parse(data)
            for(i in jsonData) {
            let dataSet = jsonData[i]
                trainingSet = {
                    input: [ dataSet[0], dataSet[1],dataSet[2],dataSet[3], dataSet[4]],
                    output: [dataSet[5]]
                } 
            selectedData.push(trainingSet)
        }
    callback(selectedData)
     })
}
