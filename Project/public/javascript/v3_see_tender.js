var data = "";
var response;
var vd_id =get_cookie('vd_id')
var vcd_id =get_cookie('vcd_id')

var xhr = new XMLHttpRequest();


xhr.onload = function () {
  if (this.status === 200) {
            console.log(this.responseText);

            response = JSON.parse(this.responseText);

            var cont_div = document.getElementById('cont');

                for (var i = 0; i < response.length; i++) {

                    var div=`<div class="cont" id="`+i+`">
                        <p class="heading">`+response[i].et_title+`</p><br>
                        <div class="Tdetails">
                            <p class="RnoLabel"><strong>Ref No:</strong></p>
                            <p >`+response[i].et_tender_ref_no+`</p>
                            <p class="OdateLabel"><strong>Closing Date:</strong></p>
                            <p id="Odate">`+response[i].et_last_date_apply+`</p>
                            <p class="BdateLabel"><strong>Bid Opening Date:</strong></p>
                            <p id="Bdate">`+response[i].et_bidding_date+`</p>
                        </div><br>  
                        <p class="para">`+response[i].et_tender_desc+`</p>
                        <br><button name="apply" value='apply' class="apply" onclick="apply(`+i+`)">Apply</button>
                    </div>`;
                    
                    cont_div.insertAdjacentHTML('beforeend', div);
            }
          }
          else if (this.status == 404) {  
        alert("No tender to show");
    }
    else{
        alert("Check Network!");
    }
}

xhr.open("POST", "http://"+IP+":8081/gettenderlist");

xhr.send(data);




function apply(i) {
    if(vd_id != ""){
    console.log("apply")
    window.location.href = "/v4_apply_tender_s1.html?et_id="+response[i].et_id;
}
    else{
        alert("Login to apply")
    }
    // alert(response[i].et_title)
    // body...
}





// var response = [
//     {
//         "et_id": 124,
//         "et_title": "hello title",
//         "et_tender_fee": "1200",
//         "et_tender_ref_no": "ITC56",
//         "et_tender_desc": "hello description",
//         "et_last_date_apply": "2020-03-02T18:30:00.000Z",
//         "et_bidding_date": "2020-03-04T18:30:00.000Z",
//         "et_file_uri": "https://www.youtube.com/watch?v=fyMhvkC3A84",
//         "is_delete": 0,
//         "dept_id": 1
//     },
//     {
//         "et_id": 125,
//         "et_title": "Procurement of computers",
//         "et_tender_fee": "1200",
//         "et_tender_ref_no": "ITC123",
//         "et_tender_desc": "Procurement of Computers, Software and Services. The purpose of this policy is to provide a defined process for both the new and recurring procurement (through purchase or lease) of computer hardware, software and services using Washington University funds or grant funds administered by Washington University.",
//         "et_last_date_apply": "2020-03-09T18:30:00.000Z",
//         "et_bidding_date": "2020-03-12T18:30:00.000Z",
//         "et_file_uri": "https://www.youtube.com/watch?v=u8XFFTWwSvY&feature=youtu.be",
//         "is_delete": 0,
//         "dept_id": 1
//     }
// ]    

    
