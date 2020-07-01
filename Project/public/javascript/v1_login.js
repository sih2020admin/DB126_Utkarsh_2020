var x = document.getElementById('enter_otp')
var y = document.getElementById('otp')
var z = document.getElementById('confirm')
var o = document.getElementById('oicon')
var login_button = document.getElementById('login')
var message
document.getElementById('username').value = ''
console.log('hello v1_login')
// delete_cookies();
function show() {
    var userid = document.getElementById('username').value
    var passw = document.getElementById('pass').value
    if (userid.length == 0) {
        document.getElementById('tc').innerHTML = 'Username cannot be Empty'
    } else if (passw.length == 0) {
        document.getElementById('tc').innerHTML = 'Password cannot be Empty'
    } else {
        var xhr = new XMLHttpRequest()
        var url = '/login_api'
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ username: userid, password: passw }))

        document.getElementById('username').value = ''
        document.getElementById('pass').value = ''

        xhr.onload = function () {
            if (this.status == 200) {
                message = JSON.parse(this.responseText)
                //alert(message.aadhar);
                document.getElementById('username').disabled = true
                document.getElementById('pass').disabled = true
                login_button.style.visibility = 'hidden'
                document.getElementById('tc').innerHTML = ''
                document.getElementById('tc3').innerHTML = 'OTP has been successfully sent'
                document.getElementById('not_registered').innerHTML = ''

                x.style.display = ''
                y.style.display = 'inline-block'
                o.style.display = 'inline-block'
                z.style.display = ''

                document.getElementById('confirm').onclick = function () {
                    document.getElementById('icon').style.display = 'inline-block'
                    var url = 'https://' + location.hostname + ':8081/verifyOTP_login'
                    xhr.open('POST', url)
                    xhr.setRequestHeader('Content-Type', 'application/json')
                    var otp_s=y.value
                    if(otp_s.length <6){
                        document.getElementById('icon').style.display = 'none'
                        document.getElementById('tc1').innerHTML = 'Invalid OTP '
                        document.getElementById('tc2').style.display = 'inline-block'
                        document.getElementById('tc2').innerHTML = 'Directing to Relogin'
                        document.getElementById('otp').disabled = true
                        setTimeout(function () {
                            location = '/login'
                        }, 5000)

                    }
                    else{
                        xhr.send(JSON.stringify({ aadharno: message.aadhar,vcd_id :message.vcd_id , vd_id: message.vd_id, digi_access : message.digi_access, OTP: y.value }))
                    }
                    document.getElementById('otp').value = ''

                    xhr.onload = function () {
                        if (this.status == 200) {
                            //alert("OTP verified");
                            document.getElementById('otp').disabled = true
                            var vcd_id_c = message.vcd_id
                            var vd_id_c = message.vd_id
                            var digi_access = message.digi_access
                            add_to_cookie('vcd_id', vcd_id_c)     //modf_sanket when sankets requiremnt is over need to remove this
                            add_to_cookie('vd_id', vd_id_c)
                            add_to_cookie('digi_access', digi_access)

                            setTimeout(function () {
                                location = '/profile'
                            }, 1500)
                        } else if (this.status == 400) {
                            document.getElementById('icon').style.display = 'none'
                            document.getElementById('tc1').innerHTML = 'Invalid OTP '
                            document.getElementById('tc2').style.display = 'inline-block'
                            document.getElementById('tc2').innerHTML = 'Directing to Relogin'
                            document.getElementById('otp').disabled = true
                            setTimeout(function () {
                                location = '/login'
                            }, 5000)
                        } else {
                            document.getElementById('icon').style.display = 'none'
                            document.getElementById('tc1').innerHTML = 'Some Error Occured'
                        }
                    }
                }
            } else if (this.status == 400) {
                document.getElementById('tc').innerHTML = 'Invalid Username or Password'
            } else {
                document.getElementById('tc').innerHTML = 'Some Error Occured'
            }
        }
    }
}

//document.getElementById('icon').style.display = 'none'
