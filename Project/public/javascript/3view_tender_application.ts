/* if(get_cookie('ad_id') == '')
{
        window.location.href = "/1admin_login.html";
    }
var dept_id:string
if(get_cookie("ad_dept_id") === ""){
    console.log("123")
    dept_id = "1"   
}
else{
    dept_id = get_cookie('ad_dept_id')
}
 */
var baseURL: string = `${location.protocol}//${location.host}`
var dept_id = '1'
$.ajax({
    url: `${baseURL}/gettenderlist_bid`,
    method: 'POST',
    async: true,
    data: {
        dept_id,
    },
    success: (response) => {
        var count = 1
        for (let x of response) {
            $('<div></div>', {
                class: 'tender_content',
                id: count,
                html: `  <div class='tender_list2'>
                        <label for="et_id${count}"><b>Tender No</b></label><p id="et_id${count}"> ${x.et_id}</p>
                        <br><label for="et_title${count}"><b>Tender Title</b></label><p id="et_title${count}"> ${x.et_title}</p>
                        <br><label for="et_tender_ref_no${count}"><b>Tender No</b></label><p id="et_tender_ref_no${count}"> ${x.et_tender_ref_no}</p>
                        <br><label for="et_tender_desc${count}"><b>Tender Description</b></label><p id="et_tender_desc${count}"> ${x.et_tender_desc}</p>
                        <br><label for="et_tender_fee${count}"><b>Tender Fee</b></label><p id="et_tender_fee${count}">₹${x.et_tender_fee}</p>
                        <br><label for="et_last_date_apply${count}"><b>Last Date for Applying</b></label><p id="et_last_date_apply${count}"> ${x.et_last_date_apply}</p>
                        <br><label for="et_file_uri${count}"><b>File URL</b></label><p id="et_file_uri${count}"> <a href=${x.et_file_uri} target="_blank">Link</a></p>
                        <br><label for="et_bidding_date${count}"><b>Tender Bidding Date</b></label><p id="et_bidding_date${count}"> ${x.et_bidding_date}</p>
                        <br><button class="tender_button" onclick=apply(${count})>View Applications</button><br><br></div>`,
            }).appendTo('#tender_list')
            count++
        }
    },
    error: (xhr, error_type, exception) => {
        if (xhr.status == 0) {
            console.log('No response from Server')
            alert('No response from server')
        }
        if (xhr.status == 400) {
            console.log('Bad Request')
            alert('Bad Request')
        }
    },
})

function apply(value: string) {
    var value1 = $(`#et_id${value}`).text()
    location.href = `/4approve_vendor.html?id=${value1}`
}
