"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewTender = exports.confirmTender = exports.applyTender = exports.validateURLParamsD = exports.validateURLParams = void 0;
const connection_1 = __importDefault(require("./../../database/connections/connection"));
const debug = require('debug')('middleware:tender');
function validateURLParams(request, response, next) {
    debug('Checking whether etd_id and et_id is undefined in url');
    if (request.query['etd_id'] === undefined || request.query['et_id'] === undefined) {
        debug('etd_id and et_id is undefined');
        debug('Redirecting to Tenders Page');
        return response.redirect('/tenders');
    }
    next();
}
exports.validateURLParams = validateURLParams;
async function validateURLParamsD(request, response, next) {
    debug('Debugging validateURLParamsD');
    let etd_id = request.query['etd_id'], et_id = request.query['et_id'];
    /* console.table({ etd_id, et_id, vcd_id, vd_id }) */
    let result = await connection_1.default.execute(`SELECT e_tender_vendor.etd_id FROM e_tender_vendor , e_tender_details WHERE e_tender_details.et_last_date_apply >= CURRENT_DATE and e_tender_vendor.et_id=${et_id} and e_tender_vendor.etd_id=${etd_id}`);
    debug(result[0], result[0].length);
    if (result[0].length < 1) {
        debug('Found invalid et_id and etd_id');
        debug('Redirecting to Tenders Page');
        return response.redirect('/tenders');
    }
    next();
}
exports.validateURLParamsD = validateURLParamsD;
async function applyTender(request, response, next) {
    let status = await connection_1.default.execute(`SELECT * FROM  e_tender_vendor WHERE et_id = '${request.query['et_id'].toString()}' and vd_id ='${request.signedCookies['vd_id_e']}'`);
    if (status[0].length !== 0) {
        status = status[0][0];
        console.log(status, status['etd_id']);
        let etd_id = status['etd_id'];
        console.log(etd_id);
        if (status['status'] === '100') {
            return response.redirect(`/tender/payment?et_id=${request.query['et_id']}&etd_id=${etd_id}`);
        }
        else if (status['status'] === '110') {
            return response.redirect(`/tender/upload-documents?et_id=${request.query['et_id']}&etd_id=${etd_id}`);
        }
        else if (status['status'] === '111') {
            return response.redirect(`/tender/confirmation?et_id=${request.query['et_id']}&etd_id=${etd_id}`);
        }
        else if (status['status'] === '1111') {
            return response.redirect(`/tender/preview?et_id=${request.query['et_id']}&etd_id=${etd_id}`);
        }
        else {
            return response.redirect('/tenders');
        }
    }
    next();
}
exports.applyTender = applyTender;
async function confirmTender(request, response, next) {
    let status = await connection_1.default.execute(`SELECT * FROM  e_tender_vendor WHERE et_id = '${request.query['et_id'].toString()}' and vd_id ='${request.signedCookies['vd_id_e']}'`);
    status = status[0][0]['status'];
    if (status !== '111') {
        if (status === '100') {
            return response.redirect(`/tender/payment?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`);
        }
        else if (status === '110') {
            return response.redirect(`/tender/upload-documents?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`);
        }
        else if (status === '1111') {
            return response.redirect(`/tender/preview?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`);
        }
        else {
            return response.redirect('/tenders');
        }
    }
    next();
}
exports.confirmTender = confirmTender;
async function previewTender(request, response, next) {
    let status = await connection_1.default.execute(`SELECT * FROM  e_tender_vendor WHERE et_id = '${request.query['et_id'].toString()}' and vd_id ='${request.signedCookies['vd_id_e']}'`);
    status = status[0][0]['status'];
    if (status !== '1111') {
        if (status === '100') {
            return response.redirect(`/tender/payment?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`);
        }
        else if (status === '110') {
            return response.redirect(`/tender/upload-documents?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`);
        }
        else if (status === '111') {
            return response.redirect(`/tender/confirmation?et_id=${request.query['et_id']}&etd_id=${request.query['etd_id']}`);
        }
        else {
            return response.redirect('/tenders');
        }
    }
    next();
}
exports.previewTender = previewTender;
