"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var IP = /** @class */ (function () {
    function IP() {
    }
    IP.prototype.all = function () {
        var devices = os_1.default.networkInterfaces();
        var map_value = [], list_of_ip_addresses = new Map();
        for (var elements in devices) {
            for (var keys in devices[elements]) {
                map_value.push(devices[elements][keys].address);
            }
            list_of_ip_addresses.set(elements, map_value);
            map_value = [];
        }
        return list_of_ip_addresses;
    };
    return IP;
}());
exports.IP = IP;
var IPv4 = /** @class */ (function (_super) {
    __extends(IPv4, _super);
    function IPv4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IPv4.prototype.address = function (localhost) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        if (localhost === void 0) { localhost = true; }
        var list_of_ip_addresses = this.all();
        var list_of_ipv4_addresses = new Map();
        if (localhost === true) {
            try {
                for (var list_of_ip_addresses_1 = __values(list_of_ip_addresses), list_of_ip_addresses_1_1 = list_of_ip_addresses_1.next(); !list_of_ip_addresses_1_1.done; list_of_ip_addresses_1_1 = list_of_ip_addresses_1.next()) {
                    var values = list_of_ip_addresses_1_1.value;
                    var list = [];
                    try {
                        for (var _e = (e_2 = void 0, __values(values[1])), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var address = _f.value;
                            if (address.split('.').length === 4) {
                                list.push(address);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (list.length !== 0) {
                        list_of_ipv4_addresses.set(values[0], list);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (list_of_ip_addresses_1_1 && !list_of_ip_addresses_1_1.done && (_a = list_of_ip_addresses_1.return)) _a.call(list_of_ip_addresses_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            try {
                for (var list_of_ip_addresses_2 = __values(list_of_ip_addresses), list_of_ip_addresses_2_1 = list_of_ip_addresses_2.next(); !list_of_ip_addresses_2_1.done; list_of_ip_addresses_2_1 = list_of_ip_addresses_2.next()) {
                    var values = list_of_ip_addresses_2_1.value;
                    var list = [];
                    try {
                        for (var _g = (e_4 = void 0, __values(values[1])), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var address = _h.value;
                            if (address.split('.').length === 4 && address !== '127.0.0.1') {
                                list.push(address);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    if (list.length !== 0) {
                        list_of_ipv4_addresses.set(values[0], list);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (list_of_ip_addresses_2_1 && !list_of_ip_addresses_2_1.done && (_c = list_of_ip_addresses_2.return)) _c.call(list_of_ip_addresses_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return list_of_ipv4_addresses;
    };
    IPv4.prototype.search = function (server_address) {
        var e_5, _a, e_6, _b;
        var check = false;
        var list_of_ip_addresses = this.address();
        try {
            for (var list_of_ip_addresses_3 = __values(list_of_ip_addresses), list_of_ip_addresses_3_1 = list_of_ip_addresses_3.next(); !list_of_ip_addresses_3_1.done; list_of_ip_addresses_3_1 = list_of_ip_addresses_3.next()) {
                var values = list_of_ip_addresses_3_1.value;
                try {
                    for (var _c = (e_6 = void 0, __values(values[1])), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var address = _d.value;
                        if (address.includes(server_address)) {
                            check = true;
                            break;
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (list_of_ip_addresses_3_1 && !list_of_ip_addresses_3_1.done && (_a = list_of_ip_addresses_3.return)) _a.call(list_of_ip_addresses_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return check;
    };
    IPv4.prototype.get = function () {
        var e_7, _a, e_8, _b;
        var address1 = [];
        var list_of_ip_addresses = this.address();
        try {
            for (var list_of_ip_addresses_4 = __values(list_of_ip_addresses), list_of_ip_addresses_4_1 = list_of_ip_addresses_4.next(); !list_of_ip_addresses_4_1.done; list_of_ip_addresses_4_1 = list_of_ip_addresses_4.next()) {
                var values = list_of_ip_addresses_4_1.value;
                try {
                    for (var _c = (e_8 = void 0, __values(values[1])), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var address = _d.value;
                        if (address.includes('192.168')) {
                            address1.push(address);
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (list_of_ip_addresses_4_1 && !list_of_ip_addresses_4_1.done && (_a = list_of_ip_addresses_4.return)) _a.call(list_of_ip_addresses_4);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return address1[0];
    };
    return IPv4;
}(IP));
exports.IPv4 = IPv4;
