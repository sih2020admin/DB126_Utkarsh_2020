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
exports.previewTender = exports.confirmTender = exports.documentTender = exports.applyTender = exports.validateURLParamsD = exports.validateURLParams = void 0;
var connection_1 = __importDefault(require("./../../database/connections/connection"));
var debug = require('debug')('middleware:tender');
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
function validateURLParamsD(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var etd_id, et_id, vcd_id, vd_id, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debug('Debugging validateURLParamsD');
                    etd_id = request.query['etd_id'], et_id = request.query['et_id'], vcd_id = request.signedCookies['vcd_id_e'], vd_id = request.signedCookies['vd_id_e'];
                    return [4 /*yield*/, connection_1.default.execute("SELECT * from e_tender_vendor WHERE vcd_id='" + vcd_id + "' and vd_id='" + vd_id + "' and etd_id='" + etd_id + "' and et_id ='" + et_id + "'")];
                case 1:
                    result = _a.sent();
                    if (result[0].length !== 1) {
                        debug('Found invalid et_id and etd_id');
                        debug('Redirecting to Tenders Page');
                        return [2 /*return*/, response.redirect('/tenders')];
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.validateURLParamsD = validateURLParamsD;
function applyTender(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var status, etd_id_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute("SELECT * FROM  e_tender_vendor WHERE et_id = '" + request.query['et_id'].toString() + "' and vd_id ='" + request.signedCookies['vd_id_e'] + "'")];
                case 1:
                    status = _a.sent();
                    if (status[0].length !== 0) {
                        status = status[0][0];
                        console.log(status, status['etd_id']);
                        etd_id_1 = status['etd_id'];
                        console.log(etd_id_1);
                        if (status['status'] === '100') {
                            return [2 /*return*/, response.redirect("/tender/payment?et_id=" + request.query['et_id'] + "&etd_id=" + etd_id_1)];
                        }
                        else if (status['status'] === '110') {
                            return [2 /*return*/, response.redirect("/tender/upload-documents?et_id=" + request.query['et_id'] + "&etd_id=" + etd_id_1)];
                        }
                        else if (status['status'] === '111') {
                            return [2 /*return*/, response.redirect("/tender/confirmation?et_id=" + request.query['et_id'] + "&etd_id=" + etd_id_1)];
                        }
                        else if (status['status'] === '1111') {
                            return [2 /*return*/, response.redirect("/tender/preview?et_id=" + request.query['et_id'] + "&etd_id=" + etd_id_1)];
                        }
                        else {
                            return [2 /*return*/, response.redirect('/tenders')];
                        }
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.applyTender = applyTender;
function documentTender(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute("SELECT * FROM  e_tender_vendor WHERE et_id = '" + request.query['et_id'].toString() + "' and vd_id ='" + request.signedCookies['vd_id_e'] + "'")];
                case 1:
                    status = _a.sent();
                    status = status[0][0]['status'];
                    if (status !== '110') {
                        if (status === '100') {
                            return [2 /*return*/, response.redirect("/tender/payment?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else if (status === '111') {
                            return [2 /*return*/, response.redirect("/tender/confirmation?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else if (status === '1111') {
                            return [2 /*return*/, response.redirect("/tender/confirmation?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else {
                            return [2 /*return*/, response.redirect('/tenders')];
                        }
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.documentTender = documentTender;
function confirmTender(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute("SELECT * FROM  e_tender_vendor WHERE et_id = '" + request.query['et_id'].toString() + "' and vd_id ='" + request.signedCookies['vd_id_e'] + "'")];
                case 1:
                    status = _a.sent();
                    status = status[0][0]['status'];
                    if (status !== '111') {
                        if (status === '100') {
                            return [2 /*return*/, response.redirect("/tender/payment?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else if (status === '110') {
                            return [2 /*return*/, response.redirect("/tender/upload-documents?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else if (status === '1111') {
                            return [2 /*return*/, response.redirect("/tender/preview?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else {
                            return [2 /*return*/, response.redirect('/tenders')];
                        }
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.confirmTender = confirmTender;
function previewTender(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection_1.default.execute("SELECT * FROM  e_tender_vendor WHERE et_id = '" + request.query['et_id'].toString() + "' and vd_id ='" + request.signedCookies['vd_id_e'] + "'")];
                case 1:
                    status = _a.sent();
                    status = status[0][0]['status'];
                    if (status !== '1111') {
                        if (status === '100') {
                            return [2 /*return*/, response.redirect("/tender/payment?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else if (status === '110') {
                            return [2 /*return*/, response.redirect("/tender/upload-documents?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else if (status === '111') {
                            return [2 /*return*/, response.redirect("/tender/confirmation?et_id=" + request.query['et_id'] + "&etd_id=" + request.query['etd_id'])];
                        }
                        else {
                            return [2 /*return*/, response.redirect('/tenders')];
                        }
                    }
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.previewTender = previewTender;
