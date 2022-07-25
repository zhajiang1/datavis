async function visInit(country) {
    // constant
    var margin = 80;
    var width = 600;
    var height = 700;
    var timeParser = d3.timeParse("%Y-%m-%d");

    // read data
    var confirmed_dataset = await d3.csv("./dataset/owid-covid-data.csv");
    var filtered_country_dataset = confirmed_dataset.filter(function (dataset) {
        return dataset["location"] === country
    });

    filtered_country_dataset.forEach(function (d) {
        d.parsed_date = timeParser(d.date)
    });

    filtered_country_dataset.sort(function (a, b) {
        return a.parsed_date - b.parsed_date;
    })

    // x,y axis param
    var yLeftmax = d3.max(filtered_country_dataset, function (d) {
        return +d.new_cases_smoothed;
    });
    var yRightmax = d3.max(filtered_country_dataset, function (d) {
        return +d.new_deaths_smoothed;
    });
    var xdomain = [];
    filtered_country_dataset.map(function (d) {
        xdomain.push(timeParser(d.date));
    });


    var yLeft = d3.scaleLinear().domain([0, yLeftmax]).range([height, 0]);
    var yRight = d3.scaleLinear().domain([0, yRightmax * 2]).range([height, 0]);
    var x = d3.scaleBand().domain(xdomain).range([0, width]);

    var xPosition = d3.scaleLinear().domain(xdomain).range([0, width]);

    var xTimeDomain = d3.extent(xdomain);
    var xScale = d3.scaleTime()
                   .domain(xTimeDomain)
                   .range([0,width]);

    var vis = d3.select("#vis")
                .append("g")
                .attr("transform", "translate(" + margin + "," + margin + ")");

    // label
    // vis.append("rect")
    //     .attr("x", 60)
    //     .attr("y",40)
    //     .attr("width",200)
    //     .attr("height",40)
    //     .style("fill", "white")
    //     .style("fill-opacity","80%");
    vis.append("rect")
        .attr("x",20)
        .attr("y",17)
        .attr("width",5)
        .attr("height",2)
        .style("fill", "blue")
        .attr("alignment-baseline","middle");
    vis.append("rect")
        .attr("x",25)
        .attr("y",17)
        .attr("width",5)
        .attr("height",2)
        .style("fill", "red")
        .attr("alignment-baseline","middle");
    vis.append("text")
        .attr("x",35)
        .attr("y",20)
        .text("Death (7 day average)")
        .style("font-size", "12px")
        .attr("alignment-baseline","middle");
    vis.append("rect")
        .attr("x",20)
        .attr("y",35)
        .attr("width",10)
        .attr("height",6)
        .style("fill","#5096b4")
        .attr("alignment-baseline","middle");
    vis.append("text")
        .attr("x",35)
        .attr("y",40)
        .text("Confirmed COVID Cases (7 day average)")
        .style("font-size", "12px")
        .attr("alignment-baseline","middle");

    // Tooltip
    var tooltip2 = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("font-size", "13px")
        .style("background", "rgba(255, 255, 255, .7)");

    // tooltip for mouse event
    var tooltipBar = d3.select("body")
                       .append("div")
                       .style("opacity", 0.8)
                       .style("position", "absolute")
                       .style("z-index", "10")
                       .style("visibility", "hidden")
                       .style("background", "white");

    var tooltipLine = d3.select("body")
                        .append("div")
                        .style("opacity", 0.8)
                        .style("position", "absolute")
                        .style("z-index", "10")
                        .style("visibility", "hidden")
                        .style("background", "white");

    var focus = vis.append('g')
                   .append('circle')
                   .style("fill", "none")
                   .attr("stroke", "black")
                   .attr('r', 4.5)
                   .style("opacity", 0)

    var focusText = d3.select("body")
                      .append("div")
                      .attr("class", "focusText")
                      .style("opacity", 0.8)
                      .style("position", "absolute")
                      .style("z-index", "10")
                      .style("visibility", "hidden")
                      .style("background", "white");

    // vertical line
    // var vertical = d3.select("body")
    //                  .append("div")
    //                  .attr("class", "remove")
    //                  .style("position", "absolute")
    //                  .style("z-index", "19")
    //                  .style("width", "1px")
    //                  .style("height", "880px")
    //                  .style("top", "80px")
    //                  .style("bottom", "80px")
    //                  .style("left", "0px")
    //                  .style("background", "#000");
    //
    //
    // d3.select("body").on("mousemove", function(){
    //         mousex = d3.mouse(this);
    //         mousex = mousex[0] + 5;
    //         vertical.style("left", mousex + "px" )})
    //     .on("mouseover", function(){
    //         mousex = d3.mouse(this);
    //         mousex = mousex[0] + 5;
    //         vertical.style("left", mousex + "px")});

    // confirmed - bar chart
    vis.append("g")
        .attr("class", "bar-group")
        .selectAll('rect')
        .data(filtered_country_dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d, i) {
            return x(timeParser(d.date))
        })
        .attr('y', function (d, i) {
            return yLeft(+d.new_cases_smoothed);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d, i) {
            return 700 - yLeft(+d.new_cases_smoothed);
        });

    // y axis
    vis.append("g")
       .call(d3.axisLeft(yLeft))
       .append("text")
       .attr("y", 20)
       .attr("dy", "-5em")
       .attr("text-anchor", "end")
       .attr("stroke", "black")
       .text("New confirmed");

    vis.append("g")
        .attr("transform", "translate(" + width + ",0)")
        .call(d3.axisRight(yRight))
        .append("text")
        .attr("x", 0)
        .attr("y", -30)
        .attr("stroke", "black")
        .text("New deaths");

    // x axis
    vis.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y.%b")));

    // death - line chart
    vis.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", yRight(0))
        .attr("x2", 0)
        .attr("y2", yRight(yRightmax))
        .selectAll("stop")
        .data([
            {offset: "0%", color: "blue"},
            {offset: "100%", color: "red"}
        ])
        .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    vis.append("path")
        .datum(filtered_country_dataset)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
                     .x(function(d) { return x(timeParser(d.date));})
                     .y(function(d) { return yRight(+d.new_deaths_smoothed);}));

    vis.append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

    function mouseover() {
        focus.style("opacity", 1);
        focusText.style("opacity",1).style("visibility", "visible");

    }

    var bisectDate = d3.bisector(function(d) { return d.parsed_date; }).left;

    function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]);
        var i = bisectDate(filtered_country_dataset, x0, 1);
        selectedData = filtered_country_dataset[i]
        focus
            .attr("cx", xScale(selectedData.parsed_date))
            .attr("cy", yRight(selectedData.new_deaths_smoothed))
        focusText
            .html("<b>" + selectedData.date + "</b><br>New confirmed: " + Math.round(selectedData.new_cases_smoothed) + "<br>Death: " + Math.round(selectedData.new_deaths_smoothed)
            +"<br>Case fatality rate: " + selectedData.new_deaths_smoothed/selectedData.new_cases_smoothed)
            .style("top", yRight(selectedData.new_deaths_smoothed)+50+"px").style("left",(d3.event.pageX+10)+"px");
    }

    function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        focusText.style("visibility", "hidden");
    }
}