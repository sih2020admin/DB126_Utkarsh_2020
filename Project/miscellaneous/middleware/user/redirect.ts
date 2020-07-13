import { Request, Response, NextFunction } from 'express'
const debug = require('debug')('middleware:redirect')
export function redirectToProfilePage(request: Request, response: Response, next: NextFunction) {
    if (request.url.match('/admin') === null) {
        if (request.url.match(/\/login|\/register/)) {
            if (request.signedCookies['vcd_id_e'] !== undefined || request.signedCookies['vd_id_e'] !== undefined) {
                debug('Found cookies in request and user is accessing vendor login.')
                debug('Redirecting to Profile page')
                return response.redirect('/profile')
            }
        }
    }
    next()
}

export function redirectToLoginPage(request: Request, response: Response, next: NextFunction) {
    /* console.table({XHR:request.xhr,accepts:request.accepts(['html','json']),value:request.headers["x-requested-with"]}) */
    if (request.url.match('/admin') === null) {
        if (request.url !== '/') {
            if (request.url.match(/\/login|\/register|\/help|\/get_files|\/faq|\/feedback/) === null && request.method === 'GET') {
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
