import { Pool } from 'mysql2/promise'
import { tender_credentials,aadhar_credentials } from './database_credentials'
import mysql from 'mysql2/promise'
var connection: Pool
connection = mysql.createPool(tender_credentials)
export default connection


