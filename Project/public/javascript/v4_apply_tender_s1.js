var vd_id = get_cookie('vd_id')
var vcd_id = get_cookie('vcd_id')
if (vd_id == '') {
    window.location.href = '/login'
}

const queryString = window.location.search
console.log(queryString)
const urlParams = new URLSearchParams(queryString)

var et_id = urlParams.get('et_id')
var status = '000'
var etd_id = urlParams.get('etd_id')
console.log(et_id, etd_id)

var cont_div = document.getElementById('conts')
document.getElementById('next_button').style.display = 'none'

var data = JSON.stringify({ et_id: et_id, vd_id: vd_id, vcd_id: vcd_id })

var xhr = new XMLHttpRequest()
// xhr.withCredentials = true;

xhr.onload = function () {
    if (this.status === 200) {
        console.log(this.responseText)

        response = JSON.parse(this.responseText)

        var div =
            `<div class="cont" id="one">
                <h3>Tender Details</h3><br>
            <label><strong>Title:</strong></label>
            <label class="heading">` +
            response[0][0].et_title +
            `</label><br><br>
                <label class="RnoLabel"><strong>Department:</strong></label>
                <label>` +
            response[0][0].dept_name +
            `</label><br><br>
                <label class="RnoLabel"><strong>Ref No:</strong></label>
                <label>` +
            response[0][0].et_tender_ref_no +
            `</label><br><br>
                <label class="Id"><strong>Tender ID:</strong></label>
                <label>` +
            response[0][0].et_id +
            `</label><br><br>
                <label class="Id"><strong>Tender fee:</strong></label>
                <label>` +
            response[0][0].et_tender_fee +
            `</label><br><br>
                <label class="Id"><strong>Tender Description:</strong></label>
                <label>` +
            response[0][0].et_tender_desc +
            `</label><br><br>
                <label class="OdateLabel"><strong>Closing Date:</strong></label>
                <label id="Odate">` +
            response[0][0].et_last_date_apply.slice(0, 10) +
            `</label><br><br>
                <label class="OdateLabel"><strong>Bid Date:</strong></label>
                <label id="Odate">` +
            response[0][0].et_bidding_date.slice(0, 10) +
            `</label><br><br>
                <label class="OdateLabel"><strong>File URL:</strong></label>
                <a id="Odate" href="/` +
            response[0][0].et_file_uri +
            `">files</a>
        </div>`

        cont_div.insertAdjacentHTML('beforeend', div)

        var div2 =
            `<div class="cont" id="two" style="display:none">
                <h3>Vendor Contact Details</h3><br>
            <label><strong>Name:</strong></label>
            <label class="heading">` +
            response[1][0].vcd_title +
            response[1][0].vcd_name +
            `</label><br><br>
                <label class="RnoLabel"><strong>Designation:</strong></label>
                <label>` +
            response[1][0].vcd_designation +
            `</label><br><br>
                <label class="RnoLabel"><strong>Date Of Birth:</strong></label>
                <label>` +
            response[1][0].vcd_dob +
            `</label><br><br>
                <label class="Id"><strong>Contact:</strong></label>
                <label>` +
            response[1][0].vcd_contact +
            `</label><br><br>
                <label class="Id"><strong>Email:</strong></label>
                <label>` +
            response[1][0].vcd_email +
            `</label>
        </div>`

        cont_div.insertAdjacentHTML('beforeend', div2)

        var div3 =
            `<div class="cont" id="three" style="display:none">
                <h3>Company Details</h3><br>
            <label><strong>Company Name:</strong></label>
            <label class="heading">` +
            response[2][0].v_name +
            `</label><br><br>
                <label class="RnoLabel"><strong>Address:</strong></label>
                <label>` +
            response[2][0].v_address +
            `</label><br><br>
                <label class="RnoLabel"><strong>Year Of Establishment:</strong></label>
                <label>` +
            response[2][0].v_yoe +
            `</label><br><br>
                <label class="Id"><strong>Company Email:</strong></label>
                <label>` +
            response[2][0].v_email +
            `</label><br><br>
                <label class="Id"><strong>Mobile NO:</strong></label>
                <label>` +
            response[2][0].v_mobile +
            `</label><br><br>
                <label class="Id"><strong>Registration Number:</strong></label>
                <label>` +
            response[2][0].v_reg_no +
            `</label><br><br>
                 <label class="Id"><strong>State:</strong></label>
                <label>` +
            response[2][0].v_state_id +
            `</label><br><br>
                <label class="Id"><strong>City:</strong></label>
                <label>` +
            response[2][0].v_city_id +
            `</label><br><br>
                <label class="Id"><strong>Pincode:</strong></label>
                <label>` +
            response[2][0].v_pincode +
            `</label><br><br>
                <label class="Id"><strong>Legal status:</strong></label>
                <label>` +
            response[2][0].v_legal_id +
            `</label><br><br>
                <label class="Id"><strong>PAN Number:</strong></label>
                <label>` +
            response[2][0].v_pan +
            `</label><br><br>
                <label class="Id"><strong>Verification Status:</strong></label>
                <label>` +
            response[2][0].v_is_verified +
            `</label><br><br>
                <label class="Id"><strong>GST No:</strong></label>
                <label>` +
            response[2][0].v_gst +
            `</label>     
        </div>`

        cont_div.insertAdjacentHTML('beforeend', div3)
        //progess_bar()
    } else if (this.status == 400) {
        alert('Some error occured!')
    } else {
        alert('Check Network!')
    }
}

