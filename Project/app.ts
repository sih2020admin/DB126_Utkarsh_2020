import { Application } from "express"
import express from "express"
import cors from "cors"
import path from "path"
import misc from './routes/misc'
import payment from "./routes/payment-server"
const app:Application = express()
const login =require("./routes/login")
const register=require("./routes/register-server")
const tender_desc = require("./routes/tender_desc");
var crud_admin = require("./routes/crud_admin");

//var port = process.env.PORT || 8080
var port = 8081
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/user')));

app.use('/register',register.default)
app.use("/misc",misc)
app.use("/payment",payment)
app.use('/', tender_desc.default);
app.use('',login.default)
app.use('/',crud_admin.default);

app.listen(port,()=>{
    console.log( `Server started on port ${port}`)
})