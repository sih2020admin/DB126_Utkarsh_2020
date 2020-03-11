import { Router,Request,Response } from "express"

const express = require('express')
const router:Router = express.Router()

router.get('/',(request:Request,response:Response)=>{
    response.render("index")
})

module.exports = router