"use strict";
console.log("hello cookies");
function get_cookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            console.log("cookies ", cname, c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    console.log(cname + " not defined in cookie");
    return "";
}
function delete_cookies() {
    // body...
    document.cookie = "vcd_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "vd_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "ad_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "ad_dept_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "ad_org_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "digi_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log("written to cookie ", decodeURIComponent(document.cookie));
}
function delete_cookies_feild(feild) {
    // body...
    document.cookie = feild + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    console.log("written to cookie ", decodeURIComponent(document.cookie));
}
function add_to_cookie(name, value) {
    // body...
    var d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";"; //save in cookie
    console.log("written to cookie", decodeURIComponent(document.cookie));
}
