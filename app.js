"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();
var register = require('./routes/register-server');
var index = require('./routes/index-server');
//var port = process.env.PORT || 8080
var port = 8081;
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/register', register);
//app.use('/',index)
app.listen(port, function () {
    console.log("Server started on port " + port);
});
