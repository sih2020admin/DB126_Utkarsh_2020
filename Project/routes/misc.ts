import { Router,Request,Response } from "express"
import { Connection } from "mysql"
import express from "express"
import connection from "./db"

const router:Router = express.Router()

router.post("/get-state",(request:Request,response:Response)=>{
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

router.post("/get-city",(request:Request,response:Response)=>{
    const state_code = request.body.state_code
    console.log(state_code)
    connection.query("select * from city where st_id=?",[state_code],(error,result)=>{
        if (error){
            console.log(error)
            response.status(400).send("Some error in sending legal status ")
        }
        else{
            response.status(200).send(result)
        }
    })
})

router.post("/payment/payment-redirect",(request:Request,response:Response)=>{
    response.send("hello world")
})
export default router