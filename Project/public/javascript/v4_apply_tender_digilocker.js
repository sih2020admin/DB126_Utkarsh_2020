var vcd_id = get_cookie('vcd_id') //will be used everywhere in digilocker code as vcd_id modf_sanket
var et_id = null //to store current et_id
var etd_id //to store current etd_id
var vcd_id = get_cookie('vcd_id')    //adding for time sake
var vd_id = get_cookie('vd_id')


var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
var url_string = window.location.href
var url = new URL(url_string)
var state = url.searchParams.get('state')

if (state) { //if url after digi code 
    var temp = state.split(':')
    et_id = temp[0]
    etd_id = temp[1]

} else {   //if normal url 
    et_id = (_a = urlParams.get('et_id')) === null || _a === void 0 ? void 0 : _a.toString()
    etd_id = (_a = urlParams.get('etd_id')) === null || _a === void 0 ? void 0 : _a.toString()
}
console.log(etd_id, et_id)


var check_digi_access;               //maintain flag of digi_access after getting from server

//global variables for storing file URI's
var Technical_file_uri
var BOQ_file_uri

//to decide which document is to be uploaded in digilocker depending upon flag
var Technical_or_BOQ = 0 //0 = no document uploaded yet, 1 = technical document uploaded, 2 = BOQ uploaded

/* ----------------------------- Start of on load code (redirect to digilocker sign in) --------------------------- */

//on window load check if user need to be redirected to digilocker sign in page
window.onload = function () {
    //on load of page... hide loader of back and upload button
    document.getElementById('icon2').style.display = 'none'
    document.getElementById('icon3').style.display = 'none'

    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
        if (this.status === 200) {
            res = JSON.parse(this.responseText)
            console.log(this.responseText, res)
            var status = res.status
            var etd_id = res.etd_id
            if (status == '100') {

                window.location.href = '/tender/payment?et_id=' + et_id + '&etd_id=' + etd_id
            }
            else if (status == '110') {

                // if (result.isConfirmed) window.location.href = '/tender/upload-documents?et_id=' + et_id + '&etd_id=' + etd_id


                //get param "state" from current url
                var url_string = window.location.href
                var url = new URL(url_string)
                var state = url.searchParams.get('state')
                var error_digi = url.searchParams.get('error')
                // console.log("permission denied by user", error_digi);

                var xhr = new XMLHttpRequest()
                check_digi_url = 'https://165.22.210.37:8081/check_digi_access'
                xhr.open('GET', check_digi_url, true)
                xhr.setRequestHeader('Content-Type', 'application/json')

                xhr.send();

                //xhr repsonse handling
                xhr.onload = function () {
                    var temp = JSON.parse(this.responseText)
                    if (this.status == 200) {
                        check_digi_access = temp.digi_access
                        console.log("check digi access", check_digi_access, typeof (check_digi_access));
                        //if user denies the permission on digilocker
                        if (state && error_digi) {
                            alert('Oops! You have rejected digilocker permission. We are redirecting you to digilocker please give us permission. Click "OK" to continue');

                            var temp = state.split(':')
                            et_id = temp[0]
                            etd_id = temp[1]

                            window.location.href = 'https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=DC8FB8CF&redirect_uri=https://165.22.210.37:8081/tender/upload-documents&state=' + et_id + ':' + etd_id
                        }
                        //check if url contains param "state"
                        else if (state) {
                            //get et_id and etd_id from "state" and update in global variable
                            var temp = state.split(':')
                            et_id = temp[0]
                            etd_id = temp[1]

                            // check if we have users digilocker account access
                            if (check_digi_access == "1") {
                                //If we have dig_access and param ("state") in url then no need of digilocker login
                                console.log('params found and we also have digi access')
                            } else {
                                //If we have params ("state") but not digilocker access
                                //then send parameters (authentication code, vcd_id) to our server

                                //get auth_code and state from the current browser uri
                                var code = url.searchParams.get('code')

                                //creating xhr request to make get_access_token api call on our server
                                //this api call will be then forwarded to digilocker
                                //response from digilocker will be given back to the server and then client respectively
                                var xhr = new XMLHttpRequest()
                                url = 'https://165.22.210.37:8081/get_access_token'
                                xhr.open('POST', url, true)
                                xhr.setRequestHeader('Content-Type', 'application/json')

                                xhr.send(
                                    JSON.stringify({
                                        code: code,
                                        id: vcd_id,     //modf_sanket
                                    })
                                )

                                //xhr repsonse handling
                                xhr.onload = function () {
                                    var temp = JSON.parse(this.responseText)
                                    if (this.status == 200) {
                                        // add_to_cookie('digi_access', '1')
                                        // console.log('digi_access successfully updated in cookies too')
                                        alert(temp.msg)
                                    } else if (this.status == 400) {
                                        alert(temp.error)
                                    } else {
                                        alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
                                    }
                                }
                            }
                        } else {
                            //if we don't have "state" params then take et_id and etd_id from params and update in global variables
                            et_id = url.searchParams.get('et_id')
                            etd_id = url.searchParams.get('etd_id')

                            // check if we have users digilocker account access
                            console.log("just check digi ", check_digi_access);
                            if (check_digi_access == "0") {
                                //if we don't have param "state" and also not digi_access
                                //then change url and redirect to digilocker
                                alert(`We don't have access to your digilocker account. please give access. Click "OK" to continue`)
                                window.location.href = 'https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=DC8FB8CF&redirect_uri=https://165.22.210.37:8081/tender/upload-documents&state=' + et_id + ':' + etd_id
                            } else {
                                //if we don't have param "state" in url but we have digi_access then no need of digilocker signin
                                console.log('We have digi_access but not parameters in url')
                            }
                        }
                    } else if (this.status == 400) {
                        alert(temp.error)
                    } else {
                        alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
                    }
                }
            }
            else if (status == '111') {

                if (result.isConfirmed) window.location.href = '/tender/confirmation?et_id=' + et_id + '&etd_id=' + etd_id

            } else if (status == '1111') {

                if (result.isConfirmed) window.location.href = '/tender/preview?et_id=' + et_id + '&etd_id=' + etd_id

            }
        } else if (this.status === 404) {

            if (result.isConfirmed) window.location.href = '/tender/apply?et_id=' + response[i].et_id

        } else {
            alert('Check Network')
        }
    }
    xhr.open('POST', '/get_etd_id')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ et_id: et_id }))

}

