

function setMinMax(array, callback) {
    var min = array[0], max = array[0]
    for(i in array) {
        if(array[i] > max) { max = array[i] }
        if(array[i] < min) { min = array[i] }
    }
    callback(min, max)
}

exports.getMinMaxValues = function(array, callback) {

        var newValues = [] 
        setMinMax(array, function(min, max) {
        for(i in array) {
            var value = (array[i] - min)/(max-min)
            newValues.push(value) 
            }
        })
    callback(newValues)
}