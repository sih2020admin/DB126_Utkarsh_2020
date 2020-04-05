"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var et_id = location.toString().split("=%20")[1];
console.log(et_id);
$.ajax({
    url: "http://"+IP+":8081/get_application",
    async: true,
    method: "POST",
    data: {
        et_id: et_id
    },
    success: function (response) {
        var e_1, _a;
        var count = 1;
        try {
            for (var response_1 = __values(response), response_1_1 = response_1.next(); !response_1_1.done; response_1_1 = response_1.next()) {
                var x = response_1_1.value;
                console.log(response);
                $("<div></div>", {
                    class: "vendor_details",
                    id: count,
                    html: "  <div class=\"hello\"><label for=\"v_name" + count + "\">Name</label><p id=\"v_name" + count + "\"> " + x.v_name + "</p></div>\n                        <label for=\"v_mobile" + count + "\">Mobile Number</label><p id=\"v_mobile" + count + "\"> " + x.v_mobile + "</p>\n                        <label for=\"v_reg_no" + count + "\">Register Number</label><p id=\"v_reg_no" + count + "\"> " + x.v_reg_no + "</p>\n                        <label for=\"v_email" + count + "\">Email Address</label><p id=\"v_email" + count + "\"> " + x.v_email + "</p>\n                        <label for=\"v_gst" + count + "\">GST Number</label><p id=\"v_gst" + count + "\"> " + x.v_gst + "</p>\n                        <label for=\"v_pan" + count + "\">Pan Number</label><p id=\"v_pan" + count + "\"> " + x.v_pan + "</p>\n                        <label for=\"v_yoe" + count + "\">Year of Establishment</label><p id=\"v_yoe" + count + "\"> " + x.v_yoe + "</p>\n                        <label for=\"v_address" + count + "\">Address</label><p id=\"v_address" + count + "\"> " + x.v_address + "</p>\n                        <input type=\"hidden\" id=\"et_id" + count + "\" value=\"" + x.et_id + "\">                       \n                         <input type=\"hidden\" id=\"etd_id" + count + "\" value=\"" + x.etd_id + "\">\n                        <label for=\"v_pincode" + count + "\">Pincode</label><p id=\"v_pincode" + count + "\"> " + x.v_pincode + "</p>\n                        <button id=approve_button" + count + " onclick=approve(" + count + ")>Approve</button>"
                }).appendTo("#main_content");
                count++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (response_1_1 && !response_1_1.done && (_a = response_1.return)) _a.call(response_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    },
    error: function (xhr, error_type, exception) {
        if (xhr.status == 0) {
            console.log("No response from Server");
            alert("No response from server");
        }
        if (xhr.status == 400) {
            console.log("Bad Request");
            alert("Bad Request");
        }
    }
});
function approve(value) {
    alertify.confirm('Final Confirmation', 'Would you like to approve this application for this tender?', function () {
        $.ajax({
            url: "http://"+IP+":8081/approve_tender_application",
            async: true,
            method: "POST",
            data: {
                et_id: $("#et_id" + value).val(),
                etd_id: $("#etd_id" + value).val()
            },
            success: function (response) {
                alertify.success('Done');
                /* if (response === "ok"){
                    alertify.success('Done')
                        //alert("this tender has been approved and no further approval can be performed on this tendor")
                } */
            },
            error: function (xhr, error_type, exception) {
                if (xhr.status == 0) {
                    console.log("No response from Server");
                    alertify.error('No response from server');
                    //alert("No response from server")
                }
                if (xhr.status == 400) {
                    console.log("Bad Request");
                    alertify.error('Bad Request');
                    //alert("Bad Request")
                }
            }
        });
    }, function () { alertify.error('Cancel'); }).set('labels', { ok: 'Yes', cancel: 'No' });
}
