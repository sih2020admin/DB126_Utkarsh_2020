"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
router.get('/', function (request, response) {
    response.render("index");
});
module.exports = router;
