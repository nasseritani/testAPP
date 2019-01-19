const http = require('http');
const express = require('express');
//bodyparser act as middleware to get form data encoded
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');
const port=process.env.PORT || 3000
const app = express();
var username = "sfadmin@SFPART026942",
    password = "welcome",
    url = "https://apisalesdemo2.successfactors.eu/odata/v2/User('sfadmin')",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
app.listen(port);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get('/rates',function(req,res){
    console.log(req);
    const requestOptions = {
  method: 'GET',
  uri: url,
  headers: {
    "Authorization" : auth
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);
    res.send(response);
}).catch((err) => {
  console.log('API call error:', err.message);
});})
