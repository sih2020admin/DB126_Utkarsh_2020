import { Connection } from "mysql"

const mysql = require('mysql')
var connection:Connection = mysql.createConnection({
    host:'localhost',
    user:'winston',
    password:'Winston@99',
    database:'testing'
})
module.exports = connection
