$(document).ready(function () {
    /* -------------- Start of setting min date to today of closing tender ---------- */
    var today = new Date()
    // var tommorow = new Date()
    var currentOffset = today.getTimezoneOffset()
    var ISTOffset = 330 // IST offset UTC +5:30
    var IST_today = new Date(today.getTime() + (ISTOffset + currentOffset) * 60000)

    var dd = IST_today.getDate()
    var mm = IST_today.getMonth() + 1 //January is 0!
    var yyyy = IST_today.getFullYear()
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd
    document.getElementById('closing_date').setAttribute('min', today)
    

    /* -------------- End of setting min date to today of closing tender ---------- */

    /* -------------- Start of on date change of closing tender ---------- */

    var date_input = document.getElementById('closing_date')
    // date_input.valueAsDate = new Date()

    var bid_close_date
    var date_input_bid_open

    date_input.onclick = function () {
        console.log(this.value)
        date_input_bid_open = document.getElementById('bid_opening_date')
        date_input_bid_open.disabled = false

        bid_close_date = date_input.value
        // date_input_bid_open.value = bid_close_date;
        document.getElementById('bid_opening_date').setAttribute('min', bid_close_date)
    }

    date_input.onchange = function () {
        bid_close_date = date_input.value
        // date_input_bid_open.value = bid_close_date;
        document.getElementById('bid_opening_date').setAttribute('min', bid_close_date)
    }

    /* -------------- End of on date change of closing tender ---------- */
})

// if (get_cookie('ad_id_e') == '') {
//     window.location.href = '/admin/login'
// }
var tr
var col = []
var table = document.getElementById('content_table')
var tabCell
var response
var ad_id = get_cookie('ad_id')
var ad_dept_id = get_cookie('ad_dept_id')
var ad_org_id = get_cookie('ad_org_id')
var file1_uri = null
var file2_uri = null
var zip_link = null

// var create_form = document.getElementById("create_input_details");
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
var xhr = new XMLHttpRequest()
// xhr.withCredentials = true;

xhr.onload = function () {
    if (this.status == 200) {
        response = JSON.parse(this.responseText)

        for (var i = 0; i < response.length; i++) {
            for (var key in response[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key)
                }
            }
        }
        for (var i = 0; i < response.length; i++) {
            tr = table.insertRow(-1)
            tr.setAttribute('id', response[i]['et_id'])

            tabCell = tr.insertCell(-1)
            if (response[i]['is_approved'] == 1) {
                tabCell.innerHTML = response[i]['et_tender_ref_no'] + `<sup>approved</sup>`
            } else tabCell.innerHTML = response[i]['et_tender_ref_no']
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = response[i]['et_title']
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = response[i]['et_tender_desc']
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = response[i]['dept_name']
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = response[i]['et_last_date_apply'].slice(0, 10)
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = response[i]['et_bidding_date'].slice(0, 10)
            tabCell = tr.insertCell(-1)
            tabCell.innerHTML = '<a href=/tender/' + response[i]['et_file_uri'] + ' target="_blank">link</a>'
            tabCell = tr.insertCell(-1)
            if (response[i]['is_approved'] == 1) {
            } else {
                tabCell.innerHTML = "<button class='update' id=" + i + " onclick='update_td(" + i + ")'><i class='far fa-edit' style='font-size:20px;'></i></button><button class='delete' id=" + i + " onclick='delete_td(" + i + ")'><i class='far fa-trash-alt' style='font-size:20px;'></i></button>"
            }
        }
    } else if (this.status == 404) {
        alert('No tenders to show')
    } else {
        alert('Check Network')
    }
}

xhr.open('POST', '/tender_dept')
xhr.setRequestHeader('Content-Type', 'application/json')
var data = JSON.stringify({ dept_id: ad_dept_id })
//dept id should be take from cookies

xhr.send(data)

