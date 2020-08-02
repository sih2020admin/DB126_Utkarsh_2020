"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

exports.numberOfVendorsRegistered = exports.getCountOfApplicationsOfVendorPerDepartment = exports.getTotalCountOfApplicationsOfVendor = exports.getCountOfApplicationsPerTenderByStatus = exports.getAmountDifference = exports.getApplicationsWhichPassedFirstStage = exports.getCountOfApplicationsPerTender = void 0;
const connection_1 = __importDefault(require("./../connections/connection"));
var key = process.env['ENCRYPTION_KEY'];



//Admin Stats
// returns tender details and number of application swhich have status as 1111
async function getCountOfApplicationsPerTender(request) {
    let applications = await connection_1.default.execute(`SELECT et_id,title,reference,description,COUNt(*) as Count FROM (SELECT etv.et_id,etd.et_tender_ref_no as Reference,etd.et_title as Title,et_tender_desc as Description FROM e_tender_vendor etv INNER JOIN e_tender_details etd ON etv.et_id = etd.et_id WHERE etv.status = AES_ENCRYPT(1111,'${process.env.ENCRYPTION_KEY}') AND etd.dept_id ='${request.signedCookies['ad_dept_id_e']}') p GROUP BY et_id`);
    return applications[0];
}
exports.getCountOfApplicationsPerTender = getCountOfApplicationsPerTender;


// returns number of applications which have passed Stage one
async function getApplicationsWhichPassedFirstStage(request) {
    let application = await connection_1.default.execute(`SELECT et_id,title,reference,description,COUNT(*) as Count from (SELECT etv.et_id,etd.et_title as title,etd.et_tender_desc as description,etd.et_tender_ref_no as reference FROM e_tender_vendor etv INNER JOIN e_tender_details etd ON etv.et_id=etd.et_id WHERE etd.dept_id='${request.signedCookies['ad_dept_id_e']}' AND (etv.is_approved=AES_ENCRYPT(1,'${process.env.ENCRYPTION_KEY}'))) p GROUP BY et_id`);
    return application[0];
}
exports.getApplicationsWhichPassedFirstStage = getApplicationsWhichPassedFirstStage;


//Difference between  Min/Max bidding amount and actual bid amount of vendor selected for that project
async function getAmountDifference() {
    let temp = await connection_1.default.execute(`SELECT etv.et_id,(AES_DECRYPT(etv.bidding_amt ,'${process.env.ENCRYPTION_KEY}'))as bid_amount , e.maximum_bid from e_tender_details as e , e_tender_vendor as etv where etv.is_approved = AES_ENCRYPT("3" , '${process.env.ENCRYPTION_KEY}') and etv.et_id=e.et_id`);
    return temp[0];
}
exports.getAmountDifference = getAmountDifference;


async function getCountOfApplicationsPerTenderByStatus(request) {
    let d = '178';
    let temp = await connection_1.default.query(`SELECT 'second' as OnStage,et_id,count(status) as count,cast(status as char) as status FROM e_tender_vendor WHERE et_id='${d}' AND status=AES_ENCRYPT(100,'${process.env.ENCRYPTION_KEY}');
    SELECT 'third' as OnStage,et_id,count(status) as count,cast(status as char) as status FROM e_tender_vendor WHERE et_id='${d}' AND status=AES_ENCRYPT(110,'${process.env.ENCRYPTION_KEY}');
    SELECT 'fourth' as OnStage,et_id,count(status) as count,cast(status as char) as status FROM e_tender_vendor WHERE et_id='${d}' AND status=AES_ENCRYPT(111,'${process.env.ENCRYPTION_KEY}');
    SELECT 'finished' as OnStage,et_id,count(status) as count,cast(status as char) as status FROM e_tender_vendor WHERE et_id='${d}' AND status=AES_ENCRYPT(1111,'${process.env.ENCRYPTION_KEY}')
    `);
    return temp[0];
}
exports.getCountOfApplicationsPerTenderByStatus = getCountOfApplicationsPerTenderByStatus;


//Vendor Stats
//gives count of all the applications of a particular vendor
async function getTotalCountOfApplicationsOfVendor(request) {
    let count = await connection_1.default.execute(`SELECT count(etv.etd_id) as total_count FROM e_tender_vendor as etv where etv.vd_id='${request.signedCookies['vd_id_e']}'`);
    return count[0];
}
exports.getTotalCountOfApplicationsOfVendor = getTotalCountOfApplicationsOfVendor;


//gives count of applications per department of a particular vendor
async function getCountOfApplicationsOfVendorPerDepartment(request) {
    let count = await connection_1.default.execute(`SELECT d.dept_name,e.dept_id  ,count(etd_id) as total_count_department_wise , sum(cast( AES_DECRYPT(etv.bidding_amt ,'${key}') as char )) as total_cost_departmentwise FROM e_tender_vendor as etv , e_tender_details as e , department as d where etv.vd_id='${request.signedCookies['vd_id_e']}' and e.et_id=etv.et_id  and d.dept_id=e.dept_id GROUP BY e.dept_id`);
    console.log(count[0]);
    return count[0];
}
exports.getCountOfApplicationsOfVendorPerDepartment = getCountOfApplicationsOfVendorPerDepartment;

async function getTotalCountOfApplicationsOfVendor_dept(request) {
    let count = await connection_1.default.execute(`SELECT d.dept_id, d.dept_name ,count(etv.etd_id) as total_count_dept FROM e_tender_vendor as etv ,e_tender_details as e, department as d  where etv.vd_id='${request.signedCookies['vd_id_e']}' and etv.et_id=e.et_id and d.dept_id=e.dept_id GROUP BY (e.dept_id);`);
    return count[0];
}
exports.getTotalCountOfApplicationsOfVendor_dept = getTotalCountOfApplicationsOfVendor_dept;


//System Stats
//gets total number of vendors registered
async function numberOfVendorsRegistered() {
    let count = await connection_1.default.execute(`SELECT count(vd_id) as total_vendors_registred FROM vendor_details`);
    return count[0];
}
exports.numberOfVendorsRegistered = numberOfVendorsRegistered;
