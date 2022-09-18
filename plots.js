0
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    });
  }
  
  //initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }

// The function buildMetadata() takes in sample, or an ID number, as its argument. That is, when a dropdown menu option is selected, the ID number is passed in as sample.
//Then d3.json() pulls in the entire dataset contained in samples.json. Once the dataset is read in, it is referred to as data.
//The metadata array in the dataset (data.metadata) is assigned the variable metadata.
//Then the filter() method is called on the metadata array to filter for an object in the array whose id property matches the ID number passed into buildMetadata() as sample. Recall that each object in the metadata array contains information about one person.
//Because the results of the filter() method are returned as an array, the first item in the array (resultArray[0]) is selected and assigned the variable result.
//The id of the Demographic Info panel is sample-metadata. The d3.select() method is used to select this <div>, and the variable PANEL is assigned to it.
//PANEL.html("") ensures that the contents of the panel are cleared when another ID number is chosen from the dropdown menu.
//Finally, the append() and text() methods are chained to append a H6 heading to the panel and print the location of the volunteer to the panel, respectively.

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var IDs_ = result.otu_ids;
    var labels_ = result.otu_labels.slice(0, 10).reverse();
    var values_ = result.sample_values.slice(0, 10).reverse();

    bubble_Labels = result.otu_labels;
    bubble_Values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = IDs_.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: values_,
      y: yticks,
      type: 'bar',
      orientation: 'h',
      text: labels_
    }];
      
    // 9. Create the layout for the bar chart. 
    var barLayout = {
        title: "Top 10 Bacteria Cultures Found"
     
 
  };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);


    bubble_Labels = result.otu_labels;
    bubble_Values = result.sample_values;
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: IDs_,
      y: bubble_Values,
      text: bubble_Labels,
      mode: "markers",
      marker: {
        size: bubble_Values,
        color: bubble_Values,
        colorscale: "Jet"
      }
   }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OUT ID"},
      hovermode: "closest",
      automargins: true
  
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}