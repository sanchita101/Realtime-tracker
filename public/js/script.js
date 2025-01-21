//This script.js file is coded in VANILLA JS.
//All this is the front-end part.


// Initialize a socket connection with the server
const socket = io();

//The Window Navigator Object
//Check if the browser supports geolocation
if(navigator.geolocation){

   // Watch the user's position for real-time tracking
   navigator.geolocation.watchPosition((position) => {

      const{ latitude, longitude} = position.coords;     //get the location co-ordinates [extracting latitude and longitude]

      console.log("Location received: ", latitude, longitude);  // Log the location

      socket.emit('send-location', {latitude, longitude});      //Emits this event from the frontend to the backend
   }, 
   (error) => {
      console.error("Geolocation error: ", error); // if there is any error, this will be displayed in the console
   },
   {
      enableHighAccuracy: true,     // Request high accuracy location data
      timeout:30000,                // Maximum time to wait for a response (30 seconds)
      maximumAge: 0,                // No caching of previous positions. Meaning: Prevent caching old positions, always fetch new data (i.e here the co-ordinates)
   }
);
}


// Create a map centered at [0, 0] with zoom level 15
const map =  L.map("map").setView([0,0], 15);  //L.map("map") => used to ask permission for location on the browser 


//This is used to add the world map on the page
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",    //Add the OpenStreetMap tiles to the map
   {
      attribution: "Sanchita Chourasia"   // This is displayed in the bottom-right corner of the page
   }).addTo(map)


//Creating a marker (the blue point to show your current location)
const markers = {};     // Store markers for each user, identified by their socket ID


// Handle the 'received-location' event from the server
socket.on("received-location", (data) => {
   const {id, latitude, longitude} = data;      // Extract data received from the server
   map.setView([latitude, longitude]);          // Center the map on the received coordinates

   if(markers[id]){
      markers[id].setLatLng([latitude, longitude]);      // Update existing marker position
   }
   else{
      markers[id] = L.marker([latitude, longitude]).addTo(map);   // Add a new marker to the map
   }
});



// Handle user disconnection to remove their marker
socket.on("user-disconnected", (id) => {
   if(markers[id]){
      map.removeLayer(markers[id]);    // Remove the marker from the map
      delete markers[id];              // Delete the marker from the markers object
   }
});
