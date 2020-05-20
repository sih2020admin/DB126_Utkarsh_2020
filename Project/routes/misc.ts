import { Router, Request, Response, request } from 'express'
import { Connection } from 'mysql'
import express from 'express'
import connection from './db'

const router: Router = express.Router()

router.post('/get-state', (request: Request, response: Response) => {
    connection.query('select * from states', (error, result) => {
        if (error) {
            console.log(error)
            response.send('some error in sending state names')
        } else {
            response.status(200).send(result)
        }
    })
})

router.post('/get-legal-status', (request: Request, response: Response) => {
    connection.query('select * from legal_status_details ', (error, result) => {
        if (error) {
            console.log(error)
            response.send('Some error in sending legal status ')
        } else {
            response.status(200).send(result)
        }
    })
})

router.post('/get-city', (request: Request, response: Response) => {
    const state_code = request.body.state_code
    connection.query('select * from city where st_id=?', [state_code], (error, result) => {
        if (error) {
            console.log(error)
            response.status(400).send('Some error in sending legal status ')
        } else {
            response.status(200).send(result)
        }
    })
})

router.post('/check-username', (request: Request, response: Response) => {
    let username = request.body.username
    connection.query(`SELECT * FROM log_in_details WHERE user_name='${username}'`, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            if (result.length !== 0) {
                response.send('Username already exists<br>Use a different Username')
            } else {
                response.send('ok')
            }
        }
    })
})

router.post('/check-company', (request: Request, response: Response) => {
    let gst_register_number = request.body.gst_register_number
    let pan_number = request.body.pan_number
    let registration_number = request.body.registration_number
    var result1: string = ''
    connection.query(`SELECT * FROM vendor_details where v_gst='${gst_register_number}'`, (error, result) => {
        if (error) {
            console.log(error)
            console.log('Error in getting GST Register Number')
        } else {
            if (result.length !== 0) {
                result1 = result1 + 'GST Register Number Already Exists<br>'
            }
            connection.query(`SELECT * FROM vendor_details where v_pan='${pan_number}'`, (error, result) => {
                if (error) {
                    console.log('Error in getting Pan Number')
                } else {
                    if (result.length !== 0) {
                        result1 = result1 + 'Pan Number Already Exists<br>'
                    }
                    connection.query(`SELECT * FROM vendor_details where v_reg_no='${registration_number}'`, (error, result) => {
                        if (error) {
                            console.log('Error in getting Register Number')
                        } else {
                            if (result.length !== 0) {
                                result1 = result1 + 'Registration Number Already Exists<br>'
                            }
                            response.send(result1)
                        }
                    })
                }
            })
        }
    })

})

function check_company(gst_register_number: string, pan_number: string, registration_number: string) {
    

    //return result1
}

export default router
