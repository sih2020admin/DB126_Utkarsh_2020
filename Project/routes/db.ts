import { Connection } from "mysql"
import mysql from "mysql"
var connection:Connection = mysql.createConnection({
    host:'localhost',
    user:'winston',
    password:'W',
    database:'e_tender'
})
export default connection