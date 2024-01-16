// Setup empty JS object to act as endpoint for all routes
let projectData ={};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//Dependecies
const bodyParser= require('body-parser');

//configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require ('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

//Port
const port = 3000;

//server
const server = app.listen(port, ()=>{
console.log('server running');
console.log(`Running on localHost: ${port}`);
});

//get route
app.get('/getData', (req, res)=>{
res.send(projectData)

});

//post route
app.post('/addData', (req,res)=>{
    console.log('Received POST request:', req.body);
try {
  
  const newData ={
    date :req.body.date,
    temp :req.body.temp,
    content: req.body.content
  };

  projectData.push(newData);
  res.send(projectData)
} catch(error){
console.log('Error in post route:', error);
}
});