import { Application } from "express"
import express from "express"
import cors from "cors"
import path from "path"
import misc from './routes/misc'
const app:Application = express()
const login =require("./routes/login")
const register=require("./routes/register-server")
const tender_desc = require("./routes/tender_desc");
//var port = process.env.PORT || 8080
var port = 8081
app.use(cors())
app.use(express.json())
//app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/register',register.default)
app.use("/misc",misc)
app.use('/', tender_desc.default);
app.use('',login.default)

app.listen(port,()=>{
    console.log( `Server started on port ${port}`)
})