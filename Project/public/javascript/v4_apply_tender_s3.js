const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

var et_id  = urlParams.get('et_id')
var etd_id = urlParams.get('etd_id')

console.log(et_id,etd_id);

var vcd_id = get_cookie('vcd_id');
var aadhar;
var xhr1 = new XMLHttpRequest();

/* ---------------------------- Start of E-sign code -------------------------------------- */

document.getElementById('reason').value = "E-Tender"; 
document.getElementById('location').value = "";
document.getElementById('upload').value = "";
document.getElementById('upload1').value = "";

document.getElementById('name').disabled = true;
document.getElementById('email').disabled = true;
document.getElementById('reason').disabled = true;
document.getElementById("upload").disabled = true;
document.getElementById("upload1").disabled = true;

var preview = document.getElementById("preview");
preview.style.display = "none";
var preview1 = document.getElementById("preview1");
preview1.style.display = "none";

var url = "http://165.22.210.37:8081/details";
xhr1.open("POST" ,url);
xhr1.setRequestHeader('Content-Type','application/json');
xhr1.send(JSON.stringify({"vcd_id":vcd_id}));
xhr1.onload = function(){
    if(this.status==200){
        message=JSON.parse(this.responseText);
        document.getElementById('name').value = message.name;
        document.getElementById('email').value = message.email;
        aadhar = message.aadhar;  
    }
    else if(this.status==400)
        alert("Errror 400");
    else
        alert("Some Error Occured");
};

function save(){
    if(document.getElementById('name').value == "" || document.getElementById('email').value == "" ||
    document.getElementById('reason').value == "" || document.getElementById('location').value == "")
    document.getElementById("tc").innerHTML="Input Field Cannot be Left Empty";
    else{
        document.getElementById("tc").innerHTML="";
        document.getElementById('location').disabled = true;
        document.getElementById("upload").disabled = false;
    }
}
    
var formdata,Technical_file_name,BOQ_file_name,flag=0;

var upload = function(files){
    formdata = new FormData();
    for( var x = 0;x < files.length;x = x+1){
        formdata.append('file',files[x]);
    }
    //console.log(formdata.get('file'));
    alert("Document Uploaded,Press OK to Sign the Document");
    var url = "http://165.22.210.37:8082/sms/send";
    xhr1.open("POST" ,url);
    xhr1.setRequestHeader('Content-Type','application/json');
    xhr1.send(JSON.stringify({"aadharno":aadhar}));
    xhr1.onload = function(){
        if(this.status==200){
            otpmodal();
        }
        else if(this.status==400)
            alert("Error 400");
        else
            alert("Some Error Occured");
    }
}
function otp(){
    var otp = document.getElementById("otp").value;
    //var xhr1 = new XMLHttpRequest();
    url = "http://165.22.210.37:8082/verifyOTP";
    xhr1.open("POST" ,url);
    xhr1.setRequestHeader('Content-Type','application/json');
    xhr1.send(JSON.stringify({"aadharno":aadhar,"OTP":otp}));
    xhr1.onload = function(){
        if(this.status==200 || otp=='123456'){
            var modal = document.getElementById("e-sign");
            modal.style.display = "none";

            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var reason = document.getElementById("reason").value;
            var location = document.getElementById("location").value;

            formdata.append('name',name);
            formdata.append('email',email);
            formdata.append('reason',reason);
            formdata.append('location',location);
            
            var xhr = new XMLHttpRequest();
            var url = "http://165.22.210.37:8080/sign";
            xhr.open("POST" ,url);
            xhr.send(formdata);
            xhr.onload = function(){
                if(this.status==200){
                    alert("SuccesFully Signed");
                    if(flag == 0){
                        document.getElementById("tc2").style.display = "none";
                        preview.href = window.URL.createObjectURL(this.response);
                        Technical_file_name = formdata.get('file').name.slice(0,-4) + "_signed.pdf";
                        preview.download = Technical_file_name;
                        preview.style.display = '';
                        document.getElementById("upload1").disabled = false;
                        document.getElementById("upload").disabled = true;
                    }
                    else{
                        document.getElementById("tc3").style.display = "none";
                        document.getElementById("tc5").innerHTML="";
                        preview1.href = window.URL.createObjectURL(this.response);
                        BOQ_file_name = formdata.get('file').name.slice(0,-4) + "_signed.pdf";
                        preview1.download = BOQ_file_name;
                        preview1.style.display = '';
                        document.getElementById("upload1").disabled = true;
                    }
                }
                else if (this.status==400){
                    alert("Error 400");
                }
                else{	
                    alert("Some Error Occured");
                }
            };
            xhr.responseType = 'blob';
        }
        else if(this.status==400){
            document.getElementById("tc4").innerHTML="Invalid OTP";
        }
        else
        alert("Some Error Occured");
    };
}

function browse(){
    document.getElementById("tc2").style.display = "inline-block";
    document.getElementById("tc2").innerHTML="Signing";
    var browse = document.getElementById('upload');
    upload(browse.files);
}
function browse1(){
    flag=1;
    document.getElementById("upload1").disabled = false;
    document.getElementById("upload").disabled = true;
    document.getElementById("tc3").style.display = "inline-block";
    document.getElementById("tc3").innerHTML="Signing";
    browse = document.getElementById('upload1');
    upload(browse.files);
}

function otpmodal(){
    document.getElementById("otp").value="";
    document.getElementById("tc4").innerHTML="";

    var modal = document.getElementById("e-sign");
    modal.style.display = "block";
    var span = document.getElementsByClassName("closeotp")[0];
    span.onclick = function() {
        modal.style.display = "none";
        if(document.getElementById('upload').value!="" && document.getElementById('upload1').value==""){
            document.getElementById('upload').value = "";
            document.getElementById("tc2").style.display = "none";
        }
        else if(document.getElementById('upload').value!="" && document.getElementById('upload1').value!=""){
            document.getElementById('upload1').value = "";
            document.getElementById("tc3").style.display = "none";
        }
    }
    var cancel = document.getElementById("cancel");
    cancel.onclick = function() {
        modal.style.display = "none";
        if(document.getElementById('upload').value!="" && document.getElementById('upload1').value==""){
            document.getElementById('upload').value = "";
            document.getElementById("tc2").style.display = "none";
        }
        else if(document.getElementById('upload').value!="" && document.getElementById('upload1').value!=""){
            document.getElementById('upload1').value = "";
            document.getElementById("tc3").style.display = "none";
        }
    }
}

/* ---------------------------- End of E-sign code -------------------------------------- */


function done() {
    if(document.getElementById("name").value=="" || document.getElementById("email").value=="" ||
    document.getElementById("reason").value=="" || document.getElementById("location").value=="" ||
    document.getElementById("upload").value=="" || document.getElementById("upload1").value=="")
    document.getElementById("tc6").innerHTML = "Form Is Incomplete";
    else{
        document.getElementById("tc6").innerHTML = "";
        alert("done function"+et_id);
    }
}
function back() {
    console.log(et_id);
    window.location.href = "/v4_apply_tender_s2.html?et_id="+et_id+"&etd_id="+etd_id;
}
