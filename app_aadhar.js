"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

var verify = require('./routes/verify');
//var port = process.env.PORT || 8080
var port = 8082;
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended:false}))

app.use('', verify);
//app.use('/',index)
app.listen(port, function () {
    console.log("Server started on port " + port);
});
