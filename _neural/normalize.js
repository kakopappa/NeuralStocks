

function setMinMax(array, callback) {
    var min = array[0], max = array[0]
    for(i in array) {
        if(array[i] > max) { max = array[i] }
        if(array[i] < min) { min = array[i] }
    }
    callback(min, max)
}


/** MAIN EQUATION */

function minMax(value,min,max) {
    return (value - min)/(max-min)
}


/** MAIN MIN MAX GETTER */

exports.getMinMaxValues = function(array, callback) {
        var newValues = [] 
        setMinMax(array, function(min, max) {
        for(i in array) {
            var value = minMax(array[i], min, max)
            newValues.push(value) 
            }
        })
    callback(newValues)
}


/** GETS THE DIRECTION OF A SIGNAL */
exports.getSignalBinary = function(open, close, callback) {
    var binary = 0 
    var signal = []
    for(i in open) {
        if(close[i] < open[i]) { signal.push(0) } // SELL
        if(close[i] > open[i]) { signal.push(1) } // BUY
    }
    callback(signal)
}
