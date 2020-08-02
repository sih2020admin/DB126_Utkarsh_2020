document.getElementById('username').value = ''
function show() {
    var userid = document.getElementById('username').value
    var passw = document.getElementById('pass').value
    if (userid.length == 0) {
        document.getElementById('tc').innerHTML = 'Username cannot be Empty'
    } else if (passw.length == 0) {
        document.getElementById('tc').innerHTML = 'Password cannot be Empty'
    } else {
        var xhr = new XMLHttpRequest()
        var url = '/login/super/admin'
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ username: userid, password: passw }))
        xhr.onload = function () {
            if (this.status == 200) {
                document.getElementById('tc').innerHTML = ''
                var message = JSON.parse(this.responseText)
                // document.cookie="cookie="+message+";";
                // console.log(document.cookie);
                var ad_id_c = message.ad_id
                var ad_dept_id_c = message.ad_dept_id
                var ad_org_id_c = message.ad_org_id
                add_to_cookie('ad_id', ad_id_c)
                add_to_cookie('ad_dept_id', ad_dept_id_c)
                add_to_cookie('ad_org_id', ad_org_id_c)
                setTimeout(function () {
                    location = '/admin/dashboard'
                }, 1000)
            } else if (this.status == 400) {
                document.getElementById('tc').innerHTML = 'Invalid Username or Password'
            } else {
                document.getElementById('tc').innerHTML = 'Some Error Occured'
            }
        }
    }
    document.getElementById('username').value = ''
    document.getElementById('pass').value = ''
}
$(document).keydown(function (e) {
    if ($('#username').is(':focus') || $('#pass').is(':focus') || $('#login').is(':focus')) {
        if (e.which === 13) {
            show()
        }
    }
})