/* ------------------------------- End of on load code (redirect to digilocker sign in) --------------------------- */

/* --------------------------------- Start of display filename code ----------------------------------------------- */

//below variables will store directory ID's from digilocker
var current_id = '' //id of current directory
var parent_id = [] //id of ancesstors of current directory (required to backtrace)

var is_upload = 0 //check if upload button is clicked

//onclick function on "li" element of modal
function some() {
    $(document).ready(function () {
        $('li').click(function () {
            //if any li element is clicked
            var span_i_class = $(this).find('i').attr('class') //get details of image (whether a folder or file)
            if (span_i_class == 'fa fa-folder') {
                //if clicked li element is folder
                is_upload = 0 //update "upload" status to 0

                //update "current_id" and "parent_id"
                current_id = $(this).find('#file_id').text()
                p_id = $(this).find('#parent_id').text()
                parent_id.push(p_id)

                //get files from above updated "current_id"
                get_files()
            } else {
                //clicked li element is file
                alert('This is file')
            }
        })
    })
}

//Dynamically adds list of files recieved from digilocker to html page
function show_files(str) {
    console.log("response from digi on get files", str)
    var current = str.directory // get current directory name

    //update current directory name on modal
    var dir_element = document.getElementById('cur_dir')
    dir_element.innerHTML = 'Current Directory is : ' + current

    var item_array = str.items //get list of items in current directory

    var ul_element = document.getElementById('directory')
    ul_element.innerHTML = '' //Removing all prev li_elements

    //check if directory contains any items or not
    if (item_array.length == 0) {
        document.getElementById("no_doc").style.display = "block";
        //alert('This directory is empty');
        console.log("testing of no doc in digi directory");
    } else {
        document.getElementById("no_doc").style.display = "none";
        //First append "directory" list then append "file" list
        add_to_list('dir')
        add_to_list('file')

        //append files and folders to list
        function add_to_list(file_type) {
            console.log("Technical Or BOQ", Technical_or_BOQ);
            //console.log("is upload", is_upload);
            for (i = 0; i < item_array.length; i++) {
                //check which document has been uploaded to digilocker recently
                //accordingly display fileuri in console

                /*if (Technical_or_BOQ == 2) {
                    console.log("Testing sankey => " + item_array[i].name + "=>" + Technical_file_name + "=>" + is_upload);
                    if (item_array[i].name == Technical_file_name) {
                        // document.getElementById("fileURI").innerHTML = item_array[i].uri;
                        Technical_file_uri = item_array[i].uri
                        console.log('File URI for Technical Document is => ' + item_array[i].uri)
                    }

                    // console.log("call enter file uri in db", item_array[i].name, BOQ_file_name)
                    if (item_array[i].name == BOQ_file_name) {
                        // document.getElementById("fileURI").innerHTML = item_array[i].uri;
                        BOQ_file_uri = item_array[i].uri
                        console.log('File URI for BOQ document is => ' + item_array[i].uri)
                    }
                    console.log('Technical URI => ', Technical_file_uri)
                    console.log('BOQ URI =>', BOQ_file_uri)

                    var data = JSON.stringify({ etd_id: etd_id, f_type: 'link', f_uri: Technical_file_uri })

                    var xhr = new XMLHttpRequest()
                    xhr.addEventListener('readystatechange', function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText)
                            var data = JSON.stringify({ etd_id: etd_id, f_type: 'link', f_uri: BOQ_file_uri, tech_file: Technical_file_name, boq_file: BOQ_file_name })

                            var xhr = new XMLHttpRequest()

                            xhr.addEventListener('readystatechange', function () {
                                if (this.readyState === 4) {
                                    console.log(this.responseText)
                                    //modal.style.display = 'none'
                                    document.getElementById('digilocker').disabled = true
                                }
                            })

                            xhr.open('POST', 'https://165.22.210.37:8081/enter_file_uri2_db')
                            xhr.setRequestHeader('Content-Type', 'application/json')

                            xhr.send(data)
                        }
                    })

                    xhr.open('POST', 'https://165.22.210.37:8081/enter_file_uri1_db')
                    xhr.setRequestHeader('Content-Type', 'application/json')

                    xhr.send(data)
                }*/

                if (Technical_or_BOQ == 1) {
                    // console.log("Testing sankey => " + item_array[i].name + "=>" + Technical_file_name + "=>" + is_upload);
                    if (item_array[i].name == Technical_file_name) {
                        // document.getElementById("fileURI").innerHTML = item_array[i].uri;
                        Technical_file_uri = item_array[i].uri
                        console.log('File URI for Technical Document is => ' + item_array[i].uri)
                    }
                } else if (Technical_or_BOQ == 2) {
                    console.log("call enter file uri in db", item_array[i].name, BOQ_file_name)
                    if (item_array[i].name == BOQ_file_name) {
                        // document.getElementById("fileURI").innerHTML = item_array[i].uri;
                        BOQ_file_uri = item_array[i].uri
                        console.log('File URI for BOQ document is => ' + item_array[i].uri)
                        console.log('Technical URI => ', Technical_file_uri)
                        console.log('BOQ URI =>', BOQ_file_uri)

                        var data = JSON.stringify({ etd_id: etd_id, f_type: 'link', f_uri: Technical_file_uri })

                        var xhr = new XMLHttpRequest()
                        xhr.addEventListener('readystatechange', function () {
                            if (this.readyState === 4) {
                                console.log(this.responseText)

                                var xhr = new XMLHttpRequest()

                                xhr.addEventListener('readystatechange', function () {
                                    if (this.readyState === 4) {
                                        console.log(this.responseText)
                                        //modal.style.display = 'none'
                                        document.getElementById('digilocker').disabled = true
                                    }
                                })

                                xhr.open('POST', 'https://165.22.210.37:8081/enter_file_uri2_db')
                                xhr.setRequestHeader('Content-Type', 'application/json')

                                xhr.send(data)
                            }
                        })

                        xhr.open('POST', 'https://165.22.210.37:8081/enter_file_uri1_db')
                        xhr.setRequestHeader('Content-Type', 'application/json')

                        xhr.send(data)
                    }
                }

                //sorting of "directory" and "file" list
                if (item_array[i].type == file_type) {
                    var li_element = document.createElement('li')

                    //below span_element for folder or file image
                    var span_element = document.createElement('span')
                    var i_element = document.createElement('i')
                    if (item_array[i].type == 'dir') {
                        i_element.className = 'fa fa-folder'
                    } else {
                        i_element.className = 'fa fa-file'
                    }
                    i_element.setAttribute('aria-hidden', 'true')
                    span_element.append(i_element)
                    li_element.append(span_element)

                    //below span_element for file or folder name
                    span_element = document.createElement('span')
                    span_element.append(item_array[i].name)
                    span_element.setAttribute('id', 'name')
                    li_element.append(span_element)

                    //below span_element for file_uri or folder_id
                    span_element = document.createElement('span')
                    //This if-else has been written to sort files...
                    //first folders will be displayed and then files will be displayed
                    if (item_array[i].type == 'dir') {
                        span_element.append(item_array[i].id)
                        span_element.style.visibility = "hidden";
                    } else {
                        span_element.append(item_array[i].uri)
                    }
                    span_element.setAttribute('id', 'file_id')
                    li_element.append(span_element)

                    //below span element for parent_id
                    span_element = document.createElement('span')
                    span_element.append(item_array[i].parent)
                    span_element.setAttribute('id', 'parent_id')
                    span_element.style.visibility = "hidden";
                    li_element.append(span_element)

                    ul_element.append(li_element)
                }
            }
        }
    }
}

