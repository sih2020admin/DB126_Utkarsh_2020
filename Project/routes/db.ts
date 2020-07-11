import { Pool } from 'mysql'
import mysql from 'mysql'
var connection: Pool

connection = mysql.createPool({
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'e_tender',
    multipleStatements: true,
})

export default connection
