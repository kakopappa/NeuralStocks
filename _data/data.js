var googleFinance = require('google-finance')

exports.historical = function(callback) {
    googleFinance.historical({
    symbol: 'NASDAQ:AAPL',
    from: '2017-01-01',
    to: '2017-12-01'
}, function (err, quotes) {
        if(err) {
            callback(err)
        } else {
            callback(quotes)
        }
    })
}