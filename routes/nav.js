const express = require('express')
const router = express.Router()
var path = __dirname
path = path.slice(0,48)
console.log(path.length, path)

router.get('/',(req,res)=>{
    res.sendFile(path+'views/nav.html')
})

module.exports = router