xhr.open('POST', '/tender_desc')
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.send(data)

//afif code

function tt() {
    one = document.getElementById('one')
    two = document.getElementById('two')
    three = document.getElementById('three')
    back = document.getElementById('back')
    next = document.getElementById('next')

    oneD = one.style.display
    twoD = two.style.display
    threeD = three.style.display

    one.classList.add('cont')
    two.classList.add('cont')
    three.classList.add('cont')

    one.classList.remove('cont2')
    two.classList.remove('cont2')
    three.classList.remove('cont2')

    if (oneD == '') {
        one.style.display = 'none'
        two.style.display = ''
        console.log(oneD)
        back.style.display = ""
        next.innerHTML = 'Company Details &nbsp;&nbsp;<i class="fas fa-chevron-right"></i>'
        back.innerHTML = '<i class="fas fa-chevron-left"></i>&nbsp;&nbsp; Tender Details '
    } else {
        two.style.display = 'none'
        three.style.display = ''
        console.log('working')
        next.style.display = "none"
        back.innerHTML = '<i class="fas fa-chevron-left"></i>&nbsp;&nbsp; Vendor Contact Details '
    }
}
function bt() {
    one = document.getElementById('one')
    two = document.getElementById('two')
    three = document.getElementById('three')
    back = document.getElementById('back')
    next = document.getElementById('next')

    oneD = one.style.display
    twoD = two.style.display
    threeD = three.style.display

    one.classList.remove('cont')
    two.classList.remove('cont')
    three.classList.remove('cont')

    one.classList.add('cont2')
    two.classList.add('cont2')
    three.classList.add('cont2')

    if (threeD == '') {
        three.style.display = 'none'
        two.style.display = ''
        next.style.display = ""
        back.innerHTML = '<i class="fas fa-chevron-left"></i>&nbsp;&nbsp; Tender Details '
    } else {
        two.style.display = 'none'
        one.style.display = ''
        back.style.display = "none"
        next.innerHTML = 'Vendor Contact Details &nbsp;&nbsp;<i class="fas fa-chevron-right"></i>'

    }
}

//afif code end

function apply() {
    // body...
    console.log(et_id)
    var data = JSON.stringify({ et_id: et_id, vd_id: vd_id, vcd_id: vcd_id, bid_amt: '12000' })
    //bid ammounnt to take from user
    var xhr = new XMLHttpRequest()
    // xhr.withCredentials = true;

    xhr.onload = function () {
        if (this.status === 200) {
            var resp = JSON.parse(this.responseText)
            var etd_id = resp.etd_id
            window.location.href = '/payment/tender?et_id=' + et_id + '&etd_id=' + etd_id
        } else {
            alert('Some error')
        }
    }

    xhr.open('POST', '/apply_tender')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(data)
}

function next() {
    // body...
    window.location.href = '/payment/tender?et_id=' + et_id + '&etd_id=' + etd_id
}

function progess_bar() {
    // body...

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
