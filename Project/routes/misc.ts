import { Router, Request, Response } from 'express'
import express from 'express'
import connection from './db'

const router: Router = express.Router()

router.post('/get-state', (request: Request, response: Response) => {
    connection.query('select st_name from states', (error:any, result:any) => {
        if (error) {
            console.log(error)
            response.send('some error in sending state names')
        } else {
            response.status(200).send(result)
        }
    })
})

router.post('/get-legal-status', (request: Request, response: Response) => {
    connection.query('select l_name from legal_status_details ', (error:any, result:any) => {
        if (error) {
            console.log(error)
            response.send('Some error in sending legal status ')
        } else {
            response.status(200).send(result)
        }
    })
})

router.post('/get-department', (request: Request, response: Response) => {
    connection.query('select dept_name from department ', (error:any, result:any) => {
        if (error) {
            console.log(error)
            response.send('Some error in sending Department ')
        } else {
            let filtered_result = []
            for (let i = 1; i < result.length; i++) {
                filtered_result.push(result[i])
            }
            response.status(200).send(filtered_result)
        }
    })
})

router.post('/get-city', (request: Request, response: Response) => {
    const state_code = request.body.state_code
    connection.query(`select c_name from city inner join states on city.st_id=states.st_id where st_name='${state_code}'`, (error:any, result:any) => {
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
    connection.query(`SELECT * FROM log_in_details WHERE user_name='${username}'`, (error:any, result:any) => {
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
    connection.query(`SELECT * FROM vendor_details where v_gst='${gst_register_number}'`, (error:any, result:any) => {
        if (error) {
            console.log(error)
            console.log('Error in getting GST Register Number')
        } else {
            if (result.length !== 0) {
                result1 = result1 + 'GST Register Number Already Exists<br>'
            }
            connection.query(`SELECT * FROM vendor_details where v_pan='${pan_number}'`, (error:any, result:any) => {
                if (error) {
                    console.log('Error in getting Pan Number')
                } else {
                    if (result.length !== 0) {
                        result1 = result1 + 'Pan Number Already Exists<br>'
                    }
                    connection.query(`SELECT * FROM vendor_details where v_reg_no='${registration_number}'`, (error:any, result:any) => {
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

export default router
