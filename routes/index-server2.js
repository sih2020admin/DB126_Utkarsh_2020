const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.sendFile('/home/viraj/Documents/sih/sih2020/git/V-victory/views/index2.html')
})

module.exports = router