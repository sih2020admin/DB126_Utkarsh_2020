var data = ''
var response
var vd_id = get_cookie('vd_id')
var vcd_id = get_cookie('vcd_id')
function loadResults(response) {
    $('#cont').empty()
    var cont_div = document.getElementById('cont')
    for (var i = 0; i < response.length; i++) {
        var div =
            `<div class="cont" id="` +
            i +
            `">
                        <p class="heading">` +
            response[i].et_title +
            `</p><br>
                        <div class="Tdetails">
                            <p class="RnoLabel"><strong>Ref No:</strong></p>
                            <p >` +
            response[i].et_tender_ref_no +
            `</p>
                            <p class="OdateLabel"><strong>Closing Date:</strong></p>
                            <p id="Odate">` +
            response[i].et_last_date_apply +
            `</p>
                            <p class="BdateLabel"><strong>Bid Opening Date:</strong></p>
                            <p id="Bdate">` +
            response[i].et_bidding_date +
            `</p>
                        </div><br>  
                        <p class="para">` +
            response[i].et_tender_desc +
            `</p>
                        <br><button name="apply" value='apply' class="apply" onclick="apply(` +
            i +
            `)">Apply</button>
                    </div>`

        cont_div.insertAdjacentHTML('beforeend', div)
    }
}

var xhr = new XMLHttpRequest()

xhr.onload = function () {
    if (this.status === 200) {
        response = JSON.parse(this.responseText)
        loadResults(response)
    } else if (this.status == 404) {
        alert('No tender to show')
    } else {
        alert('Check Network!')
    }
}

xhr.open('POST', '/gettenderlist')

xhr.send(data)

function apply(i) {
    if (vd_id != '') {
        var et_id = response[i].et_id
        var data = JSON.stringify({ et_id: et_id, vd_id: vd_id })

        var xhr = new XMLHttpRequest()
        xhr.onload = function () {
            if (this.status === 200) {
                var res = JSON.parse(this.responseText)
                var status = res.status
                if (status == '100') {
                    alert('all ready applied , complete process')
                    window.location.href = '/payment/tender?et_id=' + et_id + '&etd_id=' + res.etd_id
                } else if (status == '110') {
                    alert('all ready applied , complete process')
                    window.location.href = '/v4_apply_tender_s3.html?et_id=' + et_id + '&etd_id=' + res.etd_id
                } else if (status == '111') {
                    alert('Process done Submit Tender')
                    window.location.href = '/v5_confirm_tender.html?et_id=' + et_id + '&etd_id=' + res.etd_id
                } else if (status == '1111') {
                    alert('Application submited redirecting to Application Preview page')
                    window.location.href = '/v5_preview_tender.html?et_id=' + et_id + '&etd_id=' + res.etd_id
                }
            } else if (this.status === 404) {
                window.location.href = '/v4_apply_tender_s1.html?et_id=' + response[i].et_id
            } else {
                alert('Check Network')
            }
        }

        xhr.open('POST', '/get_etd_id')
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.send(data)
    } else {
        alert('Login to apply')
    }
}
function findJsonString() {
    var filterKey = $('#search_bar').val().toLowerCase()
    if (filterKey !== '') {
        var result = []
        for (let i = response.length - 1; i >= 0; i--) {
            if (response[i].et_title.toLowerCase().indexOf(filterKey) !== -1 || response[i].et_tender_desc.toLowerCase().indexOf(filterKey) !== -1 || response[i].et_tender_fee.toLowerCase().indexOf(filterKey) !== -1) {
                result.push(response[i])
            }
        }

        if (result.length === 0) {
            $('#cont').empty()
            $('#cont').html('<p>Found no matches</p>')
        } else {
            loadResults(result)
        }
    } else {
        loadResults(response)
    }
}
function get_department() {
    $.post('/misc/get-department')
        .then((response) => {
            for (let i = 0; i < response.length; i++) {
                $('<input>', {
                    id: response[i]['dept_name'],
                    type: 'checkbox',
                    value: response[i]['dept_name'],
                }).appendTo('#department')
                $('<label></label>', {
                    for: response[i]['dept_name'],
                    text: response[i]['dept_name'],
                }).appendTo('#department')
            }
        })
        .catch((error) => {
            console.log('error due to some reason')
            console.log('Printing error', error)
        })
}
function filterData() {
    var filter_categories = []
    let department = []
    let closing_date = []
    let fee = []
    let filtered_result = []
    $.each($("input[type='checkbox']:checked"), function () {
        department.push($(this).val())
    })
    filter_categories.push(department)
    $.each($("input[type='date']"), function () {
        closing_date.push($(this).val())
    })
    filter_categories.push(closing_date)
    $.each($("input[type='radio']:checked"), function () {
        fee.push($(this).val())
    })
    filter_categories.push(fee)
    for (let i = 0; i < response.length; i++) {
        if (filter_categories[0].length !== 0) {
            for (let j = 0; j < filter_categories[0].length; j++) {
                if (filter_categories[0][j] === response[0]['dept_name']) {
                    filtered_result.push(response)
                }
            }
        } else {
            filtered_result.push(response)
        }
    }
    console.log(filtered_result)
}

get_department()
