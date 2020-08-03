const express = require('express')
const a = require('./../miscellaneous/database/database functions/admin')
const connection = require('./../miscellaneous/database/connections/connection').default

const router = express.Router()

router.get('/login', (request, response) => {
    response.render('super admin/login', { layout: false })
})
router.get('/interface', (request, response) => {
    response.render('super admin/interface', { layout: false })
})

router.post('/approve-vendor', (request, response) => {
    Promise.all([a.getVendors()])
        .then((result) => {            //console.log(result[0])
            response.send(result[0])
        })
        .catch((err) => {
            response.send("Error in loading Vendor Applications")
        })
})

router.post('/approve-vendor1', (request, response) => {
    let vd_id = request.body['vd_id']
    connection.execute(`UPDATE vendor_details SET v_is_verified=2 WHERE vd_id=${vd_id}`)
    .then((result)=>{
        if(result[0]){
            console.log('yes1',result[0])
            response.send('Approved Successfully')
        }
    })
    .catch((error)=>{
        response.send("Some Error")
        console.log(error)
    })

})
router.post('/disapprove-vendor',(request, response) => {
    let vd_id = request.body['vd_id']
    console.log(vd_id)
    connection.execute(`DELETE FROM legal_documents WHERE vd_id = ${vd_id}`)
    .then((result)=>{
        if(result[0]){

            console.log('yes',result[0])
            response.send('ok')
        }
    })
    .catch((error)=>{
        response.send("Some Error")
        console.log(error)
    })
    
})


exports.default = router
