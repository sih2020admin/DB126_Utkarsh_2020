var x = document.getElementById("enter_otp");
var y = document.getElementById("otp");
var z = document.getElementById("confirm");
var login_button = document.getElementById("login");
var message;
document.getElementById('username').value = "";
console.log("hello v1_login")
delete_cookies();



function show() 
{
	var userid= document.getElementById("username").value;
	var passw = document.getElementById("pass").value;
	if (userid.length == 0 ){
		document.getElementById("tc").innerHTML="Username cannot be Empty";
	}
	else if (passw.length == 0){
		document.getElementById("tc").innerHTML="Password cannot be Empty";
	}
	else{
		var xhr = new XMLHttpRequest();
		var url = "http://localhost:8081/login/";
		xhr.open("POST" ,url);
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify({"username":userid,"password": passw}));

		document.getElementById('username').value = "";
		document.getElementById('pass').value = "";

		xhr.onload = function(){
			if(this.status==200){
				message = JSON.parse(this.responseText);
				//alert(message.aadhar);
				document.getElementById("username").disabled=true;
				document.getElementById("pass").disabled=true;
				login_button.style.visibility="hidden";
				document.getElementById("tc").innerHTML="";
				document.getElementById("tc3").innerHTML="OTP has been send to Email";

				x.style.display = "";
				y.style.display = "inline-block";
				z.style.display = "";

				
				document.getElementById("confirm").onclick = function(){
					var url = "http://localhost:8082/verifyOTP";
					xhr.open("POST" ,url);
					xhr.setRequestHeader('Content-Type','application/json');
					xhr.send(JSON.stringify({"aadharno":message.aadhar,"OTP": y.value}));
					document.getElementById('otp').value = "";
					xhr.onload = function(){
						if(this.status == 200){
							//alert("OTP verified");
							document.getElementById("otp").disabled=true;
							var vcd_id_c =message.vcd_id;
							var vd_id_c=message.vd_id;
							var digi_access=message.digi_access;
							add_to_cookie("vcd_id",vcd_id_c);
							add_to_cookie("vd_id",vd_id_c);
							add_to_cookie("digi_access",digi_access);


							setTimeout(function(){
    								location="v3_see_tender.html"
							},1500);
						}
						else if(this.status == 400){
							document.getElementById("tc1").innerHTML="Invalid OTP ";
							document.getElementById("tc2").style.display = "inline-block";
							document.getElementById("tc2").innerHTML="Directing to Relogin";
							document.getElementById("otp").disabled=true;
							setTimeout(function(){
    								location="v1_login.html"
							},5000);
						}
						else{	
							document.getElementById("tc1").innerHTML="Some Error Occured";
						}
					};
				}

			}
			else if (this.status==400){
				document.getElementById("tc").innerHTML="Invalid Username or Password";
			}
			else{	
				document.getElementById("tc").innerHTML="Some Error Occured";
			}
		};
	}
}

