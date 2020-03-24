import { Connection } from "mysql"
import mysql from "mysql"
var connection:Connection = mysql.createConnection({
    host:'localhost',
    user:'winston',
    password:'Winston@99',
    database:'e_tender',
    multipleStatements:true
})
export default connection