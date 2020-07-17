"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KEY=process.env["ENCRYPTION_KEY"];
exports.getPaymentDetails = exports.previewTenderDetails = exports.confirmedTenderDetails = exports.applyTenderDetails = exports.getProfileDetails = exports.getTendersList = void 0;
const connection_1 = __importDefault(require("./../connections/connection"));
async function getTendersList() {
    let tenders = await connection_1.default.execute('SELECT `et_id`, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `dept_name` FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.et_last_date_apply >= CURRENT_DATE');
    return tenders[0];
}
exports.getTendersList = getTendersList;
async function getProfileDetails(request) {
    var vd_id = request.signedCookies.vd_id_e;
    var vcd_id = request.signedCookies.vcd_id_e;
    let profile = await connection_1.default.query(` SELECT v_name, v_address, v_yoe, v_email, v_mobile, v_reg_no, v_state_id, v_city_id, v_pincode, v_legal_id, v_pan, v_is_verified, v_gst FROM vendor_details WHERE vd_id = '${vd_id}';
                                                SELECT vcd_name, vcd_title, vcd_dob, vcd_aadhar, vcd_contact, vcd_email, vcd_designation FROM v_contact_details WHERE vcd_id = ${vcd_id} and vd_id = ${vd_id};
                                                SELECT e_tender_vendor.etd_id,e_tender_vendor.et_id ,et_title, et_tender_fee, et_tender_ref_no, et_tender_desc, et_last_date_apply, et_bidding_date, et_file_uri, dept_id, cast( AES_DECRYPT(e_tender_vendor.bidding_amt ,"${KEY}") as char ) as bidding_amt FROM e_tender_details INNER JOIN e_tender_vendor ON e_tender_details.et_id = e_tender_vendor.et_id WHERE e_tender_vendor.vd_id = '${vd_id}' and e_tender_vendor.vcd_id = '${vcd_id}';
                                                SELECT e_tender_details.et_id, et_title, et_tender_fee, et_tender_ref_no, et_tender_desc, et_last_date_apply, et_bidding_date, et_file_uri, dept_id, cast( AES_DECRYPT(e_tender_vendor.bidding_amt ,"${KEY}") as char ) as bidding_amt FROM e_tender_details INNER JOIN e_tender_vendor ON e_tender_details.et_id = e_tender_vendor.et_id WHERE e_tender_vendor.vd_id = '${vd_id}' and e_tender_vendor.vcd_id = '${vcd_id}' and cast( AES_DECRYPT(e_tender_vendor.is_approved,"${KEY}") as char ) ="1"; 

    `);
    return profile[0];
}
exports.getProfileDetails = getProfileDetails;
async function applyTenderDetails(request) {
    let tender_details = await connection_1.default.query(`SELECT * FROM  e_tender_details INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE et_id = ${request.query['et_id']} ; SELECT  vcd_name, vcd_title, vcd_dob,vcd_aadhar,vcd_contact, vcd_email, vcd_designation FROM v_contact_details WHERE vcd_id=${request.signedCookies['vcd_id_e']}; SELECT v_name, v_address, v_yoe, v_email, v_mobile, v_reg_no, v_state_id, v_dist_id, v_city_id, v_pincode, v_legal_id, v_pan, v_is_verified, v_gst FROM vendor_details WHERE vd_id=${request.signedCookies['vd_id_e']}`);
    return tender_details[0];
}
exports.applyTenderDetails = applyTenderDetails;
async function confirmedTenderDetails(request) {
    let temp = await connection_1.default.query(`SELECT et_id,et_title,et_tender_fee,et_tender_ref_no,et_bidding_date FROM  e_tender_details WHERE et_id = '${request.query['et_id']}';
                                            SELECT * FROM (SELECT vendor_details.vd_id,vcd_name ,vcd_dob ,vcd_aadhar,vcd_contact,vcd_email,vcd_designation,v_name,v_address,v_yoe,v_email,v_mobile,v_reg_no,v_legal_id,v_pan,v_gst FROM v_contact_details,vendor_details WHERE v_contact_details.vd_id=vendor_details.vd_id) AS hello WHERE vd_id= '${request.signedCookies['vd_id_e']}';
                                            SELECT * FROM (SELECT file_uri.etd_id, cast( AES_DECRYPT(file_uri.furi1 ,"${KEY}") as char ) as furi1 ,cast( AES_DECRYPT(file_uri.furi2 ,"${KEY}") as char ) as furi2,txn_id,txn_amount,txn_timestamp,bank_name ,resp_message FROM file_uri,payment_transactions WHERE file_uri.etd_id=payment_transactions.etd_id) AS hello WHERE etd_id= '${request.query['etd_id']}';
                                            SELECT cast( AES_DECRYPT(e_tender_vendor.bidding_amt ,"${KEY}") as char ) as bidding_amt from e_tender_vendor WHERE et_id = '${request.query['et_id']}' and etd_id = '${request.query['etd_id']}'
                                            `);
    return temp[0];
}
exports.confirmedTenderDetails = confirmedTenderDetails;
async function previewTenderDetails(request) {
    let temp = await connection_1.default.query(`SELECT et_id,et_title,et_tender_fee,et_tender_ref_no,et_bidding_date FROM  e_tender_details WHERE et_id = '${request.query['et_id']}';
                                            SELECT * FROM (SELECT vendor_details.vd_id,vcd_name ,vcd_dob ,vcd_aadhar,vcd_contact,vcd_email,vcd_designation,v_name,v_address,v_yoe,v_email,v_mobile,v_reg_no,v_legal_id,v_pan,v_gst FROM v_contact_details,vendor_details WHERE v_contact_details.vd_id=vendor_details.vd_id) AS hello WHERE vd_id= '${request.signedCookies['vd_id_e']}';
                                            SELECT * FROM (SELECT file_uri.etd_id,cast( AES_DECRYPT(file_uri.furi1 ,"${KEY}") as char ) as furi1 ,cast( AES_DECRYPT(file_uri.furi2 ,"${KEY}") as char ) as furi2,txn_id,txn_amount,txn_timestamp,bank_name ,resp_message FROM file_uri,payment_transactions WHERE file_uri.etd_id=payment_transactions.etd_id) AS hello WHERE etd_id= '${request.query['etd_id']}';
                                            SELECT cast( AES_DECRYPT(e_tender_vendor.bidding_amt ,"${KEY}") as char ) as bidding_amt,cast( AES_DECRYPT(location ,"${KEY}") as char ) as location,timestamp from e_tender_vendor WHERE vd_id='${request.signedCookies['vd_id_e']}' and vcd_id='${request.signedCookies['vcd_id_e']}'and etd_id='${request.query['etd_id']}' and et_id='${request.query['et_id']}'`);
    return temp[0];
}
exports.previewTenderDetails = previewTenderDetails;
async function getPaymentDetails(request) {
    let temp = await connection_1.default.query(`SELECT et_tender_fee FROM  e_tender_details INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE et_id = '${request.query['et_id']}';
                                            SELECT vcd_contact,vcd_email FROM v_contact_details where vcd_id='${request.signedCookies['vcd_id_e']}'`);
    return temp[0];
}
exports.getPaymentDetails = getPaymentDetails;
