// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

/* The required callback function to display the server status in the terminal */
const port = 4444;

app.listen(port, activateServer);
function activateServer() {
  console.log("Server started successfully ..");
  console.log(`Server is running on localhost port: ${port}`);
}

/* "POST" Route for receiving data from the client side */
app.post("/storeData", storeData);

function storeData(request, response) {
  projectData = request.body;
  console.log(projectData); // test stored data "terminal"
}

/* "GET" Route to send the stored data to the client side */
app.get("/useData", function (request, response) {
  response.send(projectData);
});
