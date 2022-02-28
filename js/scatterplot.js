/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// This code adds the empty chart to the svg to add bars to
// in the csv-bar div
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data) => { 
  console.log(data); 

  // This code finds the highest score to determine the height of the tallest bar for scaling
  let maxY3 = d3.max(data, function(d) { return d.score; });

  // find max X
  let maxX3 = d3.max(data, (d) => { return d.day; });  

  // This code scales the y axis of the scatter plot based on the largest score  
  let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]); 

  // This code scales the x axis of the scatterplot based on the number of days
  let xScale3 = d3.scaleLinear()
            .domain([0, maxX3])
            .range([margin.left, width - margin.right]); 

  // This code adds the y axis to the svg
  svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale3)) 
   .attr("font-size", '20px'); 

  // This code adds the x axis to the svg
  svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale3)
      .ticks(maxX3))
    .attr("font-size", '20px'); 

  // This code adds a tooltip to the barchart that is hidden by default
  const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

  // Create a mouseover event to show the tooltip info when a bar is moused over
  const mouseover3 = function(event, d) {
    tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
  }

  // Create a mousemove event to move the tooltip as the mouse moves
  const mousemove3 = function(event, d) {
    tooltip3.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
  }

  // Mouseleave event to hide the tooltip when the mouse leaves the bar
  const mouseleave3 = function(event, d) { 
    tooltip3.style("opacity", 0); 
  }

  svg3.selectAll("circle") 
      .data(data)
      .enter()  
      .append("circle")
        .attr("cx", (d) => xScale3(d.day)) // use xScale to return 
                                        // pixel value for given
                                        // datum 
        .attr("cy", (d) => yScale3(d.score)) // use yScale to return 
                                        // pixel value for given
                                        // datum 
        .attr("r", 10)
        .on("mouseover", mouseover3) 
        .on("mousemove", mousemove3)
        .on("mouseleave", mouseleave3);
});








