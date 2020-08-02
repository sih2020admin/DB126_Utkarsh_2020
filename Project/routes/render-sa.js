const express = require('express')
const a = require('./../miscellaneous/database/database functions/admin')

const router = express.Router()

router.get('/login',(request, response) =>{
    response.render('super admin/login',{ layout: false})
})
router.get('/interface',(request, response) =>{
    response.render('super admin/interface',{ layout: false})
})

router.post('/approve-vendor',(request, response) =>{
    Promise.all([a.getVendors()]).then((result) => {
        console.log('Promise called')
        console.log(result[0])
        response.send(result[0])
    }).catch((err) => {
        
    });
    //response.send()
})

exports.default = router