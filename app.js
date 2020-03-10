const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const register = require('./routes/register-server')
const index = require('./routes/index-server')
const index2 = require('./routes/index-server2')
//var port = process.env.PORT || 8080
var port = 8081
app.use(cors())
app.use(express.json())


//app.use(express.urlencoded({extended:false}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/register',register)
app.use('/',index)
app.use('/index2',index2)

app.listen(port,()=>{
    console.log( `Server started on port ${port}`)
})