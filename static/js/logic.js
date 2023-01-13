let newYorkCoords = [40.73, -74.0059]; 
let mapZoomLevel = 12;

// set up the citi bike url:
let citi_bike_url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

// Create the createMap function.
function createMap(bikeStations) { 
  // Create a baseMaps object to hold the lightmap layer.
  // Create a baseMaps object.
  let street =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

  // Create an baseMaps object to hold the base.
  let baseMaps = {
    "Street Map": street 
    };
 
  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Bike stations": bikeStations
  }

  // Creating the map object
  let myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [street, bikeStations] 
    });
  

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
    for (let i = 0; i < stations.length; i++) {

      // Add a new marker to the cluster group, and bind a popup.
      markers.push(L.marker([stations[i].lat, stations[i].lon])  
        .bindPopup(`<h3>Name:${stations[i].name}</h3> <h3>Capacity: ${stations[i].capacity}</h3>`));
    }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  let newLayer = L.layerGroup(markers)

  createMap(newLayer); 
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(citi_bike_url).then(function(response) {
  createMarkers(response)
}); 