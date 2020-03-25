document.getElementById('username').value = "";
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
		var url = "http://localhost:8081/login/admin";
		xhr.open("POST" ,url);
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.send(JSON.stringify({"username":userid,"password": passw}));

		document.getElementById('username').value = "";
		document.getElementById('pass').value = "";

		xhr.onload = function(){
			if(this.status==200){
				document.getElementById("tc").innerHTML="";
				var message = JSON.parse(this.responseText);
				// document.cookie="cookie="+message+";";
				// console.log(document.cookie);
				setTimeout(function(){
						location="error.html"
				},3000);

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

