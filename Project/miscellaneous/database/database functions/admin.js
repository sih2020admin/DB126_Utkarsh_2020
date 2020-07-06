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
exports.getApprovedTenders = exports.getAdminDetails = void 0;
var connection_1 = __importDefault(require("./../connections/connection"));
function getAdminDetails(request) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute("SELECT a.ad_name,a.ad_contact, a.ad_email, a.ad_addr, o.org_name, o.org_contact , o.org_email , o.org_addr, o.org_state , o.org_dist ,o.org_pin ,d.dept_name FROM admin_detail as a INNER JOIN org_details as o ON a.ad_dept_id = o.org_id INNER JOIN department as d ON a.ad_dept_id=d.dept_id WHERE ad_id =" + request.signedCookies['ad_id_e'])];
                case 1:
                    temp = _a.sent();
                    return [2 /*return*/, temp[0]];
            }
        });
    });
}
exports.getAdminDetails = getAdminDetails;
function getApprovedTenders(request) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute("SELECT e.etd_id, e.et_id, e.vd_id, e.vcd_id, e.bidding_amt, e.is_approved, e.date_of_approval ,et.et_title,et.et_tender_fee,et.et_tender_ref_no,et.et_tender_desc,et.et_last_date_apply ,et.et_bidding_date ,et.et_file_uri, v.v_name, v.v_address, v.v_yoe, v.v_email, v.v_mobile, v.v_reg_no, v.v_state_id, v.v_dist_id, v.v_city_id, v.v_pincode, v.v_legal_id, v.v_pan, v.v_is_verified, v.v_gst ,vc.vcd_name,vc.vcd_title,vc.vcd_dob,vc.vcd_aadhar , vc.vcd_contact,vc.vcd_email,vc.vcd_email,vc.vcd_designation, f.furi_id, f.furi1,f.furi2, f.f_type , p.txn_id , p.order_id ,p.txn_amount , p.resp_message , p.resp_code,p.refund_amount , p.txn_timestamp , p.bank_txn_id , p.gateway_name , p.bank_name , p.payment_mode  FROM e_tender_vendor as e INNER JOIN e_tender_details as et ON et.et_id=e.et_id INNER JOIN vendor_details as v ON e.vd_id=v.vd_id INNER JOIN v_contact_details as vc ON e.vcd_id = vc.vcd_id INNER JOIN file_uri as f ON e.etd_id=f.etd_id INNER JOIN payment_transactions as p ON p.etd_id = e.etd_id WHERE et.is_approved=\"1\" and et.dept_id = " + request.signedCookies['ad_dept_id_e'])];
                case 1:
                    temp = _a.sent();
                    return [2 /*return*/, temp[0]];
            }
        });
    });
}
exports.getApprovedTenders = getApprovedTenders;
