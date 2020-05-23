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
var et_id = location.toString().split('=%20')[1];
var baseURL = location.protocol + "//" + location.host;
$.ajax({
    url: baseURL + "/get_application",
    async: true,
    method: 'POST',
    data: {
        et_id: et_id,
    },
    success: function (response) {
        console.log(response);
        var e_1, _a;
        var count = 1;
        var main_content = document.getElementById("main_content");
        try {
            for (var response_1 = __values(response), response_1_1 = response_1.next(); !response_1_1.done; response_1_1 = response_1.next()) {
                var x = response_1_1.value;
                console.log(response);
                var n = " <div class='approve_details'><label for='v_" + count + "'> </label><p id='v_" + count + "'>Vendor Details</p><br>"+
                "<label for='v_name" + count + "'>Name</label><p id='v_name" + count + "'> " + x.v_name + "</p><br>"+
                "<label for='v_is_verfied" + count + "'>IS verified (image) </label><p id='v_is_verified" + count + "'> " + x.v_is_verified + "</p><br>"+
                "<label for='v_legal_id" + count + "'>Legal Status </label><p id='v_legal_id" + count + "'> " + x.v_legal_id + "</p><br>"+
                "<label for='v_mobile" + count + "'>Mobile Number</label><p id='v_mobile" + count + "'> " + x.v_mobile + "</p><br>"+
                "<label for='v_reg_no" + count + "'>Register Number</label><p id='v_reg_no" + count + "'> " + x.v_reg_no + "</p><br>"+
                "<label for='v_email" + count + "'>Email Address</label><p id='v_email" + count + "'> " + x.v_email + "</p><br>"+
                "<label for='v_gst" + count + "'>GST Number</label><p id='v_gst" + count + "'> " + x.v_gst + "</p><br>"+
                "<label for='v_pan" + count + "'>Pan Number</label><p id='v_pan" + count + "'> " + x.v_pan + "</p> </p> <br>"+
                "<label for='v_yoe" + count + "'>Year of Establishment</label><p id='v_yoe" + count + "'> " + x.v_yoe + "</p> <br>"+
                "<label for='v_address" + count + "'>Address</label><p id='v_address" + count + "'> " + x.v_address + "</p> <br>"+
                "<label for='v_state" + count + "'>state </label><p id='v_state" + count + "'> " + x.v_state_id + "</p><br>"+
                "<label for='v_city" + count + "'>City </label><p id='v_" + count + "'> " + x.v_city_id + "</p><br>"+
                "<label for='v_pincode" + count + "'>Pincode</label><p id='v_pincode" + count + "'> " + x.v_pincode + "</p><br>"+
                " <input type='hidden' id='et_id" + count + "' value='" + x.et_id + "'> "+
                "<input type='hidden' id='etd_id" + count + "' value='" + x.etd_id + "'><br>"+
                "<p for='Conatct Details" + count + "'>Vendor Contact Details </p><br>"+
                "<label for='vcd_name" + count + "'>Name </label><p id='vcd_name" + count + "'> "+x.vcd_designation+" " +x.vcd_title+". "+ x.vcd_name + "</p><br>"+
                "<label for='vcd_contact" + count + "'> Cnatct Number </label><p id='vcd_contact" + count + "'> " + x.vcd_contact + "</p><br>"+
                "<label for='vcd_email" + count + "'> Email </label><p id='vcd_" + count + "'> " + x.vcd_email + "</p><br>"+
                "<label for='vcd_email" + count + "'> Email </label><p id='vcd_" + count + "'> " + x.vcd_email + "</p><br><br>"+
                "<p for='Document uploaded" + count + "'>Documents Uploaded</p><br>"+
                "<label for='f1" + count + "'>Technical File</label><p id='f1" + count + "'>  <a target=`__blank` href='http://165.22.210.37:8085/get_files?furi=" + x.furi1 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"'>file_url</a></p>  </p> <br>"+
                "<label for='f2" + count + "'>BOQ File</label><p id='f1" + count + "'> <a target=`__blank` href='http://165.22.210.37:8085/get_files?furi="  + x.furi2 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"'>file_url</a></p> <br><br>"+
                "<p for='Payment Details" + count + "'>Payment Details (is it required to show???)</p><br>"+
                "<label for='p_order_id" + count + "'>Order ID  </label><p id='p_order_id" + count + "'> " + x.order_id + "</p><br>"+
                " <div class='button_div'><button id=approve_button" + count + " onclick=approve(" + count + ")>Approve</button></div></div>"

                // var n= " <div class='approve_details'><label for='v_name" + count + "'>Name</label><p id='v_name" + count + "'> " + x.v_name + "</p><br><label for='v_mobile" + count + "'>Mobile Number</label><p id='v_mobile" + count + "'> " + x.v_mobile + "</p><br><label for='v_reg_no" + count + "'>Register Number</label><p id='v_reg_no" + count + "'> " + x.v_reg_no + "</p><br><label for='v_email" + count + "'>Email Address</label><p id='v_email" + count + "'> " + x.v_email + "</p><br><label for='v_gst" + count + "'>GST Number</label><p id='v_gst" + count + "'> " + x.v_gst + "</p><br><label for='v_pan" + count + "'>Pan Number</label><p id='v_pan" + count + "'> " + x.v_pan + "</p> </p> <br><label for='f1" + count + "'>Technical File</label><p id='f1" + count + "'>  <a target=`__blank` href='http://165.22.210.37:8085/get_files?furi=" + x.furi1 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"'>file_url</a></p>  </p> <br><label for='f2" + count + "'>BOQ File</label><p id='f1" + count + "'> <a target=`__blank` href='/show_file.html?furi=" + x.furi2 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"'>file_url</a></p> <br><label for='v_yoe" + count + "'>Year of Establishment</label><p id='v_yoe" + count + "'> " + x.v_yoe + "</p> <br><label for='v_address" + count + "'>Address</label><p id='v_address" + count + "'> " + x.v_address + "</p> <br><label for='v_pincode" + count + "'>Pincode</label><p id='v_pincode" + count + "'> " + x.v_pincode + "</p><br> <input type='hidden' id='et_id" + count + "' value='" + x.et_id + "'> <input type='hidden' id='etd_id" + count + "' value='" + x.etd_id + "'> <div class='button_div'><button id=approve_button" + count + " onclick=approve(" + count + ")>Approve</button></div></div>"
                // var n= " <div class='approve_details'>\n<label for='v_name" + count + "'>Name</label><p id='v_name" + count + "'> " + x.v_name + "</p>\n<br><label for='v_mobile" + count + "'>Mobile Number</label><p id='v_mobile" + count + "'> " + x.v_mobile + "</p>\n<br><label for='v_reg_no" + count + "'>Register Number</label><p id='v_reg_no" + count + "'> " + x.v_reg_no + "</p>\n<br><label for='v_email" + count + "'>Email Address</label><p id='v_email" + count + "'> " + x.v_email + "</p>\n<br><label for='v_gst" + count + "'>GST Number</label><p id='v_gst" + count + "'> " + x.v_gst + "</p>\n<br><label for='v_pan" + count + "'>Pan Number</label><p id='v_pan" + count + "'> " + x.v_pan + "</p>\n </p>\n <br><label for='f1" + count + "'>Technical File</label><p id='f1" + count + "'>  <a target=`__blank` href='http://165.22.210.37:8085/get_files?furi=" + x.furi1 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"'>file_url</a></p>\n  </p>\n <br><label for='f2" + count + "'>BOQ File</label><p id='f1" + count + "'> <a target=`__blank` href='/show_file.html?furi=" + x.furi2 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"'>file_url</a></p>\n <br><label for='v_yoe" + count + "'>Year of Establishment</label><p id='v_yoe" + count + "'> " + x.v_yoe + "</p>\n <br><label for='v_address" + count + "'>Address</label><p id='v_address" + count + "'> " + x.v_address + "</p>\n <br><label for='v_pincode" + count + "'>Pincode</label><p id='v_pincode" + count + "'> " + x.v_pincode + "</p><br>\n <input type='hidden' id='et_id" + count + "' value='" + x.et_id + "'>\n <input type='hidden' id='etd_id" + count + "' value='" + x.etd_id + "'>\n <div class='button_div'><button id=approve_button" + count + " onclick=approve(" + count + ")>Approve</button></div></div>"
                // $('<div></div>', {
                //     class: 'vendor_details',
                //     id: count,
                //     html: "  <div class=\"approve_details\">\n<label for=\"v_name" + count + "\">Name</label><p id=\"v_name" + count + "\"> " + x.v_name + "</p>\n<br><label for=\"v_mobile" + count + "\">Mobile Number</label><p id=\"v_mobile" + count + "\"> " + x.v_mobile + "</p>\n<br><label for=\"v_reg_no" + count + "\">Register Number</label><p id=\"v_reg_no" + count + "\"> " + x.v_reg_no + "</p>\n<br><label for=\"v_email" + count + "\">Email Address</label><p id=\"v_email" + count + "\"> " + x.v_email + "</p>\n<br><label for=\"v_gst" + count + "\">GST Number</label><p id=\"v_gst" + count + "\"> " + x.v_gst + "</p>\n<br><label for=\"v_pan" + count + "\">Pan Number</label><p id=\"v_pan" + count + "\"> " + x.v_pan + "</p>\n </p>\n <br><label for=\"f1" + count + "\">Technical File</label><p id=\"f1" + count + "\">  <a target=`__blank` href=\"http://165.22.210.37:8085/get_files?furi=" + x.furi1 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"\">file_url</a></p>\n  </p>\n <br><label for=\"f2" + count + "\">BOQ File</label><p id=\"f1" + count + "\"> <a target=`__blank` href=\"show_file.html?furi=" + x.furi2 + "&vd_id="+x.vd_id+"&vcd_id="+x.vcd_id+"\">file_url</a></p>\n <br><label for=\"v_yoe" + count + "\">Year of Establishment</label><p id=\"v_yoe" + count + "\"> " + x.v_yoe + "</p>\n <br><label for=\"v_address" + count + "\">Address</label><p id=\"v_address" + count + "\"> " + x.v_address + "</p>\n <br><label for=\"v_pincode" + count + "\">Pincode</label><p id=\"v_pincode" + count + "\"> " + x.v_pincode + "</p><br>\n <input type=\"hidden\" id=\"et_id" + count + "\" value=\"" + x.et_id + "\">\n <input type=\"hidden\" id=\"etd_id" + count + "\" value=\"" + x.etd_id + "\">\n <div class=\"button_div\"><button id=approve_button" + count + " onclick=approve(" + count + ")>Approve</button></div></div>",
                // }).appendTo('#main_content');
                main_content.insertAdjacentHTML('beforeend', n);
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
            console.log('No response from Server');
            alert('No response from server');
        }
        if (xhr.status == 400) {
            console.log('Bad Request');
            alert('Bad Request');
        }
        if (xhr.responseText === 'Not Found') {
            alert('No applications');
        }
    },
});
/*     html: " <div class=\"approve_details\"><label for=\"v_name" + count + "\">Name</label><p id=\"v_name" + count + "\"> " + x.v_name + "</p><br>                    \n<label for=\"v_mobile" + count + "\">Mobile Number</label><p id=\"v_mobile" + count + "\"> " + x.v_mobile + "</p><br>                         <label for=\"v_reg_no" + count + "\">Register Number</label><p id=\"v_reg_no" + count + "\"> " + x.v_reg_no + "</p><br>                         <label for=\"v_email" + count + "\">Email Address</label><p id=\"v_email" + count + "\"> " + x.v_email + "</p><br>                         <label for=\"v_gst" + count + "\">GST Number</label><p id=\"v_gst" + count + "\"> " + x.v_gst + "</p><br>                         <label for=\"v_pan" + count + "\">Pan Number</label><p id=\"v_pan" + count + "\"> " + x.v_pan + "</p><br>                        <label for=\"v_yoe" + count + "\">Year of Establishment</label><p id=\"v_yoe" + count + "\"> " + x.v_yoe + "</p><br>                      <label for=\"v_address" + count + "\">Address</label><p id=\"v_address" + count + "\"> " + x.v_address + "</p><br>                          <input type=\"hidden\" id=\"et_id" + count + "\" value=\"" + x.et_id + "\">                                           <input type=\"hidden\" id=\"etd_id" + count + "\" value=\"" + x.etd_id + "\">                  <label for=\"v_pincode" + count + "\">Pincode</label><p id=\"v_pincode" + count + "\"> " + x.v_pincode + "</p><br>                         <div class=\"button_div\"><button id=approve_button" + count + " onclick=approve(" + count + ")>Approve</button></div></div>"
 */
function approve(value) {
    alertify
        .confirm('Final Confirmation', 'Would you like to approve this application for this tender?', function () {
        $.ajax({
            url: baseURL + "/approve_tender_application",
            async: true,
            method: 'POST',
            data: {
                et_id: $("#et_id" + value).val(),
                etd_id: $("#etd_id" + value).val(),
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
                    console.log('No response from Server');
                    alertify.error('No response from server');
                    //alert("No response from server")
                }
                if (xhr.status == 400) {
                    console.log('Bad Request');
                    alertify.error('Bad Request');
                    //alert("Bad Request")
                }
            },
        });
    }, function () {
        alertify.error('Cancel');
    })
        .set('labels', { ok: 'Yes', cancel: 'No' });
}















// "<label for='v_" + count + "'> </label><p id='v_" + count + "'> " + x. + "</p><br>"+