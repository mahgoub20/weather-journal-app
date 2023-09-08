
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// port
const port = 8080;

//Spin up the server
const server = app.listen(port, listening);

// server is running
function listening(){
    console.log(`running on http://localhost: ${port}`);
};

//GET route that returns the projectData object
app.get('/all', sendData)

function sendData (request, response) {
    response.send(projectData)
}

// POST route
app.post('/addData', addData)

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.content = request.body.content;
    response.end();
    console.log(projectData)
}