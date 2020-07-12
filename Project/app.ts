import './loader/loader'
import { Application, Request, Response } from 'express'
import { helpers } from './miscellaneous/helpers/helpers'
import hbs from 'express-handlebars'
import fs from 'fs'
import https from 'https'
import express from 'express'
import cors from 'cors'
import connection from './routes/db'
import { loadStaticFiles, loadRouterFiles } from './loader/loader_modules/load-routes'
import { redirectToProfilePage, redirectToLoginPage } from './miscellaneous/middleware/user/redirect'
import { redirectToAdminProfilePage, } from './miscellaneous/middleware/admin/redirect'
import { validateURLParams, validateURLParamsD, applyTender, previewTender, confirmTender } from './miscellaneous/middleware/user/tender'
var app: Application = express()
const cookie = require('cookie-parser')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const helmet = require('helmet')
const morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')
var port = process.env.PORT
var httpsOptions = {
        key: fs.readFileSync('certificates/key.pem'),
        cert: fs.readFileSync('certificates/certificate.crt'),
    },
    sessionStore = new MySQLStore({}, connection)

app.engine('.hbs', hbs({ extname: '.hbs', helpers }))
app.set('view engine', '.hbs')
app.set('trust proxy', ['165.22.210.37', '127.0.0.1'])
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie(process.env.COOKIE_SECRET))
app.use(helmet())
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST'],
    })
)
app.use(
    session({
        genid: function (req: any) {
            return uuidv4()
        },
        secret: process.env.COOKIE_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
        },
    })
)
app = loadStaticFiles(app)
//app.use(morgan('dev'))
app.use(redirectToLoginPage, redirectToProfilePage)
app.use('/tender/payment', validateURLParams, validateURLParamsD)
app.use('/tender/confirmation', validateURLParams, validateURLParamsD, confirmTender)
app.use('/tender/preview', validateURLParams, validateURLParamsD, previewTender)
app = loadRouterFiles(app)
app.get('*', (request: Request, response: Response) => {
    response.render('error', { layout: false })
})
/* console.log(require('express-list-endpoints')(app)) */

https.createServer(httpsOptions, app).listen(port, function () {
    console.log('Server listening On Port ' + port)
})
export default app