// file upload 1
jQuery('document').ready(function () {
    // console.log("file 1 uploading");
    var input = document.getElementById('file1')
    var formdata = false
    if (window.FormData) {
        formdata = new FormData()
    }
    input.addEventListener(
        'change',
        function (evt) {
            var i = 0,
                len = this.files.length,
                img,
                reader,
                file

            for (; i < len; i++) {
                file = this.files[i]

                if (!!file.type.match(/pdf.*/)) {
                    if (window.FileReader) {
                        reader = new FileReader()
                        reader.onloadend = function (e) {
                            //showUploadedItem(e.target.result, file.fileName);
                        }
                        reader.readAsDataURL(file)
                    }

                    if (formdata) {
                        formdata.append('tender_pdf', file)
                        formdata.append('extra', 'extra-data')
                    }

                    if (formdata) {
                        jQuery.ajax({
                            url: 'fileupload',
                            type: 'POST',
                            data: formdata,
                            processData: false,
                            contentType: false,
                            success: function (res) {
                                alert('uploaded')
                                res = JSON.parse(res)
                                file1_uri = res.filename
                                if (file2_uri != null && file1_uri != null) {
                                    // document.getElementById("get_link").style.display = "block";
                                }
                            },
                        })
                    }
                } else {
                    alert('Not a vaild pdf!')
                }
            }
        },
        false
    )
})

//file 2 upload

jQuery('document').ready(function () {
    // console.log("file 1 uploading");
    var input2 = document.getElementById('file2')
    // input.display = none;
    var formdata2 = false
    if (window.FormData) {
        formdata2 = new FormData()
    }
    input2.addEventListener(
        'change',
        function (evt) {
            var i = 0,
                len = this.files.length,
                img,
                reader,
                file

            for (; i < len; i++) {
                file = this.files[i]

                if (!!file.type.match(/pdf.*/)) {
                    if (window.FileReader) {
                        reader = new FileReader()
                        reader.onloadend = function (e) {
                            //showUploadedItem(e.target.result, file.fileName);
                        }
                        reader.readAsDataURL(file)
                    }

                    if (formdata2) {
                        formdata2.append('tender_pdf', file)
                        formdata2.append('extra', 'extra-data')
                    }

                    if (formdata2) {
                        jQuery.ajax({
                            url: 'fileupload',
                            type: 'POST',
                            data: formdata2,
                            processData: false,
                            contentType: false,
                            success: function (res) {
                                alert('uploaded')
                                res = JSON.parse(res)
                                file2_uri = res.filename
                                if (file2_uri != null && file1_uri != null) {
                                    // document.getElementById("get_link").style.display = "block";
                                }
                            },
                        })
                    }
                } else {
                    alert('Not a vaild pdf!')
                }
            }
        },
        false
    )
})

function display_form() {
    $('#create_input_details').toggle()
    console.log('dsiplay from called')
}

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/
    if (!dateString.match(regEx)) return false // Invalid format
    var d = new Date(dateString)
    var dNum = d.getTime()
    if (!dNum && dNum !== 0) return false // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString
}

