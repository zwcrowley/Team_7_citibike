var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Creating the map object
var myMap = L.map("map", {
  center: newYorkCoords,
  zoom: mapZoomLevel
});

let citi_bike_url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

// Create the createMap function.
function createMap (bikeStations) {
  // Create a baseMaps object to hold the lightmap layer.
  // Create a baseMaps object.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.   png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

   // Create an baseMaps object to hold the base.
  var baseMaps = {
    "Street Map": street,
    };


  // Create an overlayMaps object to hold the bikeStations layer.
  var bikes = L.layerGroup(bikeStations);

  // Create an overlay object.
  var overlayMaps = {
    "State Population": bikes,
    "City Population": cities
  };

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
// Set up stations url:
stations_url = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json"
// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  let stations = response.data.stations
  // Initialize an array to hold the bike markers.
  let markers = []

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.
    for (let i = 0; i < response.length; i++) {

    // Add the marker to the bikeMarkers array.
    let location = response[i].location;

    // Check for the location property.
    if (location) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(`Name: ${response[i].data.stations.name}, capacity: ${response[i].data.stations.name.capacity}`));
    }

  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(newLayer);
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(url).then(function(response) {
  createMarkers(response)
};