import { Application } from 'express'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'
import misc from './routes/misc'
import payment from './routes/payment-server'
const app: Application = express()
var login = require('./routes/login')
var register = require('./routes/register-server')
var tender_desc = require('./routes/tender_desc')
var crud_admin = require('./routes/crud_admin')
var list_tender = require('./routes/list_tender')
var tender_approval = require('./routes/tender_approval')
var vendor_dashboard = require('./routes/vendor_dashboard')
var port = 8081 || process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views/user')))
app.use(express.static(path.join(__dirname, 'views/admin')))
app.use('/register', register.default)
app.use('/misc', misc)
app.use('/payment', payment)
app.use('/', tender_desc.default)
app.use('', login.default)
app.use('/', crud_admin.default)
app.use('/', list_tender.default)
app.use('/', tender_approval.default)
app.use('/', vendor_dashboard.default)
app.listen(port, () => {
    //console.log(`Server started on port ${port}`)
})
