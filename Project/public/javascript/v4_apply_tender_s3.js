const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

var et_id  = urlParams.get('et_id')

console.log(et_id);

/* ---------------------------- Start of E-sign code -------------------------------------- */

document.getElementById('name').value = "";
document.getElementById('email').value = "";
document.getElementById('reason').value = "";
document.getElementById('location').value = "";
document.getElementById('upload').value = "";
document.getElementById('upload1').value = "";

document.getElementById("upload").disabled = true;
document.getElementById("upload1").disabled = true;

var preview = document.getElementById("preview");
preview.style.display = "none";
var preview1 = document.getElementById("preview1");
preview1.style.display = "none";

function save(){
    if(document.getElementById('name').value == "" || document.getElementById('email').value == "" ||
    document.getElementById('reason').value == "" || document.getElementById('location').value == "")
    document.getElementById("tc").innerHTML="Input Field Cannot be Left Empty";
    else{
        document.getElementById("tc").innerHTML="";
        document.getElementById('name').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('reason').disabled = true;
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
    // otpmodal();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var reason = document.getElementById("reason").value;
    var location = document.getElementById("location").value;

    formdata.append('name',name);
    formdata.append('email',email);
    formdata.append('reason',reason);
    formdata.append('location',location);
    
    var xhr = new XMLHttpRequest();
    var url = "http://165.22.210.37:8091/sign";
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
                preview1.href = window.URL.createObjectURL(this.response);
                BOQ_file_name = formdata.get('file').name.slice(0,-4) + "_signed.pdf";
                preview1.download = BOQ_file_name;
                preview1.style.display = '';
                document.getElementById("upload1").disabled = true;
            }
        }
        else if (this.status==400){
            alert(400);
        }
        else{	
            alert("Some Error Occured");
        }
    };
    xhr.responseType = 'blob';
}

function browse(){
    
    document.getElementById("tc2").style.display = "inline-block";
    document.getElementById("tc2").innerHTML="Signing";
    browse = document.getElementById('upload');
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

// function otpmodal(){
//     var modal = document.getElementById("e-sign");
//     modal.style.display = "block";

//     var span = document.getElementsByClassName("close")[0];
//     span.onclick = function() {
//         modal.style.display = "none";
//     }
// }

/* ---------------------------- End of E-sign code -------------------------------------- */

/* ---------------------------- Start of Digilocker js code -------------------------------------- */

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function done() {
    // body...
    alert("done function"+et_id)
}
function back() {
    // body...
    console.log(et_id);
    window.location.href = "/v4_apply_tender_s2.html?et_id="+et_id;
}
/* ---------------------------- End of Digilocker js code -------------------------------------- */