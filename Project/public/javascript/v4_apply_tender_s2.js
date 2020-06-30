var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
var etd_id
var et_id = null
et_id = (_a = urlParams.get('et_id')) === null || _a === void 0 ? void 0 : _a.toString()
/* function status_check() {
    var data = JSON.stringify({ et_id: et_id })
    var res

    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
        if (this.status === 200) {
            res = JSON.parse(this.responseText)
            var status_res = res.status
            etd_id = res.etd_id
            if (status_res == '110') {
                window.location.href = '/tender/upload-documents?et_id=' + et_id + '&etd_id=' + etd_id
            } else if (status_res == '111') {
                window.location.href = '/tender/confirmation?et_id=' + et_id + '&etd_id=' + res.etd_id
            } else if (status_res == '1111') {
                window.location.href = '/tender/preview?et_id=' + et_id + '&etd_id=' + etd_id
            }
        } else if (this.status === 404) {
            Swal.fire({
                title: 'Confirmation',
                text: 'Apply for the tender',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#663EFD',
                cancelButtonColor: '#a6a6a6',
                confirmButtonText: 'Apply',
            }).then((result, res) => {
                console.log(result, res)
                if (result.isConfirmed) window.location.href = '/tender/apply?et_id=' + response[i].et_id
            })
        } else {
            alert('Check Network')
        }
    }

    xhr.open('POST', '/get_etd_id')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data)
} */
if (et_id == null) {
    //window.location.href = '/tenders'
} else {
    //status_check()
}

var status = '100'
var data = JSON.stringify({ et_id: et_id, etd_id: etd_id })
var xhr = new XMLHttpRequest()
// xhr.withCredentials = true;

xhr.onload = function () {
    if (this.status === 200) {
        response = JSON.parse(this.responseText)
        // var cont_div = document.getElementById('conts');

        status = response.status
        // 000 = 0
        // 100 = step1
        // 110 = step2
        // 111 = step3
        progess_bar()
    } else if (this.status == 400) {
        // alert("Some error occured!");
    } else {
        // alert("Check Network!");
    }
}

xhr.open('POST', '/filled_tender_desc')
xhr.setRequestHeader('Content-Type', 'application/json')

xhr.send(data)

function progess_bar() {
    // body...

    //progress bar code------------------------------------------------------

    var i = 0
    if (status === '100') {
        move1()
        console.log('status')
    } else if (status === '110') {
        move2()
        console.log('status')
    } else if (status === '111') {
        move3()
    }

    function move1() {
        console.log('move1 called')

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
        console.log('move2 called')

        if (i == 0) {
            i = 1
            var elem2 = document.getElementById('pBar2')
            document.getElementById('arr2').style.display = ''
            var width = 10
            var id = setInterval(frame, 20)

            function frame() {
                if (width >= 100 / 3) {
                    clearInterval(id)
                    i = 0
                } else {
                    width++
                    elem2.style.width = width + '%'
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
