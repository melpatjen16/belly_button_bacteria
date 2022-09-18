
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
  })}
  
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
