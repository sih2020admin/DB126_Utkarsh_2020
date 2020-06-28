var base64Img = null
margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550,
}

var d = new Date()
function print2() {
    const filename = 'ThisIsYourPDFFilename.pdf'

    html2canvas(document.querySelector('#pdf'), { scale: 1 }).then((canvas) => {
        let pdf = new jsPDF('p', 'mm', 'a2')
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 0, 350, 400)
        pdf.save(filename)
    })
}

function print3() {
    var doc = new jsPDF('p', 'mm', [297, 210])
    // doc.text('Hello world!', 10, 10)
    // doc.addPage();
    // doc.setFontSize(22);
    // doc.text(20, 20, 'Answers');
    // doc.setFontSize(16);
    doc.setFont('Times New Roman')

    doc.setFontSize(26)
    doc.text('Application Form', 70, 25)

    doc.setFontSize(22)
    // doc.setFontType("italic");
    doc.text('Status: ', 147, 40)
    doc.setTextColor(36, 173, 2)
    doc.text('Submitted', 170, 40)

    doc.setFontSize(16)
    doc.setFontType('bold')
    doc.setTextColor(0, 0, 0)
    doc.text('TENDER DETAILS', 20, 50)
    doc.setFontType('')
    doc.setTextColor(157, 157, 157)
    doc.setFontSize(14)
    doc.text('Tender Id:', 30, 60)
    doc.text('Refernce number:', 30, 70)
    doc.text('Title:', 30, 80)
    doc.text('Fee:', 30, 90)
    doc.text('Bidding Date:', 30, 100)
    doc.setTextColor(0, 0, 0)
    doc.text($('#et_id').text(), 70, 60)
    doc.text($('#ref').text(), 70, 70)
    doc.text($('#title').text(), 70, 80)
    doc.text($('#fee').text(), 70, 90)
    doc.text($('#bid').text(), 70, 100)

    // doc.text("Tender Id: "+ et_id + "\tRefernce number: "+message.result0[0].et_tender_ref_no + "\tTitle: "+message.result0[0].et_title,15,60)
    // doc.text("Fee: "+ message.result0[0].et_tender_fee + "\tBidding Date: "+message.result0[0].et_bidding_date.slice(0,-14),15,70)

    doc.setDrawColor(196, 196, 196)
    doc.line(5, 110, 205, 110)

    doc.setFontSize(16)
    doc.setFontType('bold')
    doc.setTextColor(0, 0, 0)
    doc.text('PERSONAL DETAILS', 20, 120)
    doc.setFontType('')
    doc.setTextColor(157, 157, 157)
    doc.setFontSize(14)
    doc.text('Name:', 30, 130)
    doc.text('DOB:', 30, 140)
    doc.text('Designation:', 30, 150)
    doc.text('Aadhar No:', 30, 160)
    doc.text('Email:', 30, 170)
    doc.setTextColor(0, 0, 0)
    doc.text($('#name').text(), 70, 130)
    doc.text($('#dob').text(), 70, 140)
    doc.text($('#desg').text(), 70, 150)
    doc.text($('#aadhar').text(), 70, 160)
    doc.text($('#email').text(), 70, 170)

    // doc.setFontSize(16);
    // doc.setFontType("bold");
    // doc.setTextColor(0,0,0);
    // doc.text("Personal Details",10,90)
    // doc.setFontType("");
    // doc.setFontSize(12);
    // doc.text("Name: "+ message.result1[0].vcd_name + "\tDOB: "+message.result1[0].vcd_dob + "\tDesignation: "+message.result1[0].vcd_designation,15,100)
    // doc.text("Aadhar No: "+ message.result1[0].vcd_aadhar + "\tEmail: "+message.result1[0].vcd_email,15,110)

    doc.setDrawColor(196, 196, 196)
    doc.line(5, 180, 205, 180)

    doc.setFontSize(16)
    doc.setFontType('bold')
    doc.setTextColor(0, 0, 0)
    doc.text('COMPANY DETAILS', 20, 190)
    doc.setFontType('')
    doc.setTextColor(157, 157, 157)
    doc.setFontSize(14)
    doc.text('Name:', 30, 200)
    doc.text('Legal Status:', 30, 210)
    doc.text('Estd Year:', 30, 220)
    doc.text('Registration No:', 30, 230)
    doc.text('GST No:', 30, 240)
    doc.text('PAN No:', 30, 250)
    doc.text('Email:', 30, 260)
    doc.text('Contact No:', 30, 270)
    doc.text('Address:', 30, 280)
    doc.setTextColor(0, 0, 0)
    doc.text($('#cname').text(), 70, 200)
    doc.text($('#legal').text(), 70, 210)
    doc.text($('#yoe').text(), 70, 220)
    doc.text($('#register').text(), 70, 230)
    doc.text($('#gst').text(), 70, 240)
    doc.text($('#pan').text(), 70, 250)
    doc.text($('#cemail').text(), 70, 260)
    doc.text($('#ccontact').text(), 70, 270)
    doc.text($('#address').text(), 70, 280)
    doc.addPage()

    // doc.setFontSize(16);
    // doc.setFontType("bold");
    // doc.setTextColor(0,0,0);
    // doc.text("Company Details",10,130)
    // doc.setFontType("");
    // doc.setFontSize(12);
    // doc.text("Name: "+ message.result1[0].v_name + "\tLegal Status: "+message.result1[0]+ "\tEstd Year: "+message.result1[0].v_yoe,15,140)
    // doc.text("Registration No: "+ message.result1[0].v_reg_no+ "\tGST No: "+message.result1[0].v_gst+"\tPAN No: "+message.result1[0].v_pan ,15,150)
    // doc.text("Email: "+ message.result1[0].v_email+ "\tContact No: "+message.result1[0].v_mobile,15,160)
    // doc.text("Address: " +message.result1[0].v_address,15,170)

    doc.setFont('Times New Roman')
    doc.setFontSize(16)
    doc.setFontType('bold')
    doc.setTextColor(0, 0, 0)
    doc.text('Uploaded Documents', 20, 50)
    doc.setFontType('')
    doc.setTextColor(157, 157, 157)
    doc.setFontSize(14)
    doc.text('Tehnical:', 30, 60)
    doc.text('BOQ:', 30, 70)
    doc.setTextColor(0, 0, 0)
    // doc.text( message.result2[0].furi1, 70, 60)
    // doc.text( message.result2[0].furi2, 70, 70)

    doc.setDrawColor(196, 196, 196)
    doc.line(5, 80, 205, 80)

    // doc.setFontSize(16);
    // doc.setFontType("bold");
    // doc.setTextColor(0,0,0);
    // doc.text("Uploaded Documents",10,190)
    // doc.setFontType("");
    // doc.setFontSize(12);
    // doc.textWithLink("Tehnical: ",15,200, {url: message.result2[0].furi1})
    // doc.textWithLink("BOQ: ",15,210, {url: message.result2[0].furi2})

    doc.setFontSize(16)
    doc.setFontType('bold')
    doc.setTextColor(0, 0, 0)
    doc.text('PAYMENT DETAILS', 20, 90)
    doc.setFontType('')
    doc.setTextColor(157, 157, 157)
    doc.setFontSize(14)
    doc.text('Transaction ID:', 30, 100)
    doc.text('Amount:', 30, 110)
    doc.text('Date & Time:', 30, 120)
    doc.text('Bank Name:', 30, 130)
    doc.text('Payment Method:', 30, 140)
    doc.text('Status:', 30, 150)
    doc.setTextColor(0, 0, 0)
    doc.text($('#transaction').text(), 70, 100)
    doc.text($('#amt').text(), 70, 110)
    doc.text($('#date').text(), 70, 120)
    doc.text($('#bank').text(), 70, 130)
    doc.text('Debit card', 70, 140)
    doc.text($('#status').text(), 70, 150)

    // doc.setFontSize(16);
    // doc.setFontType("bold");
    // doc.setTextColor(0,0,0);
    // doc.text("Payment Details",10,210)
    // doc.setFontType("");
    // doc.setFontSize(12);
    // doc.text("Transaction ID: "+ message.result2[0].txn_id + "\tAmount: "+message.result2[0].txn_amount+ "\tDate & Time: "+message.result2[0].txn_timestamp,15,220)
    // doc.text("Bank Name: "+ message.result2[0].bank_name + "\tPayment Method: "+"Debit card"+ "\tStatus: "+message.result2[0].resp_message,15,230)

    doc.setDrawColor(196, 196, 196)
    doc.line(5, 160, 205, 160)

    doc.setFontSize(16)
    doc.setFontType('')
    doc.setTextColor(157, 157, 157)
    doc.text('Place: ', 20, 170)
    doc.setTextColor(0, 0, 0)
    doc.text($('#place').text(), 35, 170)

    doc.setTextColor(157, 157, 157)
    doc.text('Date: ', 20, 180)
    doc.setTextColor(0, 0, 0)
    doc.text($('#da_te').text(), 35, 180)

    doc.setTextColor(157, 157, 157)
    doc.text('Time: ', 20, 190)
    doc.setTextColor(0, 0, 0)
    doc.text($('#time').text(), 35, 190)
    doc.save('Preview')
}
