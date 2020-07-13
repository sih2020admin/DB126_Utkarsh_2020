import { Application, Request, Response, NextFunction } from 'express'
import connection from './../../database/connections/connection'

const debug = require('debug')('middleware:tender')

export function validateURLParamsApply(request: Request, response: Response, next: NextFunction) {
    if (request.query['et_id'] === undefined) {
        return response.redirect('/tenders')
    }
    next()
}

export async function validateURLParamsDApply(request: Request, response: Response, next: NextFunction) {
    let temp: any = await connection.execute(`SELECT * FROM e_tender_details WHERE et_id='${request.query['et_id']}'`)
    if (temp[0].length < 1) {
        return response.redirect('/tenders')
    }

    next()
}

export function validateURLParams(request: Request, response: Response, next: NextFunction) {
    debug('Checking whether etd_id and et_id is undefined in url')
    if (request.query['etd_id'] === undefined || request.query['et_id'] === undefined) {
        debug('etd_id and et_id is undefined')
        debug('Redirecting to Tenders Page')
        return response.redirect('/tenders')
    }
    next()
}
export async function validateURLParamsD(request: Request, response: Response, next: NextFunction) {
    debug('Debugging validateURLParamsD')
    let etd_id = request.query['etd_id'],
        et_id = request.query['et_id']
    /* console.table({ etd_id, et_id, vcd_id, vd_id }) */
    let result: any = await connection.execute(`SELECT e_tender_vendor.etd_id FROM e_tender_vendor , e_tender_details WHERE e_tender_details.et_last_date_apply >= CURRENT_DATE and e_tender_vendor.et_id=${et_id} and e_tender_vendor.etd_id=${etd_id}`)
    debug(result[0], result[0].length)
    if (result[0].length < 1) {
        debug('Found invalid et_id and etd_id')
        debug('Redirecting to Tenders Page')
        return response.redirect('/tenders')
    }
    next()
}
export async function applyTender(request: Request, response: Response, next: NextFunction) {
    let status: any = await connection.execute(`SELECT * FROM  e_tender_vendor WHERE et_id = '${request.query['et_id'].toString()}' and vd_id ='${request.signedCookies['vd_id_e']}'`)
    if (status[0].length !== 0) {
        status = status[0][0]
        let etd_id = status['etd_id']
        if (status['status'] === '100') {
            return response.redirect(`/tender/payment?et_id=${request.query['et_id']}&etd_id=${etd_id}`)
        } else if (status['status'] === '110') {
            return response.redirect(`/tender/upload-documents?et_id=${request.query['et_id']}&etd_id=${etd_id}`)
        } else if (status['status'] === '111') {
            return response.redirect(`/tender/confirmation?et_id=${request.query['et_id']}&etd_id=${etd_id}`)
        } else if (status['status'] === '1111') {
            return response.redirect(`/tender/preview?et_id=${request.query['et_id']}&etd_id=${etd_id}`)
        } else {
            return response.redirect('/tenders')
        }
    }
    next()
}

export async function confirmTender(request: Request, response: Response, next: NextFunction) {
    let status: any = await connection.execute(`SELECT * FROM  e_tender_vendor WHERE et_id = '${request.query['et_id'].toString()}' and vd_id ='${request.signedCookies['vd_id_e']}'`)
    status = status[0][0]['status']
    if (status !== '111') {
        if (status === '100') {
            return response.redirect(`/tender/payment?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`)
        } else if (status === '110') {
            return response.redirect(`/tender/upload-documents?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`)
        } else if (status === '1111') {
            return response.redirect(`/tender/preview?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`)
        } else {
            return response.redirect('/tenders')
        }
    }
    next()
}
export async function previewTender(request: Request, response: Response, next: NextFunction) {
    let status: any = await connection.execute(`SELECT * FROM  e_tender_vendor WHERE et_id = '${request.query['et_id'].toString()}' and vd_id ='${request.signedCookies['vd_id_e']}'`)
    status = status[0][0]['status']
    if (status !== '1111') {
        if (status === '100') {
            return response.redirect(`/tender/payment?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`)
        } else if (status === '110') {
            return response.redirect(`/tender/upload-documents?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`)
        } else if (status === '111') {
            return response.redirect(`/tender/confirmation?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`)
        } else {
            return response.redirect('/tenders')
        }
    }
    next()
}
