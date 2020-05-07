var vd_id =get_cookie('vd_id')
var vcd_id =get_cookie('vcd_id')
if(vd_id == ""){
    window.location.href = "/v1_login.html";
    console.log("directed to login")
}
// get vd_id vcd_id from cookies    
var response;

// const queryString = window.location.search;
// console.log(queryString);
// const urlParams = new URLSearchParams(queryString);

// var vd_id  = urlParams.get('vd_id')
// var vcd_id  = urlParams.get('vcd_id')
// vcd id vd are not in url but in cookies
console.log(vd_id);
console.log(vcd_id);
// var data = JSON.stringify({"vd_id":vd_id,"vcd_id":vcd_id}); //changed here proper json object


var data = JSON.stringify({"vd_id":vd_id,"vcd_id":vcd_id});

var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

xhr.onload = function () {
  if (this.status === 200) {
    console.log(this.responseText);

    response = JSON.parse(this.responseText);

    // var cont_div = document.getElementById('main');
   
        // var div=`<div class="main" id="Profile">
        	// <h3>Personal Details</h3>
         //    <label><strong>Name:</strong></label>
         //    <label class="heading">`+response[0][0].v_name+`</label><br><br>
         //        <label class="RnoLabel"><strong>Address:</strong></label>
         //        <label>`+response[0][0].v_address+`</label><br><br>
         //        <label class="RnoLabel"><strong>YOE:</strong></label>
         //        <label>`+response[0][0].v_yoe+`</label><br><br>
         //        <label class="Id"><strong>Email Id:</strong></label>
         //        <label>`+response[0][0].v_email+`</label><br><br>
         //        <label class="Id"><strong>Mobile No. :</strong></label>
         //        <label>`+response[0][0].v_mobile+`</label><br><br>
         //        <label class="Id"><strong>Registration Number:</strong></label>
         //        <label>`+response[0][0].v_reg_no+`</label><br><br>
         //        <label class="OdateLabel"><strong>State:</strong></label>
         //        <label id="Odate">`+response[0][0].v_state_id.slice(0,10)+`</label><br><br>
         //        <label class="OdateLabel"><strong>City:</strong></label>
         //        <label id="Odate">`+response[0][0].v_city_id.slice(0,10)+`</label><br><br>
         //        <label class="OdateLabel"><strong>Pincode:</strong></label>
         //        <label id="Odate">`+response[0][0].v_pincode+`</label><br>
         //        <label class="OdateLabel"><strong>PAN no.:</strong></label>
         //        <label id="Odate">`+response[0][0].v_pan+`</label><br>
         //        <label class="OdateLabel"><strong>GST No:</strong></label>
         //        <label id="Odate">`+response[0][0].v_gst+`</label><br><br> 
        var profile_div = document.getElementById("Profile");
        var profile_content = `<h3>Personal Details</h3><br>
                <table>
                <tr>
                <td><label><strong>Name:</strong></label></td>
                <td><label class="heading">`+response[0][0].v_name+`</label></td>
                <td><label class="RnoLabel"><strong>Address:</strong></label></td>
                <td><label>`+response[0][0].v_address+`</label></td>
                <td><label class="RnoLabel"><strong>YOE:</strong></label></td>
                <td><label>`+response[0][0].v_yoe+`</label></td>
                </tr>
                <tr>
                <td><label class="Id"><strong>Email Id:</strong></label></td>
                <td><label>`+response[0][0].v_email+`</label></td>
                <td><label class="Id"><strong>Mobile No:</strong></label></td>
                <td><label>`+response[0][0].v_mobile+`</label></td>
                <td><label class="Id"><strong>Registration Number:</strong></label></td>
                <td><label>`+response[0][0].v_reg_no+`</label></td>
                </tr>
                <tr>
                <td><label class="OdateLabel"><strong>State:</strong></label></td>
                <td><label id="Odate">`+response[0][0].v_state_id+`</label></td>
                <td><label class="OdateLabel"><strong>City:</strong></label></td>
                <td><label id="Odate">`+response[0][0].v_city_id+`</label></td>
                <td><label class="OdateLabel"><strong>Pincode:</strong></label></td>
                <td><label id="Odate">`+response[0][0].v_pincode+`</label></td>
                </tr>
                <tr>
                <td><label class="OdateLabel"><strong>PAN no:</strong></label></td>
                <td><label id="Odate">`+response[0][0].v_pan+`</label></td>
                <td><label class="OdateLabel"><strong>GST No:</strong></label></td>
                <td><label id="Odate">`+response[0][0].v_gst+`</label></td>
                </tr></table>`
		profile_div.insertAdjacentHTML('beforeend',profile_content); 
            // <h3>Contact Details :</h3> 
            // 	<label><strong>Name:</strong></label>
            //     <label>`+response[1][0].vcd_name+`</label><br><br>
            //     <label class="Id"><strong>Title. :</strong></label>
            //     <label>`+response[1][0].vcd_title+`</label><br><br>
            //     <label class="Id"><strong>Date of birth:</strong></label>
            //     <label>`+response[1][0].vcd_dob+`</label><br><br>
            //     <label class="OdateLabel"><strong>Aadhar No.:</strong></label>
            //     <label id="Odate">`+response[1][0].vcd_aadhar.slice(0,10)+`</label><br><br>
            //     <label class="OdateLabel"><strong>Mobile No.:</strong></label>
            //     <label id="Odate">`+response[1][0].vcd_contact.slice(0,10)+`</label><br><br>
            //     <label class="OdateLabel"><strong>Email Id:</strong></label>
            //     <label id="Odate">`+response[1][0].vcd_email+`</label><br>
            //     <label class="RnoLabel"><strong>Designation:</strong></label>
            //     <label>`+response[1][0].vcd_designation+`</label><br><br>
         
        // </div
        // var profile_div = document.getElementById("Profile");
        var contact_content = `<h3>Contact Details</h3><br>
                <table>
                <tr>
                <td><label><strong>Name:</strong></label></td>
                <td><label>`+response[1][0].vcd_name+`</label></td>
                <td><label class="Id"><strong>Title. :</strong></label></td>
                <td><label>`+response[1][0].vcd_title+`</label></td>
                <td><label class="Id"><strong>Date of birth:</strong></label></td>
                <td><label>`+response[1][0].vcd_dob+`</label></td>
                </tr>
                <tr>
                <td><label class="OdateLabel"><strong>Aadhar No:</strong></label></td>
                <td><label id="Odate">`+response[1][0].vcd_aadhar.slice(0,10)+`</label></td>
                <td><label class="OdateLabel"><strong>Mobile No:</strong></label></td>
                <td><label id="Odate">`+response[1][0].vcd_contact.slice(0,10)+`</label></td>
                <td><label class="OdateLabel"><strong>Email Id:</strong></label></td>
                <td><label id="Odate">`+response[1][0].vcd_email+`</label></td>
                </tr>
                <tr>
                <td><label class="RnoLabel"><strong>Designation:</strong></label></td>
                <td><label>`+response[1][0].vcd_designation+`</label></td>
                </tr>
                </table>`
		profile_div.insertAdjacentHTML('beforeend',contact_content);         
        // var div=`<div class="main" id="Tenders">
       			// <label class="RnoLabel"><strong>ID:</strong></label>
          //       <label>`+response[2][i].e_tender_details.et_id+`</label><br><br>
          //       <label class="RnoLabel"><strong>Title:</strong></label>
          //       <label>`+response[2][i].et_title+`</label><br><br>
          //       <label class="RnoLabel"><strong>Department:</strong></label>
          //       <label>`+response[2][i].dept_name+`</label><br><br>
          //       <label class="RnoLabel"><strong>Ref No:</strong></label>
          //       <label>`+response[2][i].et_tender_ref_no+`</label><br><br>
          //       <label class="Id"><strong>Tender fee:</strong></label>
          //       <label>`+response[2][i].et_tender_fee+`</label><br><br>
          //       <label class="Id"><strong>Tender Description:</strong></label>
          //       <label>`+response[2][i].et_tender_desc+`</label><br><br>
          //       <label class="OdateLabel"><strong>Closing Date:</strong></label>
          //       <label id="Odate">`+response[2][i].et_last_date_apply.slice(0,10)+`</label><br><br>
          //       <label class="OdateLabel"><strong>Bid Date:</strong></label>
          //       <label id="Odate">`+response[2][i].et_bidding_date.slice(0,10)+`</label><br><br>
          //       <label class="OdateLabel"><strong>File URL:</strong></label>
          //       <label id="Odate">`+response[2][i].et_file_url+`</label><br>
          //       <label class="OdateLabel"><strong>Department ID:</strong></label>
          //       <label id="Odate">`+response[2][i].et_bidding_date.slice(0,10)+`</label><br><br>
          //       <label class="OdateLabel"><strong>Bidding Amount:</strong></label>
          //       <label id="Odate">`+response[2][i].et_file_url+`</label><br> <br>  
        // </div>`;
        var tender_div = document.getElementById("Tenders");
        if(response[2].length > 0 ){
        for(i=0;i<response[2].length ; i++){
                var tender_content = `<table class="mytender">
                        <tr>
                            <td><label class="RnoLabel"><strong>ID:</strong></label></td>
                            <td><label>`+response[2][i].et_id+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="RnoLabel"><strong>Title:</strong></label></td>
                            <td><label>`+response[2][i].et_title+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="RnoLabel"><strong>Department:</strong></label></td>
                            <td><label>`+response[2][i].dept_name+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="RnoLabel"><strong>Ref No:</strong></label></td>
                            <td><label>`+response[2][i].et_tender_ref_no+`</label><br><br></td>
                        </tr>
                        <tr>
                            <td><label class="Id"><strong>Tender fee:</strong></label></td>
                            <td><label>`+response[2][i].et_tender_fee+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="Id"><strong>Tender Description:</strong></label></td>
                            <td><label>`+response[2][i].et_tender_desc+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="OdateLabel"><strong>Closing Date:</strong></label></td>
                            <td><label id="Odate">`+response[2][i].et_last_date_apply.slice(0,10)+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="OdateLabel"><strong>Bid Date:</strong></label></td>
                            <td><label id="Odate">`+response[2][i].et_bidding_date.slice(0,10)+`</label></td>
                        </tr>		                
                        <tr>
                            <td><label class="OdateLabel"><strong>File URL:</strong></label></td>
                            <td><label id="Odate">`+response[2][i].et_file_url+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="OdateLabel"><strong>Department ID:</strong></label></td>
                            <td><label id="Odate">`+response[2][i].et_bidding_date.slice(0,10)+`</label></td>
                        </tr>
                        <tr>
                            <td><label class="OdateLabel"><strong>Bidding Amount:</strong></label></td>
                            <td><label id="Odate">`+response[2][i].et_file_url+`</label></td>
                        </tr>
                        </table>`
				tender_div.insertAdjacentHTML('beforeend',tender_content);   
			}
		}
		else {
			tender_div.insertAdjacentHTML('beforeend',`<label class="RnoLabel"><strong>NO TENDER APPLIED YET ! APPLY FOR TENDER <a href="v3_see_tender.html">here</a></strong></label>`); 
		}
        // var div=`<div class="main" id="Approved">
        // <label><strong>Title:</strong></label>
        //     <label class="heading">`+response[3].et_title+`</label><br><br>
        //         <label class="RnoLabel"><strong>Department:</strong></label>
        //         <label>`+response[3].dept_name+`</label><br><br>
        //         <label class="RnoLabel"><strong>Ref No:</strong></label>
        //         <label>`+response[3].et_tender_ref_no+`</label><br><br>
        //         <label class="Id"><strong>Tender ID:</strong></label>
        //         <label>`+response[3].et_id+`</label><br><br>
        //         <label class="Id"><strong>Tender fee:</strong></label>
        //         <label>`+response[3].et_tender_fee+`</label><br><br>
        //         <label class="Id"><strong>Tender Description:</strong></label>
        //         <label>`+response[3].et_tender_desc+`</label><br><br>
        //         <label class="OdateLabel"><strong>Closing Date:</strong></label>
        //         <label id="Odate">`+response[3].et_last_date_apply.slice(0,10)+`</label><br><br>
        //         <label class="OdateLabel"><strong>Bid Date:</strong></label>
        //         <label id="Odate">`+response[3].et_bidding_date.slice(0,10)+`</label><br><br>
        //         <label class="OdateLabel"><strong>File URL:</strong></label>
        //         <label id="Odate">`+response[3].et_file_url+`</label><br>
        //         <label class="OdateLabel"><strong>Department ID:</strong></label>
        //         <label id="Odate">`+response[3].et_bidding_date.slice(0,10)+`</label><br><br>
        //         <label class="OdateLabel"><strong>Bidding Amount:</strong></label>
        //         <label id="Odate">`+response[3].et_file_url+`</label><br> <br>    
        // </div>`;
        
        // cont_div.insertAdjacentHTML('beforeend', div);  
        var aprrove_tender_div = document.getElementById("Approved");
        if(response[3].length > 0 ){
	        for(i=0;i<response[3].length ; i++){
		        var tender_content = `<label class="RnoLabel"><strong>ID:</strong></label>
		                <label>`+response[3][i].et_id+`</label><br><br>
		                <label class="RnoLabel"><strong>Title:</strong></label>
		                <label>`+response[3][i].et_title+`</label><br><br>
		                <label class="RnoLabel"><strong>Department:</strong></label>
		                <label>`+response[3][i].dept_name+`</label><br><br>
		                <label class="RnoLabel"><strong>Ref No:</strong></label>
		                <label>`+response[3][i].et_tender_ref_no+`</label><br><br>
		                <label class="Id"><strong>Tender fee:</strong></label>
		                <label>`+response[3][i].et_tender_fee+`</label><br><br>
		                <label class="Id"><strong>Tender Description:</strong></label>
		                <label>`+response[3][i].et_tender_desc+`</label><br><br>
		                <label class="OdateLabel"><strong>Closing Date:</strong></label>
		                <label id="Odate">`+response[3][i].et_last_date_apply.slice(0,10)+`</label><br><br>
		                <label class="OdateLabel"><strong>Bid Date:</strong></label>
		                <label id="Odate">`+response[3][i].et_bidding_date.slice(0,10)+`</label><br><br>
		                <label class="OdateLabel"><strong>File URL:</strong></label>
		                <label id="Odate">`+response[3][i].et_file_url+`</label><br>
		                <label class="OdateLabel"><strong>Department ID:</strong></label>
		                <label id="Odate">`+response[3][i].et_bidding_date.slice(0,10)+`</label><br><br>
		                <label class="OdateLabel"><strong>Bidding Amount:</strong></label>
                        <label id="Odate">`+response[3][i].et_file_url+`</label><hr/><br><br>`
				aprrove_tender_div.insertAdjacentHTML('beforeend',tender_content);   
			} 
		}else{
			aprrove_tender_div.insertAdjacentHTML('beforeend',`<br><label class="RnoLabel"><strong>NO TENDER APPROVED YET ! APPLY FOR TENDER <a href="v3_see_tender.html">here</a></strong></label>`); 
		}
   }		
    

    else if (this.status == 400) {  
        alert("Some error occured!");
    }
    else{
        alert("Check Network!");
    }
}  

xhr.open("POST", "http://"+IP+":8081/vendor_dashboard");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
console.log(xhr)

function operation(optName) {
      var x = document.getElementsByClassName("tabcontent");
      for (var i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      document.getElementById(optName).style.display = "block";  
}
