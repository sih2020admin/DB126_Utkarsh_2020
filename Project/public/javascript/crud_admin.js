var tr;
var col = [];
var table = document.getElementById("content_table");
var tabCell;
var response




			var data = "";

			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;

			xhr.addEventListener("readystatechange", function() {
			  if(this.readyState === 4) {
					    console.log(this.responseText);
					    response = JSON.parse(this.responseText);

		       
		        for (var i = 0; i < response.length; i++) {
		                for (var key in response[i]) {
		                    if (col.indexOf(key) === -1) {
		                        col.push(key);
		                    }
		                }
		            }
		            console.log(col)

		        for (var i = 0; i < response.length; i++) {

		                tr = table.insertRow(-1); 
		                tr.setAttribute('id', response[i]['et_id']);          //

		                tabCell= tr.insertCell(-1);
		                tabCell.innerHTML = response[i]['et_tender_ref_no'];
		                tabCell = tr.insertCell(-1);
		                tabCell.innerHTML = response[i]['et_title'];
		                tabCell = tr.insertCell(-1);
		                tabCell.innerHTML = response[i]['et_tender_desc'];
		                tabCell = tr.insertCell(-1);
		                tabCell.innerHTML = response[i]['dept_name'];
		                tabCell = tr.insertCell(-1);
		                tabCell.innerHTML = response[i]['et_last_date_apply'];
		                tabCell = tr.insertCell(-1);
		                tabCell.innerHTML = response[i]['et_bidding_date'];
		                tabCell = tr.insertCell(-1);
		                tabCell.innerHTML = '<a href='+response[i]['et_file_uri']+' target="_blank">link</a>';
		                tabCell = tr.insertCell(-1);
		                tabCell.innerHTML = "<button class='update' id="+i+" onclick='update_td("+i+")'><i class='far fa-edit' style='color:#663EFD; font-size:20px;'></i></button><button class='delete' id="+i+" onclick='delete_td("+i+")'><i class='far fa-trash-alt' style='color:#663EFD; font-size:20px;'></i></button>";
		            }
			  }
			});

			xhr.open("POST", "http://localhost:8081/gettenderlist");

			xhr.send(data);


	function isValidDate(dateString) {
		  var regEx = /^\d{4}-\d{2}-\d{2}$/;
		  if(!dateString.match(regEx)) return false;  // Invalid format
		  var d = new Date(dateString);
		  var dNum = d.getTime();
		  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
		  return d.toISOString().slice(0,10) === dateString;
		}


	


            function update_td(clicked_id) {
            	// console.log(response[clicked_id].et_tender_desc ,response[clicked_id].et_title)
            	// var desc = response[clicked_id].et_tender_desc;

            	Swal.mixin({
				  
				  confirmButtonText: 'Next &rarr;',
				  showCancelButton: true,
					  inputValidator: (value) => {
					    if (!value) {
					      return 'Empty feild!'
					    }
					  }

				}).queue([
				{
					input: 'text',
				  	title: 'Tender Refernce number', 
				  	inputValue : response[clicked_id].et_tender_ref_no
				},
				  {
				  	input: 'textarea',
				  	title: 'Tender Title',
				    inputValue : response[clicked_id].et_title,
				},  
				{
					input: 'textarea',
				  title:'Tender Description', 
				  inputValue : response[clicked_id].et_tender_desc		
				},
				 { 
				 	title:'Closing Date',
				 inputValue :response[clicked_id].et_last_date_apply,
				 input: 'text',
				 inputPlaceholder: 'YYYY-MM-DD'
				 ,
					  inputValidator: (value) => {
					    if(!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
					  }
				},  
				{
					input: 'text',
				  title:'Bid opening date',
				  inputValue :response[clicked_id].et_bidding_date,
				 inputPlaceholder: 'YYYY-MM-DD'
				 ,
					  inputValidator: (value) => {
					    if(!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
					  }
				},
				{
					input: 'number',	
				  	title:'Tender Fee',
				  	inputValue :response[clicked_id].et_tender_fee
				},
				{
					input: 'textarea',
				  title:'Reference File url',
				  inputValue :response[clicked_id].et_file_uri
				}
				]).then((result) => {
				  if (result.value) {
				    const answers = JSON.stringify(result.value)
				    console.log(result.value)
				    Swal.fire({
				      title: 'All done!',
				      html: `
				        <h3>Updated Tender:</h3>
				        
				        <h4>Tender Reference No:</h4>${result.value[0]}
				        <h4>Tender Title:</h4>${result.value[1]}
				        <h4>Tender Description:</h4>${result.value[2]}	
				        <h4>Tender Closing Date:</h4>${result.value[3]}
				        <h4>Tender Bid Opening Date:</h4>${result.value[4]}
				        <h4>Tender Fee:</h4>${result.value[5]}
				        <h4>Reference file uri:</h4>${result.value[6]}

				      `,
				      confirmButtonText: 'Lovely!'
				    })
				  }
				})




            }

            

            function delete_td(clicked_id) {
            	// body...
            	// alert("delete "+clicked_id);
            	Swal.fire({
				  title: 'Are you sure delete '+response[clicked_id].et_tender_ref_no+' tender ?',
				  text: "You won't be able to revert this!",
				  icon: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
				  if (result.value) {
				    Swal.fire(
				      'Deleted!',
				      'Your file has been deleted.',
				      'success'
				    )
				  }
				})
            }


            function add_td() {

            	Swal.mixin({
				  
				  confirmButtonText: 'Next &rarr;',
				  progressSteps: ['1', '2', '3','4','5','6','7'],
				  showCancelButton: true,
					  inputValidator: (value) => {
					    if (!value) {
					      return 'Empty feild!'
					    }
					  }

				}).queue([
				{
					input: 'text',
				  	title: 'Tender Refernce number', 
				  	// inputValue : response[clicked_id].et_tender_ref_no
				},
				  {
				  	input: 'textarea',
				  	title: 'Tender Title',
				    // inputValue : response[clicked_id].et_title,
				},  
				{
					input: 'textarea',
				  title:'Tender Description', 
				  // inputValue : response[clicked_id].et_tender_desc		
				},
				 { 
				 	title:'Closing Date',
				 // inputValue :response[clicked_id].et_last_date_apply,
				 input: 'text',
				 inputPlaceholder: 'YYYY-MM-DD'
				 ,
					  inputValidator: (value) => {
					    if(!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
					  }
				},  
				{
					input: 'text',
				  title:'Bid opening date',
				  // inputValue :response[clicked_id].et_bidding_date,
				 inputPlaceholder: 'YYYY-MM-DD'
				 ,
					  inputValidator: (value) => {
					    if(!isValidDate(value)) return 'Enter valid date format YYYY-MM-DD'
					  }
				},
				{
					input: 'number',	
				  	title:'Tender Fee',
				  	// inputValue :response[clicked_id].et_tender_fee
				},
				{
					input: 'textarea',
				  title:'Reference File url',
				  // inputValue :response[clicked_id].et_file_uri
				}
				]).then((result) => {
				  if (result.value) {
				    const answers = JSON.stringify(result.value)
				    console.log(result.value)
				    Swal.fire({
				      title: 'All done!',
				      html: `
				        <h3>Preview Tender:</h3>
				        
				        <h4>Tender Reference No:</h4>${result.value[0]}
				        <h4>Tender Title:</h4>${result.value[1]}
				        <h4>Tender Description:</h4>${result.value[2]}	
				        <h4>Tender Closing Date:</h4>${result.value[3]}
				        <h4>Tender Bid Opening Date:</h4>${result.value[4]}
				        <h4>Tender Fee:</h4>${result.value[5]}
				        <h4>Reference file uri:</h4>${result.value[6]}

				      `,
				      confirmButtonText: 'Lovely!'
				    })
				  }
				})


            	
            }