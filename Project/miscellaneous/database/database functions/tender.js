"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentDetails = exports.confirmedTenderDetails = exports.getProfileDetails = exports.getTendersList = void 0;
var connection_1 = __importDefault(require("./../connections/connection"));
function getTendersList() {
    return __awaiter(this, void 0, void 0, function () {
        var tenders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute('SELECT `et_id`, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `dept_name` FROM `e_tender_details` INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE is_delete = 0 and e_tender_details.et_last_date_apply >= CURRENT_DATE')];
                case 1:
                    tenders = _a.sent();
                    return [2 /*return*/, tenders[0]];
            }
        });
    });
}
exports.getTendersList = getTendersList;
function getProfileDetails(request) {
    return __awaiter(this, void 0, void 0, function () {
        var vd_id, vcd_id, profile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vd_id = request.signedCookies.vd_id_e;
                    vcd_id = request.signedCookies.vcd_id_e;
                    return [4 /*yield*/, connection_1.default.query(" SELECT v_name, v_address, v_yoe, v_email, v_mobile, v_reg_no, v_state_id, v_city_id, v_pincode, v_legal_id, v_pan, v_is_verified, v_gst FROM vendor_details WHERE vd_id = '" + vd_id + "';\n                                                SELECT vcd_name, vcd_title, vcd_dob, vcd_aadhar, vcd_contact, vcd_email, vcd_designation FROM v_contact_details WHERE vcd_id = " + vcd_id + " and vd_id = " + vd_id + ";\n                                                SELECT e_tender_vendor.etd_id,e_tender_vendor.et_id ,et_title, et_tender_fee, et_tender_ref_no, et_tender_desc, et_last_date_apply, et_bidding_date, et_file_uri, dept_id, e_tender_vendor.bidding_amt FROM e_tender_details INNER JOIN e_tender_vendor ON e_tender_details.et_id = e_tender_vendor.et_id WHERE e_tender_vendor.vd_id = '" + vd_id + "' and e_tender_vendor.vcd_id = '" + vcd_id + "';\n                                                SELECT e_tender_details.et_id, et_title, et_tender_fee, et_tender_ref_no, et_tender_desc, et_last_date_apply, et_bidding_date, et_file_uri, dept_id, e_tender_vendor.bidding_amt FROM e_tender_details INNER JOIN e_tender_vendor ON e_tender_details.et_id = e_tender_vendor.et_id WHERE e_tender_vendor.vd_id = '" + vd_id + "' and e_tender_vendor.vcd_id = '" + vcd_id + "' and e_tender_vendor.is_approved =1; \n\n    ")];
                case 1:
                    profile = _a.sent();
                    return [2 /*return*/, profile[0]];
            }
        });
    });
}
exports.getProfileDetails = getProfileDetails;
function confirmedTenderDetails(request) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.query("SELECT et_id,et_title,et_tender_fee,et_tender_ref_no,et_bidding_date FROM  e_tender_details WHERE et_id = '" + request.query['et_id'] + "';\n                                            SELECT * FROM (SELECT vendor_details.vd_id,vcd_name ,vcd_dob ,vcd_aadhar,vcd_contact,vcd_email,vcd_designation,v_name,v_address,v_yoe,v_email,v_mobile,v_reg_no,v_legal_id,v_pan,v_gst FROM v_contact_details,vendor_details WHERE v_contact_details.vd_id=vendor_details.vd_id) AS hello WHERE vd_id= '" + request.signedCookies['vd_id_e'] + "';\n                                            SELECT * FROM (SELECT file_uri.etd_id,furi1,furi2,txn_id,txn_amount,txn_timestamp,bank_name ,resp_message FROM file_uri,payment_transactions WHERE file_uri.etd_id=payment_transactions.etd_id) AS hello WHERE etd_id= '" + request.query['etd_id'] + "';\n                                            SELECT location,timestamp from e_tender_vendor WHERE vd_id='" + request.signedCookies['vd_id_e'] + "' and vcd_id='" + request.signedCookies['vcd_id_e'] + "'and etd_id='" + request.query['etd_id'] + "' and et_id='" + request.query['et_id'] + "'")];
                case 1:
                    temp = _a.sent();
                    return [2 /*return*/, temp[0]];
            }
        });
    });
}
exports.confirmedTenderDetails = confirmedTenderDetails;
function getPaymentDetails(request) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.query("SELECT et_tender_fee FROM  e_tender_details INNER JOIN department ON e_tender_details.dept_id = department.dept_id WHERE et_id = '" + request.query['et_id'] + "';\n                                            SELECT vcd_contact,vcd_email FROM v_contact_details where vcd_id='" + request.signedCookies['vcd_id_e'] + "'")];
                case 1:
                    temp = _a.sent();
                    console.log(temp[0]);
                    return [2 /*return*/, temp[0]];
            }
        });
    });
}
exports.getPaymentDetails = getPaymentDetails;
