import { Router, Request, Response } from 'express'
import express from 'express'
import { isAdmin, getAdminUsername } from './../miscellaneous/database/database functions/user'
import { getAdminDetails, getApprovedTenders } from './../miscellaneous/database/database functions/admin'
const router: Router = express.Router()

router.get('/login', (request: Request, response: Response) => {
    response.render('admin/login', { layout: false })
})

router.get('/dashboard', (request: Request, response: Response) => {
    let admin = isAdmin(request)
    Promise.all([getAdminUsername(request)]).then((results) => {
        response.render('admin/dashboard', { layout: false, admin, username: results[0] })
    })
})

router.get('/profile', (request: Request, response: Response) => {
    let admin = isAdmin(request)
    Promise.all([getAdminUsername(request), getAdminDetails(request), getApprovedTenders(request)]).then((results) => {
        response.render('admin/profile', { layout: false, admin, username: results[0], admin1: results[1][0], tenders: results[2] })
    })
})

router.get('/tenders/list', (request: Request, response: Response) => {
    let admin = isAdmin(request)
    Promise.all([getAdminUsername(request)]).then((results) => {
        response.render('admin/tenders-list', { layout: false, admin, username: results[0] })
    })
})

router.get('/application/approve', (request: Request, response: Response) => {
    let admin = isAdmin(request)
    Promise.all([getAdminUsername(request)]).then((results) => {
        response.render('admin/application-approve', { layout: false, admin, username: results[0] })
    })
})

router.get('/help', (request: Request, response: Response) => {
    let admin = isAdmin(request)
    Promise.all([getAdminUsername(request)]).then((results) => {
        response.render('admin/help', { layout: false, admin, username: results[0] })
    })
})

export default router
