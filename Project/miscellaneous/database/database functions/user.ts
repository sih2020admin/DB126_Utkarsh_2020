import { Request } from 'express'
import connection from './../connections/connection'
export function isUser(request: Request) {
    if (request.signedCookies['vcd_id_e']) {
        return true
    } else {
        return false
    }
}
export async function getUserUsername(request: Request) {
    if (request.signedCookies['vcd_id_e'] !== undefined) {
        let username: any = await connection.execute(`Select user_name from log_in_details where vcd_id='${request.signedCookies.vcd_id_e}'`)
        return JSON.parse(JSON.stringify(username[0]))[0]['user_name']
    } else {
        return ''
    }
}

export function isAdmin(request: Request) {
    if (request.signedCookies['ad_id_e'] !== undefined) {
        return true
    } else {
        return false
    }
}

export async function getAdminUsername(request: Request) {
    if (request.signedCookies['ad_id_e'] !== undefined) {
        let username: any = await connection.execute(`Select user_name from log_in_details where ad_id='${request.signedCookies['ad_id_e']}'`)
        return JSON.parse(JSON.stringify(username[0]))[0]['user_name']
    } else {
        return ''
    }
}
