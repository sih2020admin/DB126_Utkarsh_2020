var vd_id = get_cookie('vd_id')
var vcd_id = get_cookie('vcd_id')
/* if (vd_id == '') {
    window.location.href = '/login'
} */

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

//Redirecting
var et_id = urlParams.get('et_id')
var status = '000'
var etd_id
/* if (et_id == null) {
    window.location.href = '/tenders'
} else {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/get_etd_id')
    xhr.setRequestHeader('Content-Type', 'application/json')
    var data = JSON.stringify({ et_id: et_id })
    xhr.send(data)
    xhr.onload = function () {
        if (this.status === 200) {
            var res
            res = JSON.parse(this.responseText)
            var status_res = res.status
            etd_id = res.etd_id
            if (status_res == '100') {
                window.location.href = '/tender/payment?et_id=' + et_id + '&etd_id=' + etd_id
            } else if (status_res == '110') {
                window.location.href = '/tender/upload-documents?et_id=' + et_id + '&etd_id=' + etd_id
            } else if (status_res == '111') {
                window.location.href = '/tender/confirmation?et_id=' + et_id + '&etd_id=' + res.etd_id
            } else if (status_res == '1111') {
                window.location.href = '/tender/preview?et_id=' + et_id + '&etd_id=' + etd_id
            }
        } else if (this.status == 404) {
                
        } else {
            alert('Check Network')
        }
    }
}
 */
//Tender Details/Personal deatils/Company Details
/* var xhr = new XMLHttpRequest()
xhr.open('POST', '/tender_desc')
xhr.setRequestHeader('Content-Type', 'application/json')
var data = JSON.stringify({ et_id: et_id, vd_id: vd_id, vcd_id: vcd_id })
xhr.send(data)
xhr.onload = function () {
    if (this.status === 200) {
        response = JSON.parse(this.responseText)
        document.getElementById('et_id').innerHTML = response[0][0].et_id
        document.getElementById('ref').innerHTML = response[0][0].et_tender_ref_no
        document.getElementById('title').innerHTML = response[0][0].et_title
        document.getElementById('department').innerHTML = response[0][0].dept_name
        document.getElementById('fee').innerHTML = response[0][0].et_tender_fee
        var a = document.getElementById('file')
        a.href = response[0][0].et_file_uri
        document.getElementById('close').innerHTML = response[0][0].et_last_date_apply.slice(0, 10)
        document.getElementById('bid').innerHTML = response[0][0].et_bidding_date.slice(0, 10)
        document.getElementById('desc').innerHTML = response[0][0].et_tender_desc

        document.getElementById('name').innerHTML = response[1][0].vcd_name
        document.getElementById('dob').innerHTML = response[1][0].vcd_dob
        document.getElementById('desg').innerHTML = response[1][0].vcd_designation
        document.getElementById('aadhar').innerHTML = response[1][0].vcd_aadhar
        document.getElementById('email').innerHTML = response[1][0].vcd_email
        document.getElementById('contact').innerHTML = response[1][0].vcd_contact

        document.getElementById('cname').innerHTML = response[2][0].v_name
        document.getElementById('legal').innerHTML = response[2][0].v_legal_id
        document.getElementById('yoe').innerHTML = response[2][0].v_yoe
        document.getElementById('register').innerHTML = response[2][0].v_reg_no
        document.getElementById('gst').innerHTML = response[2][0].v_gst
        document.getElementById('pan').innerHTML = response[2][0].v_pan
        document.getElementById('cemail').innerHTML = response[2][0].v_email
        document.getElementById('ccontact').innerHTML = response[2][0].v_mobile
        document.getElementById('address').innerHTML = response[2][0].v_address
    } else if (this.status == 400) {
        alert('Some Error Occured!')
    } else {
        alert('Check Network!')
    }
} */

//Save and Next
function next(){
    Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Empty feild!'
            }
        },
    })
        .queue([
            {
                input: 'number',
                title: 'Enter Bidding Amount',
                inputValidator: (value) => {
                    if (value<0) return 'Invalid Bidding Amount '
                    if (value=='') return 'Invalid Bidding Amount '
		   if (value==0) return 'Invalid Bidding Amount '
                },
            },
            {
                input: 'number',
                title: 'Enter Time period(In Days)',
                inputValidator: (value) => {
                    if (value<0) return 'Invalid Time period '
                    if (value=='') return 'Invalid Time period '
                    if (value==0) return 'Invalid Time Period '
	
},

            },
        ])
        .then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value)
                console.log(result.value)
                Swal.fire({
                    title: 'All done!',
                    html: `
				        <h3 style="text-align:left;">Confirmation</h3>
				        <br>
				        <h4>Bidding amount: &nbsp;${result.value[0]}</h4><br>
				        <h4>Time period: &nbsp;${result.value[1]}</h4><br>	
				      `,
                    confirmButtonText: 'Confirm',
                    showCancelButton: true,
                }).then((result2) => {
                    if (result2.value) {
                        console.log(result, result2)
                        var xhr = new XMLHttpRequest()
                        xhr.open('POST', '/apply_tender')
                        xhr.setRequestHeader('Content-Type', 'application/json')
                
                        var data = JSON.stringify({
                            et_id: et_id,
                            bid_amt: result.value[0],
                            time_period: result.value[1]
                        })
                        xhr.send(data)
                        xhr.onload = function () {
                            if (this.status == 200) {
                                var resp = JSON.parse(this.responseText)
                                var etd_id = resp.etd_id
                                location = '/tender/payment?et_id=' + et_id + '&etd_id=' + etd_id
                            } else if (this.status == 400) alert('Error 400')
                            else alert('Some Error Occured')
                        }

                        
                    }
                })
            }
        })
}

//Progress Bar
function progess_bar() {
    //progress bar code------------------------------------------------------

    var i = 0
    if (status === '100') {
        move1()
    } else if (status === '110') {
        move2()
    } else if (status === '111') {
        move3()
    }

    function move1() {
        if (i == 0) {
            i = 1
            var elem = document.getElementById('pBar')
            document.getElementById('arr1').style.display = ''
            var width = 10
            var id = setInterval(frame, 20)

            function frame() {
                if (width >= 100 / 3) {
                    clearInterval(id)
                    i = 0
                } else {
                    width++
                    elem.style.width = width + '%'
                }
            }
        }
    }

    function move2() {
        if (i == 0) {
            i = 1
            var elem = document.getElementById('pBar2')
            document.getElementById('arr2').style.display = ''
            var width = 10
            var id = setInterval(frame, 20)

            function frame() {
                if (width >= 100 / 3) {
                    clearInterval(id)
                    i = 0
                } else {
                    width++
                    elem.style.width = width + '%'
                }
            }
        }
    }

    function move3() {
        document.getElementById('arr3').style.display = ''
        if (i == 0) {
            i = 1
            var elem = document.getElementById('pBar3')

            var width = 10
            var id = setInterval(frame, 20)

            function frame() {
                if (width >= 100 / 3) {
                    clearInterval(id)
                    i = 0
                } else {
                    width++
                    elem.style.width = width + '%'
                }
            }
        }
    }

    //progress bar code over-------------------------------------------------
}
