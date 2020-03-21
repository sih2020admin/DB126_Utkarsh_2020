var response = [
			{et_id : '12356' ,	et_title : 'Procurementshahsb of computers' ,	et_tender_fee : '1200' ,	et_tender_ref_no : 'ITC123' ,	et_tender_desc : 'Procurement of Computers, Software and Services. The purpose of this policy is to provide a defined process for both the new and recurring procurement (through purchase or lease) of computer hardware, software and services using Washington University funds or grant funds administered by Washington University.' ,	et_last_date_apply : '2019-05-21' , 	et_bidding_date : '2019-05-22' ,	et_file_uri : 'https://youtu.be/u8XFFTWwSvY' ,	is_delete : '0' ,	dept_id : '1' },

			{et_id : '123457' ,	et_title : 'Procurement of computers' ,	et_tender_fee : '1200' ,	et_tender_ref_no : 'ITC128' ,	et_tender_desc : 'Procurementsbshb of Computers, Software and Services. The purpose of this policy is to provide a defined process for both the new and recurring procurement (through purchase or lease) of computer hardware, software and services using Washington University funds or grant funds administered by Washington University.' ,	et_last_date_apply : '2019-05-21' , 	et_bidding_date : '2019-05-22' ,	et_file_uri : 'https://youtu.be/u8XFFTWwSvY' ,	is_delete : '0' ,	dept_id : '1'}
            
        ];	

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
	        <br><input type="button" name="apply" value='apply' class="apply onclick="apply(`+i+`)">
	    </div>`;
	    
	    cont_div.insertAdjacentHTML('beforeend', div);
}
