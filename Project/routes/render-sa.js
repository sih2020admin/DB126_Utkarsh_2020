const express = require('express')
const router = express.Router()

router.get('/login',(request, response) =>{
    response.render('super admin/login',{ layout: false})
})
router.get('/interface',(request, response) =>{
    response.render('super admin/interface',{ layout: false})
})

exports.default = router