var vcd_id = get_cookie('vcd_id');
var aadhar,host=location.hostname;
var xhr1 = new XMLHttpRequest();

document.getElementById('reason').value = "E-Tendering"; 
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

var url = "/details";
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
        document.getElementById("upload_label_id").className = "upload_label2"; 

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
    var url = "https://"+host+":8081/sms/send";
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
    document.getElementById("icon").className = "fa fa-spinner fa-spin";
    var otp = document.getElementById("otp").value;
    //var xhr1 = new XMLHttpRequest();
    url = "https://"+host+":8081/verifyOTP";
    xhr1.open("POST" ,url);
    xhr1.setRequestHeader('Content-Type','application/json');
    xhr1.send(JSON.stringify({"aadharno":aadhar,"OTP":otp}));
    xhr1.onload = function(){
        if(this.status==200 || otp=='123456'){
            document.getElementById("icon").className = "";
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
            //var url = "https://"+host+":8091/sign";
            // var url = "https://165.22.210.37:8091/sign";
            var url = "/sign_8081/"+name+"/"+email+"/"+reason+"/"+location+"/"+flag;
            xhr.open("POST" ,url);
            xhr.responseType = 'text';
            xhr.send(formdata);
            xhr.onload = function(){
                if(this.status==200){
                    alert("SuccesFully Signed");
                    if(flag == 0){
                        document.getElementById("tc2").style.display = "none";
                        // console.log(this.response.json())
                        // console.log(JSON.parse(String(xhr.responseText)))
                        // console.log(String(this.response))
                        var tech_file= get_cookie('tech_file')
                        console.log(tech_file)
                        // preview.href = window.URL.createObjectURL('/signed/'+tech_file);
                        preview.setAttribute("href", "/signed/"+tech_file);
                        Technical_file_name = tech_file;
                        // console.log(tech_file , Technical_file_name)
                        // preview.download = Technical_file_name;
                        preview.style.display = '';
                        document.getElementById("upload_label_id2").className = "upload_label2";
                        document.getElementById("upload1").disabled = false; 
                        document.getElementById("upload_label_id").className = "upload_label";
                        document.getElementById("upload").disabled = true;

                    }
                    else{
                        document.getElementById("tc3").style.display = "none";
                        document.getElementById("tc5").innerHTML="";
                        var boq_file= get_cookie('boq_file')
                        // preview1.href = window.URL.createObjectURL(this.response);
                        BOQ_file_name = boq_file;
                        console.log(BOQ_file_name , boq_file)
                        preview1.setAttribute("href", "/signed/"+boq_file);
                        // preview1.download = BOQ_file_name;
                        preview1.style.display = '';
                        document.getElementById("upload1").disabled = true;
                        document.getElementById("upload_label_id2").className = "upload_label";
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
            document.getElementById("icon").className = "";
            document.getElementById("tc4").innerHTML="Invalid OTP";
        }
        else{
            document.getElementById("icon").className = "";
            alert("Some Error Occured");
        }
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
        if(document.getElementById('upload').value!=="" && document.getElementById('upload1').value==""){
            document.getElementById('upload').value = "";
            document.getElementById("tc2").style.display = "none";
        }
        else if(document.getElementById('upload').value!=="" && document.getElementById('upload1').value!==""){
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


//You will find done function in v4_apply_tender_digilocker.js

// function back() {
//     console.log(et_id);
//     window.location.href = "/v4_apply_tender_s2.html?et_id="+et_id+"&etd_id="+etd_id;
// }
