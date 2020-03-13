var xhr:XMLHttpRequest = new XMLHttpRequest()
var message:string;

document.getElementById("submit_button")?.addEventListener('click',() => {
    var email_id = (<HTMLInputElement>document.getElementById("email_id"))?.value;
    var correspondence_email_id  = (<HTMLInputElement>document.getElementById("correspondence_email_id"))?.value;
    var mobile_number = (<HTMLInputElement>document.getElementById("mobile_number"))?.value;
    var company_name = (<HTMLInputElement>document.getElementById("company_name"))?.value;
    var registration_number = (<HTMLInputElement>document.getElementById("registration_number"))?.value;
    var company_address = (<HTMLInputElement>document.getElementById("company_address"))?.value;
    var city = (<HTMLInputElement>document.getElementById("city"))?.value;
    var establishment_year = (<HTMLInputElement>document.getElementById("establishment_year"))?.value;
    var legal_status = (<HTMLInputElement>document.getElementById("legal_status"))?.value;
    var title = (<HTMLSelectElement>document.getElementById("title"))?.value;
    var contact_name = (<HTMLInputElement>document.getElementById("company_name"))?.value;
    var date_of_birth = (<HTMLInputElement>document.getElementById("date_of_birth"))?.value;
    var designation = (<HTMLInputElement>document.getElementById("designation"))?.value;
    var aadhaar_number = (<HTMLInputElement>document.getElementById("aadhaar_number"))?.value;
    var gst_registration_number = (<HTMLInputElement>document.getElementById("gst_registration_number"))?.value;
    var url:string = "http://localhost:8081/register/register-data";
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status == 200) {
            message = this.responseText;
            alert(message)
        }
        else if (this.status == 400) { 
            message = this.responseText;
            alert(message)
        }
        else {
            alert(message)
        }
    };
    xhr.onerror=function(){
        alert("Check your network or try again later")
    }

    xhr.send(JSON.stringify({
        company_details:{
            email_id:email_id,
            correspondence_email_id:correspondence_email_id,
            mobile_number:mobile_number,
            company_name:company_name,
            registration_number :registration_number,
            company_address:company_address,
            city:city,
            establishment_year:establishment_year, 
            legal_status:legal_status
        },
        contact_details:{
            title:title,
            contact_name:contact_name,
            date_of_birth:date_of_birth,
            designation:designation,
            aadhaar_number:aadhaar_number,
            gst_register_number:gst_registration_number
        }

    }))
})