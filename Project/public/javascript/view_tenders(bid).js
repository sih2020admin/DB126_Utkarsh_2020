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
$("#tender_select_button").on("click", function () {
    var _a;
    var dept_id = (_a = $("#department").val()) === null || _a === void 0 ? void 0 : _a.toString();
    $("#tender_list").empty();
    $.ajax({
        url: "http://localhost:8081/gettenderlist_bid",
        method: "POST",
        async: true,
        data: {
            dept_id: dept_id
        },
        success: function (response) {
            var e_1, _a;
            var count = 1;
            try {
                for (var response_1 = __values(response), response_1_1 = response_1.next(); !response_1_1.done; response_1_1 = response_1.next()) {
                    var x = response_1_1.value;
                    $("<div></div>", {
                        class: "tender_content",
                        id: count,
                        html: "  <label for=\"et_id" + count + "\">Tender No.</label><p id=\"et_id" + count + "\"> " + x.et_id + "</p>\n                            <label for=\"et_title" + count + "\">Tender Title</label><p id=\"et_title" + count + "\"> " + x.et_title + "</p>\n                            <label for=\"et_tender_ref_no" + count + "\">Tender No.</label><p id=\"et_tender_ref_no" + count + "\"> " + x.et_tender_ref_no + "</p>\n                            <label for=\"et_tender_desc" + count + "\">Tender Description</label><p id=\"et_tender_desc" + count + "\"> " + x.et_tender_desc + "</p>\n                            <label for=\"et_tender_fee" + count + "\">Tender Fee</label><p id=\"et_tender_fee" + count + "\"> " + x.et_tender_fee + "</p>\n                            <label for=\"et_last_date_apply" + count + "\">Last Date for Applying</label><p id=\"et_last_date_apply" + count + "\"> " + x.et_last_date_apply + "</p>\n                            <label for=\"et_file_uri" + count + "\">File URL</label><p id=\"et_file_uri" + count + "\"> <a href=" + x.et_file_uri + " target=\"_blank\">Link</a></p>\n                            <label for=\"et_bidding_date" + count + "\">Tender Bidding Date</label><p id=\"et_bidding_date" + count + "\"> " + x.et_bidding_date + "</p>\n                            <button class=\"tender_button\" onclick=apply(" + count + ")>View Applications</button>"
                    }).appendTo("#tender_list");
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
});
function apply(value) {
    var value1 = $("#et_id" + value).text();
    open("vendor.html?id=" + value1, "_blank");
}
