"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

require('./loader')
var verify = require('./routes_aadhar/verify');
var sms = require('./routes_aadhar/sms');
var https = require("https");
var fs = require("fs");


var httpsOptions = {
     key: fs.readFileSync('key.pem'),
     cert: fs.readFileSync('certificate.crt')
};

//var port = process.env.PORT || 8080
var port = 8082;
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended:false}))

app.use('', verify);
app.use('/sms', sms);
//app.use('/',index)
// app.listen(port, function () {
//     console.log("Server started on port " + port);
// });

https.createServer(httpsOptions,app).listen(port,function(){
	console.log("Server listening On Port "+ port);
});

