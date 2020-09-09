var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ksnJysklvyire2pS8LAYM8t7k7bTwve45xTRoj-HYQg/edit?usp=sharing';
function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: true } )
  }

function showInfo(data, tabletop) {
    alert('Successfully processed!')
    console.log(data);
    charts(data);
}

window.addEventListener('DOMContentLoaded', init)


//Problem in converting data from excel sheet to js
/*function charts(data){
    //console.log(x);
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var newdata =[];
        newdata.push(Object.keys(data[0]));
        for(i=0;i<data.length;i++)
        {newdata.push((Object.values(data[i])));
        var data_n = google.visualization.arrayToDataTable(newdata);
        console.log(newdata);
    var options = {
        title: 'Company Performance',
        hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data_n, options);
    }
}*/
