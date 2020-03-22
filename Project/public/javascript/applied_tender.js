var data = "";
var response ;

var xhr = new XMLHttpRequest();

xhr.onload = function () {
  if (this.status === 200) {
    console.log(this.responseText);

    response = JSON.parse(this.responseText);
    var cont_div = document.getElementById('cont');

    for (var i = 0; i < response.length; i++) 
    {

        var div=`<div class="cont" id="`+i+`">
            <table>
            <h2 class="heading">Applied Tenders</h2>
            <table class="Tdetails">
                <tr>
                    <th class="Title"><strong>Title</strong> </th>
                    <th class="Desc"><strong>Description</strong> </th>
                    <th class="RnoLabel"><strong>Ref No</strong></th>                                                                             
                    <th class="Id"><strong>Tender ID</strong></th>                                                                             
                    <th class="bdate"><strong>Bidding Date</strong></th>                                                                          
                    <th class="Fee"><strong>Tender fee</strong></th>                                                                                                                                                          
                    <th class="OdateLabel"><strong>Closing Date</strong></th>
                    <th class="files"><strong>Files</strong></th>
                </tr>

                <tr>
                    <td>`+response[i].et_title+`</td><br>
                    <td>`+response[i].et_tender_desc+`</td><br>
                    <td>`+response[i].et_tender_ref_no+`</td><br>
                    <td>`+response[i].et_id+`</td>
                    <td>`+response[i].et_bidding_date+`</td><br>
                    <td>`+response[i].et_tender_fee+`</td><br>
                    <td id="Odate">`+response[i].et_last_date_apply+`</td><br>
                    <td>`+response[i].et_file_uri+`</td><br>
                </tr>
               </table> 
        </div>`;
        
        cont_div.insertAdjacentHTML('beforeend', div);   
    }
  }

else if (this.status == 400) {  
        alert("Some error occured!");
    }
    else{
        alert("Check Network!");
    }
}  

xhr.open("POST", "http://localhost:8081/gettenderlist");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Postman-Token", "ff34fcdf-de82-4036-b0f2-64148edbe867");

xhr.send(data);


