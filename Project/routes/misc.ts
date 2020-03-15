import { Router,Request,Response } from "express"
import { Connection } from "mysql"
import express from "express"
import connection from "./db"

const router:Router = express.Router()

router.post("/get-state",(request:Request,response:Response)=>{
    console.log("States loaded")
    connection.query("select * from states",(error,result)=>{
        if (error){
            console.log(error)
            response.send("some error in sending state names")
        }
        else{
            response.status(200).send(result)
        }
    })
})

router.post("/get-legal-status",(request:Request,response:Response)=>{
    console.log("Legal status loaded")
    connection.query("select * from legal_status_details ",(error,result)=>{
        if (error){
            console.log(error)
            response.send("Some error in sending legal status ")
        }
        else{
            response.status(200).send(result)
        }
    })
})

export default router