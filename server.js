var bodyParser = require('body-parser');
// Require Express to run server and routes
var express = require('express');
var cors= require("cors");
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


/*Get handler to handle getting last entry to front end*/
app.get("/GetLastEntry",(req,res)=>{
    res.send(projectData);
})

app.post("/addWeathData",(req,res)=>{

    projectData.Current_temp=req.body.Current_temp;
    projectData.date=req.body.date;
    projectData.UserFeeling=req.body.UserFeeling;
    //res.send("hello there");
    console.log( projectData);
    res.sendStatus(200)
})
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server =app.listen(port,()=>console.log("here you are "+port))