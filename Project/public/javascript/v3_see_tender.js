var data = ''
var response
var res
// var vd_id = get_cookie('vd_id')
// var vcd_id = get_cookie('vcd_id')
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
            modify_date(response[i].et_last_date_apply) +
            `</p>
                            <p class="BdateLabel"><strong>Bid Opening Date:</strong></p>
                            <p id="Bdate">` +
            modify_date(response[i].et_bidding_date) +
            `</p>
                            <p class="BdateLabel"><strong>Department:</strong></p>
                            <p id="dept">` +
                response[i].dept_name +
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
    // if (vd_id != '') {
    // if (result.value) {
    var et_id = response[i].et_id
    var data = JSON.stringify({ et_id: et_id })
    

    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
        if (this.status === 200) {
            res = JSON.parse(this.responseText)
            console.log(this.responseText ,res )
            var status = res.status
            var etd_id = res.etd_id
            if (status == '100') {
                // alert('all ready applied , complete process')
                Swal.fire({
                    title: 'Confirmation',
                    text: 'all ready applied , complete process',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#663EFD',
                    cancelButtonColor: '#a6a6a6',
                    confirmButtonText: 'Apply',
                }).then((result) => {
                    console.log(result)
                    window.location.href = '/tender/payment?et_id=' + et_id + '&etd_id=' + etd_id
                })
            } else if (status == '110') {
                // alert('all ready applied , complete process')
                Swal.fire({
                    title: 'Confirmation',
                    text: 'all ready applied , complete process',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#663EFD',
                    cancelButtonColor: '#a6a6a6',
                    confirmButtonText: 'Apply',
                }).then((result) => {
                    // console.log(result)
                    if (result.isConfirmed) window.location.href = '/tender/upload-documents?et_id=' + et_id + '&etd_id=' + etd_id
                })
            } else if (status == '111') {
                // alert('Process done Submit Tender')
                Swal.fire({
                    title: 'Confirmation',
                    text: 'Applying process done , please submit this tender',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#663EFD',
                    cancelButtonColor: '#a6a6a6',
                    confirmButtonText: 'Apply',
                }).then((result) => {
                    // console.log(result)
                    if (result.isConfirmed) window.location.href = '/tender/confirmation?et_id=' + et_id + '&etd_id=' + etd_id
                })
            } else if (status == '1111') {
                // alert('Application submited redirecting to Application Preview page')
                Swal.fire({
                    title: 'Confirmation',
                    text: 'Application submited redirecting to Application Preview page',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#663EFD',
                    cancelButtonColor: '#a6a6a6',
                    confirmButtonText: 'Preview',
                }).then((result) => {
                    // console.log(result)
                    if (result.isConfirmed) window.location.href = '/tender/preview?et_id=' + et_id + '&etd_id=' + etd_id
                })
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
            }).then((result) => {
                // console.log(result)
                if (result.isConfirmed) window.location.href = '/tender/apply?et_id=' + response[i].et_id
            })
        } else {
            alert('Check Network')
        }
    }

    xhr.open('POST', '/get_etd_id')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(data)
    // }
    // } else {
    // alert('Login to apply')
    // }
}
function findJsonString() {
    var filterKey = $('#search_bar').val().toLowerCase()
    if (filterKey !== '') {
        var result = []
        for (let i = response.length - 1; i >= 0; i--) {
            if (response[i]['et_title'].toLowerCase().indexOf(filterKey) !== -1 || response[i]['et_tender_desc'].toLowerCase().indexOf(filterKey) !== -1 || response[i]['et_tender_ref_no'].toLowerCase().indexOf(filterKey) !== -1) {
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
                if(i==1){
                    $('<br>',).appendTo('#department')    
                }
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
    filter_categories.push($('#fees').val().toString())
    console.log(filter_categories , department , closing_date , fee , filtered_result)

    filtered_result = filter_department(filter_categories[0])
    filtered_result = filter_fees(filter_categories[2], filtered_result)
    filtered_result = filter_closing_date(filter_categories[1], filtered_result)
    render_filtered_results(filtered_result)
}
function modify_date(date) {
    let temp = new Date(date)
    return `${temp.getUTCDate()}/${temp.getUTCMonth() + 1}/${temp.getUTCFullYear()}`
}
function filter_department(department) {
    let temp = []
    if (department.length !== 0) {
        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < department.length; j++) {
                if (department[j] === response[i]['dept_name']) {
                    console.log("",response[i])
                    temp.push(response[i])
                }
            }
        }
    } else {
        temp = response
    }
    return temp
}

// setting filter dates
var today = new Date()
var dd = today.getDate()
var mm = today.getMonth() + 1 //January is 0!

var yyyy = today.getFullYear()
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
today = mm + '/' + dd + '/' + yyyy

$('#starting_date').attr('value', today)

// alert($('#starting_date ').attr('value'));

function filter_closing_date(dates, result) {
    let temp = []
    console.log('dates', dates, result)
    if (result.length !== 0) {
        if (dates[0] === '' && dates[1] === '') {
            console.log('1 ')
            return result
        } else if (dates[1] === '') {
            // console.log("2 ")
            for (let i = 0; i < result.length; i++) {
                // console.log((Date.parse(result[i].et_last_date_apply.slice(0,10)) >= Date.parse(dates[0])) , Date.parse(result[i].et_last_date_apply.slice(0,10)) , Date.parse(dates[0]))
                if (Date.parse(result[i].et_last_date_apply.slice(0, 10)) >= Date.parse(dates[0])) {
                    temp.push(response[i])
                }
            }
            return temp
        } else if (dates[0] === '') {
            // console.log("3 ")
            for (let i = 0; i < result.length; i++) {
                // console.log((Date.parse(result[i].et_last_date_apply) <= Date.parse(dates[1])), Date.parse(result[i].et_last_date_apply.slice(0,10)) ,Date.parse(dates[1]))
                if (Date.parse(result[i].et_last_date_apply.slice(0, 10)) <= Date.parse(dates[1])) {
                    temp.push(response[i])
                }
            }
            return temp
        } else {
            console.log('4 ')
            for (let i = 0; i < result.length; i++) {
                // console.log((Date.parse(result[i].et_last_date_apply.slice(0,10)) <=Date.parse(dates[1]) && Date.parse(result[i].et_last_date_apply.slice(0,10)) >=Date.parse(dates[0])) , Date.parse(result[i].et_last_date_apply.slice(0,10)) ,Date.parse(dates[0]) ,Date.parse(dates[1]))
                if (Date.parse(result[i].et_last_date_apply.slice(0, 10)) <= Date.parse(dates[1]) && Date.parse(result[i].et_last_date_apply.slice(0, 10)) >= Date.parse(dates[0])) {
                    temp.push(response[i])
                }
            }
            return temp
        }
    }
    return temp
}

function filter_fees(fee, result) {
    let temp = []
    if (result.length !== 0) {
        if (fee !== 'select') {
            if (fee === '0') {
                for (let i = 0; i < result.length; i++) {
                    if (parseInt(result[i]['et_tender_fee']) < 1000) {
                        temp.push(result[i])
                    }
                }
            } else if (fee === '1') {
                for (let i = 0; i < result.length; i++) {
                    if (parseInt(result[i]['et_tender_fee']) >= 1000 && parseInt(result[i]['et_tender_fee']) < 5000) {
                        temp.push(result[i])
                    }
                }
            } else if (fee === '2') {
                for (let i = 0; i < result.length; i++) {
                    if (parseInt(result[i]['et_tender_fee']) >= 5000 && parseInt(result[i]['et_tender_fee']) < 10000) {
                        temp.push(result[i])
                    }
                }
            } else if (fee === '3') {
                for (let i = 0; i < result.length; i++) {
                    if (parseInt(result[i]['et_tender_fee']) >= 10000 && parseInt(result[i]['et_tender_fee']) < 15000) {
                        temp.push(result[i])
                    }
                }
            } else {
                for (let i = 0; i < result.length; i++) {
                    if (parseInt(result[i]['et_tender_fee']) >= 15000 && parseInt(result[i]['et_tender_fee']) < 20000) {
                        temp.push(result[i])
                    }
                }
            }
        } else {
            temp = result
        }
    }
    return temp
}

function render_filtered_results(result) {
    console.log(result)
    if (result.length === 0) {
        console.log('could not find any tenders after filtering')
        alert('could not find any tenders after filtering')
    } else {
        loadResults(result)
    }
}

get_department()
