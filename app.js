//Back-end for real-time geolocation tracking application

const exp = require('constants');
const express = require('express');    // Import Express.js for handling server routes and middleware
const app = express();     // Create an instance of Express
const path = require("path");    // Provides utilities for working with file and directory paths

// http module is required to create a server compatible with socket.io
const http = require('http'); //http is required to run socket.io


const socketio = require("socket.io");    // Import socket.io for real-time bidirectional communication
const server = http.createServer(app);    // Create a server instance using the Express app
const io = socketio(server);     // Initialize socket.io on the server


// Set the view engine to EJS for rendering dynamic HTML pages
app.set("view engine", "ejs");
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname,"public")));


// Handle incoming geolocation data from frontend
io.on("connection", function (socket){
   // Log when a new client connects (displayed on terminal)
   console.log("A new connection, connected");

   // Receive the latitude and longitude data from frontend i.e. /* socket.emit('send-location', {latitude, longitude}); */ from script.js
   socket.on("send-location",function (data){
      // Emit received location data to all connected clients (front-end)
      io.emit("received-location", {
         id: socket.id,       // Unique socket ID to track each client
         latitude: data.latitude,  // Latitude received from frontend
         longitude: data.longitude  // Longitude received from frontend
         }
      );
   });

    // Handle user disconnection
   socket.on("disconnect", function(){
      io.emit("user-disconnected", socket.id);  // Emit disconnected event to all clients
   });
});


// Render the main page when the root URL is accessed
app.get("/", function (req, res){
   res.render("index");
});

// Start the server and listen on port 3000
server.listen(3000);