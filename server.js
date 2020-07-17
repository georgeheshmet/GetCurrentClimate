var bodyParser = require('body-parser');
var express = require('express');
var cors= require("cors");
// Setup empty JS object to act as endpoint for all routes
projectData = [];
projectData.push({animel:"lion"});

// Require Express to run server and routes
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get("/GetLastEntry",(req,res)=>{
    res.send(projectData[projectData.length-1]);
    //res.send("hello there");
    //console.log(projectData[projectData.length-1]);
})

app.post("/addWeathData",(req,res)=>{
    projectData.push(req.body);
    //res.send("hello there");
    console.log( projectData);
    res.sendStatus(200)
})
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;
const server =app.listen(port,()=>console.log("here you are "+port))

// Setup Server