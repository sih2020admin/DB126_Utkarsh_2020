import { Connection } from "mysql"

const mysql = require('mysql')
var connection:Connection = mysql.createConnection({
    host:'localhost',
    user:'winston',
    password:'',
    database:'testing'
})
module.exports = connection
