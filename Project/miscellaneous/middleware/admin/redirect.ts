import { Request, Response, NextFunction } from 'express'
const debug = require('debug')('middleware:redirect')

export function redirectToAdminProfilePage(request: Request, response: Response, next: NextFunction) {
    if (request.url.match('/admin')){
        if (request.url.match(/\/login|/) && request.method === 'GET') {
            if (request.signedCookies['ad_id_e'] !== undefined || request.signedCookies['ad_org_id_e'] !== undefined || request.signedCookies['ad_dept_id_e'] !== undefined) {
                debug('Found cookies in request and user is accessing admin login.')
                debug('Redirecting to Admin Profile page')
                return response.redirect('/admin/profile')
            }
        }
    }
    next()
}
export function redirectToLoginPage(request: Request, response: Response, next: NextFunction) {
    /* console.table({XHR:request.xhr,accepts:request.accepts(['html','json']),value:request.headers["x-requested-with"]}) */
    if (request.url.match('/admin') === null) {
        if (request.url !== '/') {
            if (request.url.match(/\/login|\/register|\/help|\/get_files/) === null && request.method === 'GET') {
                if (request.signedCookies['vcd_id_e'] === undefined || request.signedCookies['vd_id_e'] === undefined) {
                    debug('Cookies have been deleted or modified')
                    debug('Redirecting to Login page')
                    return response.redirect('/login')
                }
            }
        }
    }
    next()
}