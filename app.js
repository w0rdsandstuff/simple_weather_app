// 1. make new folder, add index.html + app.js
// 2. npm init will create package.json
// 3. npm i express - create package-lock.json + node modules
// 4. nodemon app.js - command to run app

const express = require("express");  
const https = require('https');      // Native HTTPS node module  
const bodyParser = require('body-parser')  //npm i body-parser

const app = express();  //Initialize new express app

app.use(bodyParser.urlencoded({extend: true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', function (req, res) {

  const query = req.body.cityName
  const apiKey = 'cd9b299639e13cf756fbdb1e0e1893db'
  const unit = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units=' + unit; //Getting live data using an API

https.get(url, function(response) {    // Using http module calling the get method
  console.log(response.statusCode)

  response.on('data', function(data) {
    const weatherData = JSON.parse(data);    //parses a JSON string, constructing the JavaScript value or object described by the string.
    const temp = weatherData.main.temp;      //tap into temp field
    const weatherDescription = weatherData.weather[0].description;  //grabbing specific items we want
    const icon = weatherData.weather[0].icon;
    const imageURL = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png';
    res.write('<p>The weather is currently ' + weatherDescription + '</p>'); 
    res.write('<h1>The temp in ' + query +  ' is ' + temp + ' degrees Celcius.</h1>'); 
    res.write('<img src=' + imageURL + '>');  
    res.send();  //refers to app.get response we can only have ONE res.send
    })
  })
})





app.listen(3000, function() {              // Use the command 'nodemon app.js' to run
  console.log("Server is running on port 3000")
})