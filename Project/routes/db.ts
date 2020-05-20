import { Connection } from 'mysql'
import mysql from 'mysql'
var connection: Connection

connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'e_tender',
    multipleStatements: true,
})

export default connection