//This function will get content of a directory (using it's id)from digilocker
//will fetch self_uploaded documents from digilocker
function get_files() {
    if (parent_id.length == 0) {
        document.getElementById("back").style.display = "none";
    } else {
        document.getElementById("back").style.display = "";
    }
    //creating xhr request for api call
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/fetch_files'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    // var vcd_id = get_cookie('vcd_id');
    xhr.send(
        JSON.stringify({
            id: current_id,
            vcd_id: vcd_id,    //modf_sanket
        })
    ) //id is directory id (each directory in digilocker has unique id)

    //xhr repsonse handling
    xhr.onload = function () {
        var temp = JSON.parse(this.responseText)
        if (this.status == 200) {
            document.getElementById('icon2').style.display = 'none'
            some()
            show_files(temp)
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

//will fetch issued documents from digilocker
function get_files2() {
    //creating xhr request for api call
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/fetch_files2'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    var vcd_id = get_cookie('vcd_id')      //modf_sanket
    xhr.send(JSON.stringify({ vcd_id: vcd_id }))

    //xhr repsonse handling
    xhr.onload = function () {
        var temp = JSON.parse(this.responseText)
        if (this.status == 200) {
            some()
            show_files(temp)
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

/* ----------------------------------------- End of Display filename code ------------------------------------------- */

/* --------------------------------------- Start of modal functionality code ---------------------------------------- */

var modal = document.getElementById('myModal') // Get the modal
var span = document.getElementsByClassName('close')[0] // Get the <span> element that closes the modal

// When the user clicks the button, open the modal
function openModal() {
    if (document.getElementById('upload').value == '' || document.getElementById('upload1').value == '') document.getElementById('tc5').innerHTML = 'Documents Not Uploaded'
    else {
        //REfresh token API
        var xhr = new XMLHttpRequest()
        url = 'https://165.22.210.37:8081/refresh_token'
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.send(
            JSON.stringify({
                // "id": vcd_id
                id: vcd_id,           //modf_sanket
            })
        )

        //xhr repsonse handling
        xhr.onload = function () {
            var temp = JSON.parse(this.responseText)
            if (this.status == 200) {
                console.log('Your token has been refreshed successfully.')

                //on success display modal and fetch files;
                modal.style.display = 'flex'
                get_files()
            } else if (this.status == 400) {
                alert(temp.error)
            } else {
                alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
            }
        }
    }
}

//back button function of modal
$(document).ready(function () {
    //on click of back button
    $('#back').click(function () {
        document.getElementById('icon2').style.display = ''
        is_upload = 0
        var dir_element = document.getElementById('cur_dir')
        console.log(dir_element.innerHTML)
        if (dir_element.innerHTML != 'Current Directory is : /') {
            current_id = parent_id.pop()
            get_files()
        }
    })
})

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    //If both or none files are uploaded then only user can close modal
    if (Technical_or_BOQ == 0 || Technical_or_BOQ == 2) {
        modal.style.display = 'none'
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    //If both or none files are uploaded then only user can close modal
    if (Technical_or_BOQ == 0 || Technical_or_BOQ == 2) {
        if (event.target == modal) {
            modal.style.display = 'none'
        }
    }
}
/* ------------------------------------ End of Modal funcionality code -------------------------------------------- */

/* ------------------------------- Start of Upload file to digilocker Code ---------------------------------------- */
function uploadFiles() {
    //If Both files are uploaded to digilocker
    //ask user if he/she wants to revoke access token;
    if (Technical_or_BOQ == 2) {
        Technical_or_BOQ = 0
        alert('Do you want to revoke your digilocker token?')
    } else {
        //hide fa-fa spinner on upload button
        document.getElementById('icon3').style.display = ''
        //update "upload" status
        is_upload = 1

        //get digilocker path where file needs to be uploaded
        var dir_element = document.getElementById('cur_dir')
        var temp = dir_element.innerHTML
        temp = temp.split('Current Directory is : /')
        temp = temp[1]

        //call Upload File API
        var xhr = new XMLHttpRequest()
        url = 'https://165.22.210.37:8081/upload_files'
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('vcd_id', vcd_id)       //modf_sanket
        xhr.setRequestHeader('path', temp)

        //check which file to be uploaded and send that file name through xhr
        if (Technical_or_BOQ == 0) {
            xhr.send(
                JSON.stringify({
                    filename: Technical_file_name,
                    flag: 0,
                    etd: etd_id
                })
            )
        } else if (Technical_or_BOQ == 1) {
            xhr.send(
                JSON.stringify({
                    filename: BOQ_file_name,
                    flag: 1,
                    etd: etd_id
                })
            )
        }

        //xhr repsonse handling
        xhr.onload = function () {
            if (this.status == 200) {
                console.log('Your file has been uploaded successfully.')
                document.getElementById('icon3').style.display = 'none'
                if (Technical_or_BOQ == 0) {
                    Technical_or_BOQ = 1
                    console.log('TECHNICAL get file START')
                    get_files()
                    console.log('TECHNICAL get file STOP')
                    //alert('Your Technical document has been uploaded successfully with hash =>' + this.responseText)
                } else if (Technical_or_BOQ == 1) {
                    document.getElementById("back").style.display = "none";
                    document.getElementById("uploadDigi").style.display = "none";
                    Technical_or_BOQ = 2
                    console.log('BOQ get file START')
                    get_files()
                    console.log('BOQ get file STOP')
                    //alert('Your BOQ document has been uploaded successfully with hash =>' + this.responseText)
                }
                // current_id = ''
                // parent_id = []
                // is_upload = 0
                // console.log('RESET get file START')
                // get_files()
                // console.log('RESET get file STOP')
            } else if (this.status == 400) {
                alert(temp.error)
            } else {
                alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
            }
        }
    }
}

function uploadFiles2() {
    //hide fa-fa spinner on upload button
    document.getElementById('icon3').style.display = ''
    //update "upload" status
    is_upload = 1

    //get digilocker path where file needs to be uploaded
    var dir_element = document.getElementById('cur_dir')
    var temp = dir_element.innerHTML
    temp = temp.split('Current Directory is : /')
    temp = temp[1]

    //call Upload File API
    var xhr = new XMLHttpRequest()
    url = 'https://165.22.210.37:8081/upload_files'
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('vcd_id', vcd_id)       //modf_sanket
    xhr.setRequestHeader('path', temp)

    xhr.send(
        JSON.stringify({
            filename: Technical_file_name,
        })
    )

    //xhr repsonse handling
    xhr.onload = function () {
        if (this.status == 200) {
            console.log('Your file has been uploaded successfully.')
            // document.getElementById('icon3').style.display = 'none'
            Technical_or_BOQ = 1

            //call Upload File API
            var xhr = new XMLHttpRequest()
            url = 'https://165.22.210.37:8081/upload_files'
            xhr.open('POST', url, true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('vcd_id', vcd_id)       //modf_sanket
            xhr.setRequestHeader('path', temp)

            xhr.send(
                JSON.stringify({
                    filename: BOQ_file_name,
                })
            )

            //xhr repsonse handling
            xhr.onload = function () {
                if (this.status == 200) {
                    console.log('Your file has been uploaded successfully.')
                    document.getElementById('icon3').style.display = 'none'
                    Technical_or_BOQ = 2

                    console.log('get both file START')
                    get_files()
                    console.log('get both file STOP')

                    //alert('Your Technical document has been uploaded successfully with hash =>' + this.responseText)
                } else if (this.status == 400) {
                    alert(temp.error)
                } else {
                    alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
                }
            }

            // console.log('TECHNICAL get file START')
            // get_files()
            // console.log('TECHNICAL get file STOP')
            //alert('Your Technical document has been uploaded successfully with hash =>' + this.responseText)
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

/* ------------------------------- End of Upload file to digilocker Code ---------------------------------------- */

/* ------------------------------ Start of revoke digilocker token ------------------------------ */

function redirect_to_confirm_page() {
    //update tender status API call
    var data = JSON.stringify({ etd_id: etd_id })
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
            console.log(this.responseText)
        }
    })

    xhr.open('POST', 'https://165.22.210.37:8081/apply_tender_s3')
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send(data)

    xhr.onload = function () {
        if (this.status == 200) {
            window.location.href = 'https://165.22.210.37:8081/tender/confirmation?et_id=' + et_id + '&etd_id=' + etd_id
        } else if (this.status == 400) {
            alert(temp.error)
        } else {
            alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
        }
    }
}

//on click of done button in s3.html page
function done() {
    if (document.getElementById('name').value == '' || document.getElementById('email').value == '' || document.getElementById('reason').value == '' || document.getElementById('location').value == '' || document.getElementById('upload').value == '' || document.getElementById('upload1').value == '')
        document.getElementById('tc6').innerHTML = 'Form Is Incomplete'
    else {
        document.getElementById('icon1').className = 'fa fa-spinner fa-spin'
        document.getElementById('tc6').innerHTML = ''
        redirect_to_confirm_page();
        //alert("done function"+et_id);
        /*if (confirm('Do you want to revoke digilocker token?')) {
            //creating xhr request for api call
            var xhr = new XMLHttpRequest()
            url = 'https://165.22.210.37:8081/revoke_token'
            xhr.open('POST', url, true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(
                JSON.stringify({
                    vcd_id: vcd_id,         // modf_sanket
                })
            )

            //xhr repsonse handling
            xhr.onload = function () {
                if (this.status == 200) {
                    alert('Your token has been revoked successfully')
                    redirect_to_confirm_page()
                } else if (this.status == 400) {
                    alert(temp.error)
                } else {
                    alert('Some Other Error ', xhr.status, ' with statusText ', xhr.statusText)
                }
            }
        } else {
            console.log('Token revocking process cancelled')
            redirect_to_confirm_page()
        }*/
    }
}
/* ------------------------------ End of revoke digilocker token ------------------------------ */

/* ---------------------------- End of Digilocker js code -------------------------------------- */
