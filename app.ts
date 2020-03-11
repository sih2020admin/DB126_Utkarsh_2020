import { Application } from "express"

const express = require('express')
const cors = require('cors')
const path = require('path')
const app:Application = express()
const register = require('./routes/register-server')
const index = require('./routes/index-server')
//var port = process.env.PORT || 8080
var port = 8081
app.use(cors())
app.use(express.json())
//app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/register',register)
//app.use('/',index)

app.listen(port,()=>{
    console.log( `Server started on port ${port}`)
})