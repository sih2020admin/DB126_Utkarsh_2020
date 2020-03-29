import { Connection } from "mysql"
import os from "os"
import mysql from "mysql"
import fs from "fs"
var connection:Connection;
if (os.platform() === "linux" && os.hostname() === "ubuntu" && os.userInfo().username === "winston"){
    var database,user,password
    var array = fs.readFileSync('/etc/mysql/my.cnf').toString().split("\n");
    for (var x of  array){
        if (x.match("database")){
            if(x.split("=")[1]!=undefined){
                database = x.split("=")[1].trim()
            } 
        }
        if (x.match("user")){
            if(x.split("=")[1]!=undefined){
                user = x.split("=")[1].trim()
            } 
        }
        if (x.match("password")){
            if(x.split("=")[1]!=undefined){
                password = x.split("=")[1].trim()
            } 
        }

    }

    connection = mysql.createConnection({
        host:'localhost',
        user,
        password,
        database,
        multipleStatements:true
    })

}
else{
     connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'e_tender',
        multipleStatements:true
    })
}

export default connection