function update_td(clicked_id) {
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
                input: 'textarea',
                title: 'Tender Title',
                inputValue: response[clicked_id].et_title,
            },
            {
                input: 'textarea',
                title: 'Tender Description',
                inputValue: response[clicked_id].et_tender_desc,
            },
            {
                title: 'Closing Date',
                inputValue: response[clicked_id].et_last_date_apply.slice(0, 10),
                input: 'text',
                inputPlaceholder: 'YYYY-MM-DD',
                inputValidator: (value) => {
                    if (!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
                },
            },
            {
                input: 'text',
                title: 'Bid opening date',
                inputValue: response[clicked_id].et_bidding_date.slice(0, 10),
                inputPlaceholder: 'YYYY-MM-DD',
                inputValidator: (value) => {
                    if (!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
                },
            },
            {
                input: 'number',
                title: 'Tender Fee',
                inputValue: response[clicked_id].et_tender_fee,
            },
        ])
        .then((result) => {
            if (result.value) {
                const answers = JSON.stringify(result.value)
                console.log(result.value)
                Swal.fire({
                    title: 'All done!',
                    html: `
				        <h3>Updated Tender:</h3>
				        
				        <h4>Tender Title:</h4>${result.value[0]}<br>
				        <h4>Tender Description:</h4>${result.value[1]}<br>	
				        <h4>Tender Closing Date:</h4>${result.value[2]}<br>
				        <h4>Tender Bid Opening Date:</h4>${result.value[3]}<br>
				        <h4>Tender Fee:</h4>${result.value[4]}<br>

				      `,
                    confirmButtonText: 'Confirm',
                    showCancelButton: true,
                }).then((result2) => {
                    if (result2.value) {
                        console.log(result, result2)

                        // var data = JSON.stringify({
                        // 	"et_id":response[clicked_id]['et_id'] ,
                        // 	"et_title": result.value[1],
                        // 	"et_tender_fee":result.value[5] ,
                        // 	"et_tender_ref_no":result.value[0] ,
                        // 	"et_tender_desc":result.value[2] ,
                        // 	"et_last_date_apply":result.value[3] ,
                        // 	"et_bidding_date":result.value[4] ,
                        // 	"et_file_uri":result.value[6] ,
                        // });

                        // var data = "{\n    \"et_id\":"+response[clicked_id]['et_id']+",\n    \"et_title\": \""+result.value[1]+"\",\n    \"et_tender_fee\": \""+result.value[5]+"\",\n    \"et_tender_ref_no\": \""+result.value[0]+"\",\n    \"et_tender_desc\": \""+result.value[2]+"\",\n    \"et_last_date_apply\": \""+result.value[3]+"\",\n    \"et_bidding_date\": \""+result.value[4]+"\",\n    \"et_file_uri\": \""+result.value[6]+"\"\n}";
                        // console.log(data)

                        // var xhr = new XMLHttpRequest();
                        // xhr.withCredentials = true;

                        // xhr.addEventListener("readystatechange", function() {
                        //   if(this.readyState === 4) {
                        //     console.log(this.responseText);
                        //   }
                        // });

                        // xhr.open("POST", "http://"+IP+":8081/update_tender");

                        // xhr.send(data);

                        var data = JSON.stringify({
                            et_id: response[clicked_id]['et_id'],
                            et_title: result.value[0],
                            et_tender_fee: result.value[4],
                            et_tender_desc: result.value[1],
                            et_last_date_apply: result.value[2],
                            et_bidding_date: result.value[3],
                        })

                        var xhr = new XMLHttpRequest()
                        // xhr.withCredentials = true;

                        xhr.addEventListener('readystatechange', function () {
                            if (this.readyState === 4) {
                                console.log(this.responseText)
                                alert('updated')

                                window.setTimeout(function () {
                                    window.location.href = '/admin/dashboard'
                                }, 200)
                            }
                        })

                        xhr.open('POST', '/update_tender')
                        xhr.setRequestHeader('Content-Type', 'application/json')

                        xhr.send(data)
                    }
                })
            }
        })
}

//not used just for refernce
function update_td1(clicked_id) {
    // body...
    var data = JSON.stringify({
        et_id: 123,
        et_title: 'Procurement of computers',
        et_tender_fee: '1200',
        et_tender_ref_no: 'ITC123',
        et_tender_desc:
            'Procurement of Computers, Software and Services. The purpose of this policy is to provide a defined process for both the new and recurring procurement (through purchase or lease) of computer hardware, software and services using Washington University funds or grant funds administered by Washington University.',
        et_last_date_apply: '2020-03-10',
        et_bidding_date: '2020-03-13',
        et_file_uri: 'https://www.youtube.com/watch?v=u8XFFTWwSvY&feature=youtu.be',
    })

    var xhr = new XMLHttpRequest()
    // xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText)
        }
    })

    xhr.open('POST', '/update_tender')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(data)
}

