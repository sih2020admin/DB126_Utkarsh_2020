'use strict'
var IP = 'localhost'
document.writeln('<script src="/javascript/jquery-3.4.1.min.js" type="text/javascript"></sc' + 'ript>')
function get_cookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}
function delete_cookies() {
    // body...
    document.cookie = 'vcd_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'vd_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'ad_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'ad_dept_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'ad_org_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'digi_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    /*     console.log('written to cookie ', decodeURIComponent(document.cookie))*/
}
function delete_cookies_feild(feild) {
    // body...
    document.cookie = feild + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    console.log('written to cookie ', decodeURIComponent(document.cookie))
}
function add_to_cookie(name, value) {
    // body...
    var d = new Date()
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = name + '=' + value + ';' + expires + ';' //save in cookie
    console.log('written to cookie', decodeURIComponent(document.cookie))
}
function theFunctionA() {
    console.log('the function called   A ')
    Swal.fire({
        title: 'Do You want to Logout?',
        text: 'will redirect to login',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#663EFD',
        cancelButtonColor: '#a6a6a6',
        confirmButtonText: 'Logout',
    }).then((result) => {
        if (result.value) {
            $.post('/admin/logout').then((result) => {
                window.location.href = `/1admin_login.html`
            })
        }
    })
}

function theFunctionV() {
    console.log('the function called    V')
    Swal.fire({
        title: 'Do You want to Logout?',
        text: 'will redirect to login',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#663EFD',
        cancelButtonColor: '#a6a6a6',
        confirmButtonText: 'Logout',
    }).then((result) => {
        if (result.value) {
            $.post('/user/logout').then((result) => {
                window.location.href = `/login`
            })
        }
    })
}

var style = document.createElement('style')
style.innerHTML = `
.swal2-title{
  color: var(--main_color);
}
.swal2-confirm.swal2-styled{
  width: auto;
  height: auto;
  font-size: 16px;
  font-weight: 300;
  border-radius: 5px; 
  background-color: var(--main_color);
  border: none;
  outline: none;
  overflow: hidden;
  box-shadow: none !important;
  color: #ffffff;
  padding: 5px 10px;
}
.swal2-cancel.swal2-styled{
  width: auto;
  height: auto;
  font-size: 16px;
  font-weight: 300;
  border-radius: 5px; 
  background-color: #cccccc;
  border: none;
  outline: none;
  color: #ffffff;
  padding: 5px 10px;
}   
.swal2-icon.swal2-warning, .swal2-icon.swal2-warning.swal2-icon-show{
  color: var(--main_color);
  border-color: var(--main_color);
}
`
document.head.appendChild(style)
