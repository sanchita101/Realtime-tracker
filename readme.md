<h1>Real-Time Location Tracking App</h1>

<p>This is a <strong>real-time location tracking web application</strong> that uses <strong>Socket.IO</strong> and <strong>Leaflet.js</strong> to display users' locations on a map. It demonstrates the use of geolocation APIs, real-time data exchange, and map rendering.</p>

<h2>Features</h2>
<ul>
  <li>Tracks and displays user locations in real-time.</li>
  <li>Uses <strong>Leaflet.js</strong> for interactive map rendering.</li>
  <li>Employs <strong>Socket.IO</strong> for real-time bidirectional communication between client and server.</li>
  <li>Responsive and works across devices with geolocation support.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li><strong>Node.js</strong>: Backend runtime environment.</li>
  <li><strong>Express.js</strong>: Web framework for handling server-side routes.</li>
  <li><strong>Socket.IO</strong>: Real-time communication library.</li>
  <li><strong>Leaflet.js</strong>: JavaScript library for mobile-friendly interactive maps.</li>
  <li><strong>EJS</strong>: Templating engine for rendering dynamic content.</li>
  <li><strong>HTML/CSS/JavaScript</strong>: Frontend components.</li>
</ul>

<h2>Start the server</h2>
<h4>To run the project:</h4>
<ol>
  <li>Open the terminal and navigate to the project directory.</li>
  <li>Run the command <code>npx nodemon app.js</code> to start the development server.</li>
  <li>Access the application at <code>http://localhost:3000</code>.</li>
</ol>

<h2>How It Works</h2>
<ul>
  <li><strong>Frontend (script.js)</strong>: Uses the browser's <code>navigator.geolocation</code> API to track user location and sends it to the server using <code>socket.emit('send-location')</code>.</li>
  <li><strong>Backend (app.js)</strong>: Receives location data, stores it, and broadcasts it to all connected clients using <code>io.emit('received-location')</code>.</li>
  <li><strong>Leaflet.js</strong>: Renders an interactive map and places markers to show the locations of connected users.</li>
</ul>


<h2>License</h2>
<p>This project is licensed under the MIT License. See the LICENSE file for details.</p>
