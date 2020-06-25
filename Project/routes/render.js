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
var express_1 = __importDefault(require("express"));
var connection_1 = __importDefault(require("./../database/connections/connection"));
var router = express_1.default.Router();
function get_tenders() {
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
function is_user(request) {
    if (request.signedCookies.vcd_id_e) {
        return true;
    }
    else {
        return false;
    }
}
function get_username(request) {
    return __awaiter(this, void 0, void 0, function () {
        var username_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(request.signedCookies.vcd_id_e !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, connection_1.default.execute("Select user_name from log_in_details where vcd_id='" + request.signedCookies.vcd_id_e + "'")];
                case 1:
                    username_1 = _a.sent();
                    return [2 /*return*/, JSON.parse(JSON.stringify(username_1[0]))[0]['user_name']];
                case 2: return [2 /*return*/, ''];
            }
        });
    });
}
function get_state() {
    return __awaiter(this, void 0, void 0, function () {
        var states;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute('select st_name from states')];
                case 1:
                    states = _a.sent();
                    return [2 /*return*/, states[0]];
            }
        });
    });
}
function get_legal_status() {
    return __awaiter(this, void 0, void 0, function () {
        var legal_status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute('select l_name from legal_status_details')];
                case 1:
                    legal_status = _a.sent();
                    return [2 /*return*/, legal_status[0]];
            }
        });
    });
}
function get_years() {
    return __awaiter(this, void 0, void 0, function () {
        var years, end_year, current_year, i;
        return __generator(this, function (_a) {
            years = [];
            end_year = 1700;
            current_year = new Date().getFullYear();
            for (i = current_year; i >= end_year; i--) {
                years.push(i);
            }
            return [2 /*return*/, years];
        });
    });
}
router.get('/', function (request, response) {
    var user = is_user(request);
    Promise.all([get_username(request), get_tenders()])
        .then(function (results) {
        response.render('user/index', { layout: false, tenders: results[1], user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Home Page');
        console.log(error);
    });
});
router.get('/register', function (request, response) {
    Promise.all([get_legal_status(), get_state(), get_years()])
        .then(function (result) {
        response.render('user/register', { layout: false, status: result[0], states: result[1], years: result[2] });
    })
        .catch(function (error) {
        console.log('Error in loading Register Page');
        console.log(error);
    });
});
router.get('/login', function (request, response) {
    response.render('user/login', { layout: false });
});
router.get('/help', function (request, response) {
    var user = is_user(request);
    Promise.all([get_username(request)]).then(function (results) {
        response.render('user/help', { layout: false, user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Help Page');
        console.log(error);
    });
});
router.get('/profile', function (request, response) {
    var user = is_user(request);
    Promise.all([get_username(request)]).then(function (results) {
        response.render('user/profile', { layout: false, user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Profile Page');
        console.log(error);
    });
});
router.get('/tenders', function (request, response) {
    var user = is_user(request);
    Promise.all([get_username(request)])
        .then(function (results) {
        response.render('user/tenders', { layout: false, user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Tenders Page');
        console.log(error);
    });
});
exports.default = router;
