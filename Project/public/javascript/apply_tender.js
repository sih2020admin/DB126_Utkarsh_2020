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
            <p class="heading">`+response[i].et_title+`</p><br>
            <div class="Tdetails">
                <p class="RnoLabel"><strong>Ref No:</strong></p>
                <p>`+response[i].et_tender_ref_no+`</p><br>
                <p class="Id"><strong>Tender ID:</strong></p>
                <p>`+response[i].et_id+`</p>
                <p class="OdateLabel"><strong>Closing Date:</strong></p>
                <p id="Odate">`+response[i].et_last_date_apply+`</p><br>
            </div><br>  
            <p class="para">`+response[i].et_tender_desc+`</p>
            
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

