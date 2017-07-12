'use strict'

google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawBackgroundColor)

var tempStocks = []
var i 

function drawBackgroundColor() {
      getJSONData(function(stockData) {
      var data = google.visualization.arrayToDataTable(stockData);
            var options = {
              hAxis: { itle: 'Time' },
              vAxis: { title: 'Price' },
              backgroundColor: '#11111',
              chartArea:{left:150, right: 150,top:10,bottom: 80,width:"100%",height:"60%"}
            }
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options)
    })
}

function getJSONData(callback) {
    tempStocks.push(["Date", 
    {type: 'number', label: 'Close'},
    {type: 'number', label: 'Open'}
    ])
    $.getJSON("../data/historical/NASDAQ:AAPL.json", function(data) {
      for(i in data) {
          var date = new Date(data[i].date)
          let set = [date.toLocaleDateString(),data[i].close, data[i].open]
          tempStocks.push(set)
        }
      callback(tempStocks)
    })  
}