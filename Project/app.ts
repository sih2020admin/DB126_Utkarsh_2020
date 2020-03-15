import { Application } from "express"
import express from "express"
import cors from "cors"
import path from "path"
import register from './routes/register-server'
import misc from './routes/misc'
const app:Application = express()
const login =require("./routes/login")
//var port = process.env.PORT || 8080
var port = 8081
app.use(cors())
app.use(express.json())
//app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/register',register)
app.use("/misc",misc)
app.use('',login.default)

app.listen(port,()=>{
    console.log( `Server started on port ${port}`)
})