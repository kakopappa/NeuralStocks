'use strict'
 
google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawBackgroundColor)
 
function drawBackgroundColor() {
       var data = new google.visualization.DataTable()
      data.addColumn('number', 'X');
      data.addColumn('number', 'Price');
      data.addRows([[0,0],[10,8],[20,12]])

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Price'
        },
        backgroundColor: '#11111',
        chartArea:{left:100, right: 100,top:10,bottom: 80,width:"100%",height:"60%"}
      }

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options)
 
}
  