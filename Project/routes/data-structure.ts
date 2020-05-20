export class Queue {
    constructor() {
        this.queue_items = []
    }
    queue_items: any
    enqueue(item: object) {
        this.queue_items.push(item)
    }
    dequeue() {
        return this.queue_items.shift()
    }
    display() {
        console.log(this.queue_items)
    }
    get_elements() {
        return this.queue_items
    }
    length() {
        return this.queue_items.length
    }
    clear() {
        this.queue_items = []
    }
}
export class AddressError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, AddressError.prototype);
    }
}
export class KeyError extends Error{
    constructor(message:string){
        super(message)
        Object.setPrototypeOf(this, KeyError.prototype);

    }
}
export class MIDError extends Error{
    constructor(message:string){
        super(message)
        Object.setPrototypeOf(this, MIDError.prototype);

    }
}

export class Params {
    constructor(response: any, order_id: string, customer_id: string) {
        if ('body' in response) {
            response = response.body
        }
        this.et_id = response.et_id
        this.etd_id = response.etd_id
        this.amount = response.amount
        this.email = response.email
        this.mobile = response.mobile
        this.order_id = order_id
        this.customer_id = customer_id
    }
    readonly et_id: string
    readonly etd_id: string
    readonly amount: string
    readonly email: string
    readonly mobile: string
    readonly order_id: string
    readonly customer_id: string
}

export class PaymentDetails {
    constructor(order_id: string, customer_id: string, txn_amount: string) {
        this.order_id = order_id
        this.customer_id = customer_id
        this.txn_amount = txn_amount
    }
    readonly order_id: string
    readonly customer_id: string
    readonly txn_amount: string
}

class Transaction {
    constructor(txn_id: string, order_id: string, amount: string, status_message: string, status_code: string, refund_amount: string, timestamp: string) {
        this.txn_id = txn_id
        this.order_id = order_id
        this.amount = amount
        this.status_message = status_message
        this.status_code = status_code
        this.refund_amount = refund_amount
        this.timestamp = timestamp
    }
    readonly txn_id: string
    readonly order_id: string
    readonly amount: string
    readonly status_message: string
    readonly status_code: string
    readonly refund_amount: string
    readonly timestamp: string
}
export class TransactionFailure extends Transaction {
    constructor(response: any) {
        if ('data' in response) {
            response = response.data
        }
        if ('body' in response) {
            response = response.body
        }
        if (response.REFUNDAMT == undefined) {
            response.REFUNDAMT = '0.00'
        }
        super(response.TXNID, response.ORDERID, response.TXNAMOUNT, response.STATUS, response.RESPCODE, response.REFUNDAMT, response.TXNDATE)
        this.resp_message = response.RESPMSG
    }
    readonly resp_message: string
}

export class TransactionSuccess extends Transaction {
    constructor(response: any) {
        if ('data' in response) {
            response = response.data
        }
        if ('body' in response) {
            response = response.body
        }
        if (response.REFUNDAMT == undefined) {
            response.REFUNDAMT = '0.00'
        }
        super(response.TXNID, response.ORDERID, response.TXNAMOUNT, response.STATUS, response.RESPCODE, response.REFUNDAMT, response.TXNDATE)
        this.bank_txn_id = response.BANKTXNID
        this.gateway_name = response.GATEWAYNAME
        this.bank_name = response.BANKNAME
        this.payment_mode = response.PAYMENTMODE
    }
    readonly bank_txn_id: string
    readonly gateway_name: string
    readonly bank_name: string
    readonly payment_mode: string
    to_array() {
        return [this.txn_id, this.order_id, this.amount, this.status_message, this.status_code, this.refund_amount, this.timestamp, this.bank_txn_id, this.gateway_name, this.bank_name, this.payment_mode]
    }
}
