document.getElementById('username').value = ''
function show() {
    var userid = document.getElementById('username').value
    var passw = document.getElementById('pass').value
    if (userid.length == 0) {
        document.getElementById('tc').innerHTML = 'Username cannot be Empty'
    } else if (passw.length == 0) {
        document.getElementById('tc').innerHTML = 'Password cannot be Empty'
    } else {
        console.table({username:userid,password:passw})
        var xhr = new XMLHttpRequest()
        var url = '/login/super_admin'
        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ username: userid, password: passw }))
        xhr.onload = function () {
            if (this.status == 200) {
                setTimeout(function () {
                    location = '/super-admin/interface'
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
