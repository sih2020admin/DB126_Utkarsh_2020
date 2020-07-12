"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPv4 = exports.IP = void 0;
const os_1 = __importDefault(require("os"));
class IP {
    all() {
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
    }
}
exports.IP = IP;
class IPv4 extends IP {
    address(localhost = true) {
        var list_of_ip_addresses = this.all();
        var list_of_ipv4_addresses = new Map();
        if (localhost === true) {
            for (var values of list_of_ip_addresses) {
                var list = [];
                for (var address of values[1]) {
                    if (address.split('.').length === 4) {
                        list.push(address);
                    }
                }
                if (list.length !== 0) {
                    list_of_ipv4_addresses.set(values[0], list);
                }
            }
        }
        else {
            for (var values of list_of_ip_addresses) {
                var list = [];
                for (var address of values[1]) {
                    if (address.split('.').length === 4 && address !== '127.0.0.1') {
                        list.push(address);
                    }
                }
                if (list.length !== 0) {
                    list_of_ipv4_addresses.set(values[0], list);
                }
            }
        }
        return list_of_ipv4_addresses;
    }
    search(server_address) {
        var check = false;
        var list_of_ip_addresses = this.address();
        for (var values of list_of_ip_addresses) {
            for (var address of values[1]) {
                if (address.includes(server_address)) {
                    check = true;
                    break;
                }
            }
        }
        return check;
    }
    get() {
        var address1 = [];
        var list_of_ip_addresses = this.address();
        for (var values of list_of_ip_addresses) {
            for (var address of values[1]) {
                if (address.includes('192.168')) {
                    address1.push(address);
                }
            }
        }
        return address1[0];
    }
}
exports.IPv4 = IPv4;
