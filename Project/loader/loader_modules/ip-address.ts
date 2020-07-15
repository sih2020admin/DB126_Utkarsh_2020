import os from 'os'
export class IP {
    all(): Map<string, string[]> {
        var devices = os.networkInterfaces()
        var map_value: string[] = [],
            list_of_ip_addresses: Map<string, string[]> = new Map<string, string[]>()
        for (var elements in devices) {
            for (var keys in devices[elements]) {
                map_value.push(devices[elements][keys].address)
            }
            list_of_ip_addresses.set(elements, map_value)
            map_value = []
        }
        return list_of_ip_addresses
    }
}
export class IPv4 extends IP {
    address(localhost: boolean = true) {
        var list_of_ip_addresses = this.all()
        var list_of_ipv4_addresses: Map<string, string[]> = new Map<string, string[]>()
        if (localhost === true) {
            for (var values of list_of_ip_addresses) {
                var list = []
                for (var address of values[1]) {
                    if (address.split('.').length === 4) {
                        list.push(address)
                    }
                }
                if (list.length !== 0) {
                    list_of_ipv4_addresses.set(values[0], list)
                }
            }
        } else {
            for (var values of list_of_ip_addresses) {
                var list = []
                for (var address of values[1]) {
                    if (address.split('.').length === 4 && address !== '127.0.0.1') {
                        list.push(address)
                    }
                }
                if (list.length !== 0) {
                    list_of_ipv4_addresses.set(values[0], list)
                }
            }
        }
        return list_of_ipv4_addresses
    }

    search(server_address: string): boolean {
        var check = false
        var list_of_ip_addresses = this.address()
        for (var values of list_of_ip_addresses) {
            for (var address of values[1]) {
                if (address.includes(server_address)) {
                    check = true
                    break
                }
            }
        }
        return check
    }

    get(): string {
        var address1: string[] = []
        var list_of_ip_addresses = this.address()
        for (var values of list_of_ip_addresses) {
            for (var address of values[1]) {
                if (address.includes('192.168')) {
                    address1.push(address)
                }
            }
        }
        return address1[0]
    }
}
