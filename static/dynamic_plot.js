function init() {
    var queryURL = "/names";
    d3.json(queryURL, function (error, response) {
        if (error) return console.warn(error);
        for (var i = 0; i < response.length; i++) {
            var select = document.getElementById('selDataset');
            option = document.createElement('option');
            option.value = response[i]; 
            option.text = response[i];
            select.appendChild(option);
        }

        genPie();
        genBibble();
    });
}

function genPie() {
    sample = document.getElementById('selDataset').options[0].value;
    var url = "/samples/" + sample;
    Plotly.d3.json(url, function(error, response){
        if (error) {
            return console.warn(error);
        }
        var layout = {showlegend: false};
        response.type = 'pie';
        Plotly.newPlot('pie', [response], layout);
        Plotly.restyle('pie', 'labels', response.labels)
        Plotly.restyle('pie', 'values',response.values);
    });
}

function genBibble() {
    sample = document.getElementById('selDataset').options[0].value;
    var url = "/samples/" + sample;
    Plotly.d3.json(url, function(error, response){
        if (error) {
            return console.warn(error);
        }
        var trace1 = {
          x: response.labels,
          y: response.values,
          mode: 'markers',
          marker: {
            size: response.values
          }
        };
        var layout = {
        showlegend: false,
        xaxis: {
        showticklabels: false
        }};
        Plotly.newPlot('bibbles', [trace1], layout);
        Plotly.restyle('bibbles', 'x', [response.labels])
        Plotly.restyle('bibbles', 'y',[response.values]);
    });
}

function updatePie(sample) {
    var url = "/samples/" + sample;
    Plotly.d3.json(url, function(error, response){
        if (error) {
            return console.warn(error);
        }
        response.type = 'pie';
        Plotly.restyle('pie', 'labels', [response.labels])
        Plotly.restyle('pie', 'values', [response.values]);
    });
}
function updateBibble(sample) {
        var url = "/samples/" + sample;
    Plotly.d3.json(url, function(error, response){
        if (error) {
            return console.warn(error);
        }
        Plotly.restyle('bibbles', 'x', [response.labels])
        Plotly.restyle('bibbles', 'y',[response.values]);
    });
}

function updatePanel(sample) {
    var obj = document.getElementById('factZone');
    var queryURL = "/metadata/" + sample;
    d3.json(queryURL, function (error, response) {
        if (error) return console.warn(error);
        Object.keys(response).forEach(function(key) {
        obj.innerText +=  "" + key + ' : ' + response[key] + "\n";
        })
    });
}
function optionChanged() {
    var sample = document.getElementById('selDataset').value
    updatePie(sample);
    updateBibble(sample);
    updatePanel(sample);
}

init();
