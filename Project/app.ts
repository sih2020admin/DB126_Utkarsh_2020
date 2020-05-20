import './loader'
import { Application, Request, Response, } from 'express'
import hbs from 'express-handlebars'
/* import connection from './routes/db' */
import express from 'express'
import cors from 'cors'
import path from 'path'
/* const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session) */
import misc from './routes/misc'
import payment from './routes/payment-server'
import admin_profile from './routes/admin-profile'
const app: Application = express()
var login = require('./routes/login')
var register = require('./routes/register-server')
var tender_desc = require('./routes/tender_desc')
var crud_admin = require('./routes/crud_admin')
var list_tender = require('./routes/list_tender')
var tender_approval = require('./routes/tender_approval')
var vendor_dashboard = require('./routes/vendor_dashboard')
var apply_tender = require('./routes/apply_tender')
const cookie = require('cookie-parser')
var port = process.env.PORT

app.engine('.hbs', hbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST'],
    })
)
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }))

/* var sessionStore = new MySQLStore({}, connection)
app.use(session({
    //key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000*60*60*2
    }
    
})); */
/* app.use((request:Request, response, next) => {
    console.log(request.session)
    next()
}) */
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views/user')))
app.use(express.static(path.join(__dirname, 'views/admin')))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use('/register', register.default)
app.use('/payment', payment)
app.use('/admin', admin_profile)
app.use('/', tender_desc.default)
app.use('', login.default)
app.use('/', crud_admin.default)
app.use('/', list_tender.default)
app.use('/', tender_approval.default)
app.use('/', vendor_dashboard.default)
app.use('/', apply_tender.default)
app.use('/misc', misc)

app.get('*', (request: Request, response: Response) => {
    response.sendFile(__dirname + '/views/user/error.html')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

module.exports = app
