const urlParams = new URLSearchParams(window.location.search)
var et_id = urlParams.get('et_id')
var etd_id = urlParams.get('etd_id')
// var vd_id = get_cookie('vd_id')
var message
function validateLocation(location) {
    if (location.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Location',
        })
        return false
    }
    return true
}
window.addEventListener('pageshow',function(event){
    if(event.persisted){
        location.reload()
    }
})

/* var xhr = new XMLHttpRequest()
var url = '/view'
xhr.open('POST', url)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(JSON.stringify({ et_id: et_id, etd_id: etd_id, vd_id: -1 }))
xhr.onload = function () {
    if (this.status == 200) {
        message = JSON.parse(this.responseText)
        document.getElementById('et_id').innerHTML = et_id
        document.getElementById('ref').innerHTML = message.result0[0].et_tender_ref_no
        document.getElementById('title').innerHTML = message.result0[0].et_title
        document.getElementById('fee').innerHTML = message.result0[0].et_tender_fee
        document.getElementById('bid').innerHTML = message.result0[0].et_bidding_date.slice(0, -14)

        document.getElementById('name').innerHTML = message.result1[0].vcd_name
        document.getElementById('dob').innerHTML = message.result1[0].vcd_dob
        document.getElementById('desg').innerHTML = message.result1[0].vcd_designation
        document.getElementById('aadhar').innerHTML = message.result1[0].vcd_aadhar
        document.getElementById('email').innerHTML = message.result1[0].vcd_email
        document.getElementById('contact').innerHTML = message.result1[0].vcd_contact

        document.getElementById('cname').innerHTML = message.result1[0].v_name
        document.getElementById('legal').innerHTML = message.result1[0].v_legal_id
        document.getElementById('yoe').innerHTML = message.result1[0].v_yoe
        document.getElementById('register').innerHTML = message.result1[0].v_reg_no
        document.getElementById('gst').innerHTML = message.result1[0].v_gst
        document.getElementById('pan').innerHTML = message.result1[0].v_pan
        document.getElementById('cemail').innerHTML = message.result1[0].v_email
        document.getElementById('ccontact').innerHTML = message.result1[0].v_mobile
        document.getElementById('address').innerHTML = message.result1[0].v_address

        document.getElementById('file1').innerHTML = message.result2[0].furi1
        document.getElementById('file2').innerHTML = message.result2[0].furi2

        document.getElementById('transaction').innerHTML = message.result2[0].txn_id
        document.getElementById('amt').innerHTML = message.result2[0].txn_amount
        document.getElementById('date').innerHTML = message.result2[0].txn_timestamp
        document.getElementById('bank').innerHTML = message.result2[0].bank_name
        document.getElementById('status').innerHTML = message.result2[0].resp_message
    } else if (this.status == 400) alert('Error 400 ')
    else alert('Some Error Occured')
} */
function freeze() {
    Swal.fire({
        title: 'Enter your location',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
    }).then((results) => {
        if (results) {
            if (validateLocation(results['value'])) {
                document.getElementById('icon').className = 'fa fa-spinner fa-spin'
                var xhr = new XMLHttpRequest()
                var url = '/confirm_tender_s5'
                xhr.open('POST', url)
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify({ etd_id: etd_id, location: results['value'], timestamp: new Date() }))
                xhr.onload = function () {
                    if (this.status == 200) {
                        window.location.href = '/tender/preview?et_id=' + et_id + '&etd_id=' + etd_id
                    } else if (this.status == 400) {
                        document.getElementById('icon').className = ''
                        alert('Error 400')
                    } else {
                        document.getElementById('icon').className = ''
                        alert('Some Error Occured')
                    }
                }
            }
        }
    })
}

window.addEventListener('pageshow',function(event){
    console.log(performance.navigation.type)
    if(event.persisted){
        
    }
})
