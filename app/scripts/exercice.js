$(document).ready(function() {
  var obj = [];
  var content = {buildings: [], naturals: [], highways: [], amenities: []};

  var svg = d3.select("body")
    .append("svg:svg")
    .attr("width", $(window).width())
    .attr("height", $(window).height())
    .attr("pointer-events", "all")
    .append('svg:g')
    .call(d3.behavior.zoom().on("zoom", zoom))
    .append('svg:g');

  $.get('data/eure.json').success(function (data) {
    obj = data;
    content = {buildings: [], naturals: [], highways: [], amenities: []};
    for (var i = 0; i < obj.length; i++) {
      var tmpObj = obj[i];

      if (tmpObj.hasOwnProperty("building") && tmpObj.building) {
        content.buildings.push(window.Shapes.createBuilding(tmpObj));
      }
      else {
        if (tmpObj.hasOwnProperty("natural")) {
          content.naturals.push(window.Shapes.createNatural(tmpObj));
        }
        else if (tmpObj.hasOwnProperty("highway")) {
          content.highways.push(window.Shapes.createRoad(tmpObj));
        }
        else if (tmpObj.hasOwnProperty("amenity")) {
          content.amenities.push(window.Shapes.createAmenity(tmpObj));
        }
      }
    }

    draw();
  });

  function draw() {
    for (var i = 0; i < content.buildings.length; i++) {
      svg.append("path").attr("d", content.buildings[i].toSvgPath())
        .attr("stroke", "black")
        .attr("fill", "lightgray")
        .attr("id", i)
        .on("click", function (d, i) {
          alert(content.buildings[d3.select(this).attr("id")].toString());
        })
        .on("mouseover", function(d, i) {
          d3.select(this).attr("fill", "pink")
        })
        .on("mouseout", function(d,i) {
          d3.select(this)
            .attr("strocke", "black")
            .attr("fill", "lightgray")
        });
    }

    for (var i = 0; i < content.naturals.length; i++) {
      svg.append("path").attr("d", content.naturals[i].toSvgPath()).attr("stroke", "navy").attr("fill", "darkcyan");
    }

    for (var i = 0; i < content.highways.length; i++) {
      svg.append("path").attr("d", content.highways[i].toSvgPath()).attr("stroke", "orange").attr("fill", "none");
    }

    for (var i = 0; i < content.amenities.length; i++) {
      svg.append("path").attr("d", content.amenities[i].toSvgPath()).attr("stroke", "darkgrey").attr("fill", "gray");
    }
  }

  function zoom() {
    svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
  }
});

