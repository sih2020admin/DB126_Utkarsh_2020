"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileURL = exports.profileStatus = void 0;
function profileStatus(status) {
    if (status === null) {
        return 'Error in Fetching Application Status';
    }
    else if (status === '100') {
        return 'Application on Payment Step';
    }
    else if (status === '110') {
        return 'Application on E-Signing Step';
    }
    else if (status === '111') {
        return 'Application on Confirmation Step';
    }
    else if (status === '1111') {
        return 'Application Submitted';
    }
    else {
        return status;
    }
}
exports.profileStatus = profileStatus;
function profileURL(status, et_id, etd_id) {
    //return `${status},${et_id},${etd_id}`
    if (status === null) {
        return '#';
    }
    else if (status === '100') {
        return `/tender/payment?et_id=${et_id}&etd_id=${etd_id}`;
    }
    else if (status === '110') {
        return `/tender/upload-documents?et_id=${et_id}&etd_id=${etd_id}`;
    }
    else if (status === '111') {
        return `/tender/confirmation?et_id=${et_id}&etd_id=${etd_id}`;
    }
    else if (status === '1111') {
        return `/tender/preview?et_id=${et_id}&etd_id=${etd_id}`;
    }
    else {
        return status;
    }
}
exports.profileURL = profileURL;