function delete_td(clicked_id) {
    // body...
    // alert("delete "+clicked_id);
    Swal.fire({
        title: 'Are you sure delete ' + response[clicked_id].et_tender_ref_no + ' tender ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#663EFD',
        cancelButtonColor: '#a6a6a6',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.value) {
            var xhr = new XMLHttpRequest()
            // xhr.withCredentials = true;

            xhr.onload = function () {
                if (this.status == 200) {
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
                    window.setTimeout(function () {
                        window.location.href = '/admin/dashboard'
                    }, 200)
                } else if (this.status == 400) {
                    Swal.fire('Failed to delete', 'Some error', 'error')
                } else {
                    alert('Check Network')
                }
            }

            xhr.open('POST', '/delete_tender')
            xhr.setRequestHeader('Content-Type', 'application/json')

            xhr.send(JSON.stringify({ et_id: response[clicked_id].et_id }))
        }
    })
}

function add_td() {
    display_form()

    //         	Swal.mixin({

    //   confirmButtonText: 'Next &rarr;',
    //   progressSteps: ['1', '2', '3','4','5','6','7'],
    //   showCancelButton: true,
    // 	  inputValidator: (value) => {
    // 	    if (!value) {
    // 	      return 'Empty feild!'
    // 	    }
    // 	  }

    // }).queue([
    // {
    // 	input: 'text',
    //   	title: 'Tender Refernce number',
    //   	// inputValue : response[clicked_id].et_tender_ref_no
    // },
    //   {
    //   	input: 'textarea',
    //   	title: 'Tender Title',
    //     // inputValue : response[clicked_id].et_title,
    // },
    // {
    // 	input: 'textarea',
    //   title:'Tender Description',
    //   // inputValue : response[clicked_id].et_tender_desc
    // },
    //  {
    //  	title:'Closing Date',
    //  // inputValue :response[clicked_id].et_last_date_apply,
    //  input: 'text',
    //  inputPlaceholder: 'YYYY-MM-DD'
    //  ,
    // 	  inputValidator: (value) => {
    // 	    if(!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
    // 	  }
    // },
    // {
    // 	input: 'text',
    //   title:'Bid opening date',
    //   // inputValue :response[clicked_id].et_bidding_date,
    //  inputPlaceholder: 'YYYY-MM-DD'
    //  ,
    // 	  inputValidator: (value) => {
    // 	    if(!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
    // 	  }
    // },
    // {
    // 	input: 'number',
    //   	title:'Tender Fee',
    //   	// inputValue :response[clicked_id].et_tender_fee
    // },
    // {
    // 	input: 'textarea',
    //   title:'Reference File url',
    //   // inputValue :response[clicked_id].et_file_uri
    // }
    // ]).then((result) => {
    //   if (result.value) {
    //     const answers = JSON.stringify(result.value)
    //     console.log(result.value)
    //     Swal.fire({
    //       title: 'All done!',
    //       html: `
    //         <h3>Preview Tender:</h3>

    //         <h4>Tender Reference No:</h4>${result.value[0]}
    //         <h4>Tender Title:</h4>${result.value[1]}
    //         <h4>Tender Description:</h4>${result.value[2]}
    //         <h4>Tender Closing Date:</h4>${result.value[3]}
    //         <h4>Tender Bid Opening Date:</h4>${result.value[4]}
    //         <h4>Tender Fee:</h4>${result.value[5]}
    //         <h4>Reference file uri:</h4>${result.value[6]}

    //       `,
    //       confirmButtonText: 'Lovely!'
    //     })
    //   }
    // })
}

