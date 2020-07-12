import { Router, Request, Response } from 'express'
import express from 'express'
import { isUser, getUserUsername } from './../miscellaneous/database/database functions/user'
import { getStates, getYears, getLegalStatus } from './../miscellaneous/database/database functions/misc'
import { getTendersList, getProfileDetails, confirmedTenderDetails,previewTenderDetails, getPaymentDetails } from './../miscellaneous/database/database functions/tender'
import connection from './../miscellaneous/database/connections/connection'
const router: Router = express.Router()
router.get('/', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request), getTendersList()])
        .then((results) => {
            response.render('user/index', {
                layout: false,
                tenders: results[1],
                user,
                username: results[0],
            })
        })
        .catch((error) => {
            console.log('Error in loading Home Page')
            console.log(error)
        })
})

router.get('/register', (request: Request, response: Response) => {
    Promise.all([getLegalStatus(), getStates(), getYears()])
        .then((result) => {
            response.render('user/register', { layout: false, status: result[0], states: result[1], years: result[2] })
        })
        .catch((error) => {
            console.log('Error in loading Register Page')
            console.log(error)
        })
})
router.get('/login', (request: Request, response: Response) => {
    response.render('user/login', { layout: false })
})

router.get('/help', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request)])
        .then((results) => {
            response.render('user/help', { layout: false, user, username: results[0] })
        })
        .catch((error) => {
            console.log('Error in loading Help Page')
            console.log(error)
        })
})

router.get('/profile', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request), getYears(), getLegalStatus(), getStates(), getProfileDetails(request)])
        .then((results) => {
            response.render('user/profile', {
                layout: false,
                user,
                username: results[0],
                years: results[1],
                status: results[2],
                states: results[3],
                company_details: results[4][0][0],
                person_details: results[4][1][0],
                my_tenders: results[4][2],
                approved_tenders: results[4][3],
            })
        })
        .catch((error) => {
            console.log('Error in loading Profile Page')
            console.log(error)
        })
})
router.get('/tenders', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request)])
        .then((results) => {
            response.render('user/tenders', { layout: false, user, username: results[0] })
        })
        .catch((error) => {
            console.log('Error in loading Tenders Page')
            console.log(error)
        })
})

router.get('/tender/apply', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request)])
        .then((results) => {
            response.render('user/tender_apply', { layout: false, user, username: results[0] })
        })
        .catch((error) => {
            console.log('Error in loading Tenders Page')
            console.log(error)
        })
})

router.get('/tender/upload-documents', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request)])
        .then((results) => {
            response.render('user/tender_sign', { layout: false, user, username: results[0] })
        })
        .catch((error) => {
            console.log('Error in loading Tenders Page')
            console.log(error)
        })
})

router.get('/tender/confirmation', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request), confirmedTenderDetails(request)])
        .then((results) => {
            results[1][2][0]['vcd'] = request.signedCookies.vcd_id_e
            response.render('user/tender_confirmation', { layout: false, user, username: results[0], tender_details: results[1][0][0], personal_details: results[1][1][0], payment_details: results[1][2][0],bid_amt:results[1][3][0] })
        })
        .catch((error) => {
            console.log('Error in loading Tenders Page')
            console.log(error)
        })
})

router.get('/tender/preview', (request: Request, response: Response) => {
    let user = isUser(request)
    let s: string
    Promise.all([getUserUsername(request),previewTenderDetails(request)])
        .then((results) => {
            console.log(results[1][4])
            response.render('user/preview', {
                layout: false,
                user,
                username: results[0],
                tender_details: results[1][0][0],
                personal_details: results[1][1][0],
                payment_details: results[1][2][0],
                misc_details: results[1][3][0],
            })
        })
        .catch((error) => {
            console.log('Error in loading Tenders Page')
            console.log(error)
        })
})
router.get('/tender/payment', (request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request), getPaymentDetails(request)])
        .then((results) => {
            console.table({value : results[1][0][0]['et_tender_fee']})
            if (results[1][0][0]['et_tender_fee'] ==='0'){
                connection.execute(`update e_tender_vendor set status=110 where et_id=${request.query["et_id"]} and etd_id=${request.query["etd_id"]}`)
                    .then((value)=>{
                        response.redirect(`/tender/upload-documents?et_id=${request.query["et_id"]}&etd_id=${request.query["etd_id"]}`)
                    })
            }else{
                response.render('user/tender-payment', { layout: false, user, username: results[0], amount: results[1][0][0]['et_tender_fee'], email: results[1][1][0]['vcd_email'], contact: results[1][1][0]['vcd_contact'] })
            }
        })
        .catch((error) => {
            console.log('Error in loading Tender Payment Page')
            console.log(error)
        })
})

router.get('/faq',(request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request)])
        .then((results)=>{
            response.render('user/faq',{layout:false,user,username: results[0]})
    })
    .catch((error) => {
        console.log('Error in loading FAQ Page')
        console.log(error)
    })
})
router.get('/privacy-policy',(request: Request, response: Response) => {
    let user = isUser(request)
    Promise.all([getUserUsername(request)])
        .then((results)=>{
            response.render('user/privacy-policy',{layout:false,user,username: results[0]})
    })
    .catch((error) => {
        console.log('Error in loading Privacy Policy Page')
        console.log(error)
    })
})
    
    

export default router
