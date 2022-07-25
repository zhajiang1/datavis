async function freeViewInit() {

    var csv = await d3.csv("./dataset/owid-covid-data.csv");

    // var location = csv.filter(function (dataset) {
    //     return dataset["location"] === country
    // });
    
    d3.select("#country-dropdown")
        .selectAll("option")
        .data(d3.map(csv, function(d){return d.location;}).keys())
        .enter()
        .append("option")
        .text(function(d){return d;})
        .attr("value", function(d){return d;});
}

function selectCountry() {
    var selected_country = document.getElementById("country-dropdown").value;
    d3.select("#vis").selectAll('*').remove();
    visInit(selected_country);
}