function add_tender() {
    console.log('add tender called')
    // var ref_no = document.getElementById('ref_no').value
    var title = document.getElementById('title').value
    var fee = document.getElementById('fee').value
    var closing_date =String( new Date(document.getElementById('closing_date').value))
    var bid_opening_date = String (new Date(document.getElementById('bid_opening_date').value))
    // var link = document.getElementById("link").value
    var description = document.getElementById('description').value
    console.log("bid",bid_opening_date,closing_date)

    // console.log('add tender called' + (closing_date.getTime() > bid_opening_date.getTime()) + Date(closing_date) + Date(bid_opening_date))

    if (title.length < 1) {
        alert('Enter Title')
        return false
    } else if (isNaN(fee) || fee < 0 || fee.length < 1) {
        alert('Invalid Tender fee')
        return false
    } else if (closing_date.length < 1 || closing_date=="Invalid Date") {
        alert('Enter Closing date')
        return false
    } else if (bid_opening_date.length < 1 || bid_opening_date== "Invalid Date") {
        alert('Enter Bid opening date')
        return false
    } else if (description.length < 1) {
        alert('Enter Description')
        return false
    } else if (zip_link == null) {
        alert('Upload documents and Generate Link')
        return false
    } else {
        var xhr = new XMLHttpRequest()
        // xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                console.log(this.responseText)

                alert('successfully added')
                window.setTimeout(function () {
                    window.location.href = '/admin/dashboard'
                }, 200)
            }
        })

        xhr.open('POST', '/create_tender')
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.send(
            JSON.stringify({
                et_title: title,
                et_tender_fee: fee,
                et_tender_desc: description,
                et_last_date_apply:convert(closing_date),
                et_bidding_date:convert( bid_opening_date),
                et_file_uri: zip_link,
                dept_id: ad_dept_id,
            })
        )
        //imp here dept id is fixed for now but it shoud be taken from cookies
    }
}

function get_link() {
    // body...
    if (file1_uri == null && file2_uri == null) {
        alert('Upload File first to generate link')
        return false
    }
    var data = JSON.stringify({ file1_uri: file1_uri, file2_uri: file2_uri })

    var xhr = new XMLHttpRequest()

    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText)
            document.getElementById('get_link').style.display = 'none'
            document.getElementById('create_t').style.display = ''
            var res = JSON.parse(this.responseText)
            zip_link = res.zip_link
        } else if (this.status == 404) {
            console.log(this.responseText)
        }
    }

    xhr.open('POST', '/generate_zip')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(data)
}
function select_files(value) {
    // body...
    document.getElementById('get_link').style.display = 'inline-block'
    if (value == '0') {
        //no file condition
        zip_link = 'uploads/sample.zip'
        document.getElementById('get_link').style.display = 'none'
        document.getElementById('create_t').style.display = ''
        document.getElementById('div_f1').style.display = 'none'
        document.getElementById('div_f2').style.display = 'none'
    } else if (value == '1') {
        //technical file only
        file2_uri = ' '
        file1_uri = null
        // document.getElementById("create_t").style.display = "none";
        document.getElementById('div_f1').style.display = ''
        document.getElementById('div_f2').style.display = 'none'
    } else if (value == '2') {
        //Boq file only
        file1_uri = ' '
        file2_uri = null
        // document.getElementById("create_t").style.display = "none";
        document.getElementById('div_f1').style.display = 'none'
        document.getElementById('div_f2').style.display = ''
    } else if (value == '3') {
        ///both file
        file1_uri = null
        file2_uri = null
        // document.getElementById("create_t").style.display = "none";
        document.getElementById('div_f1').style.display = ''
        document.getElementById('div_f2').style.display = ''
    }
}
$(document).keydown(function (e) {
    if ($('#search_bar').is(':focus') || $('#search_button').is(':focus')) {
        if (e.which === 13 && $('#search_bar').val().trim() !== '') {
            searchResults()
        }
    }
})

function searchResults() {
    let search_array = []
    let search_string = $('#search_bar').val().trim().toLowerCase()
    for (let i = 0; i < response.length; i++) {
        if (response[i]['et_tender_ref_no'].toLowerCase().indexOf(search_string) !== -1 || response[i]['et_title'].toLowerCase().indexOf(search_string) !== -1 || response[i]['et_tender_desc'].toLowerCase().indexOf(search_string) !== -1) {
            search_array.push(response[i])
        }
    }
    console.log(search_array)
}
