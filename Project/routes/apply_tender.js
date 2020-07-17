'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
var express_1 = __importDefault(require('express'))
// var data_structure_1 = require("./data-structure");
var db_1 = __importDefault(require('./db'))
var router = express_1.default.Router()
// var unirest = require('unirest');
var https = require('https')
// const formidable = require('express-formidable');
// const bodyParser = require('body-parser');
var multer = require('multer')()
// const FormData = require('form-data');
// const axios = require('axios');
// const fs = require('fs');
let { PythonShell } = require('python-shell')
const { parse } = require('querystring')

var multer = require('multer')
var postStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'routes/uploaded_documents/')
    },
    filename: function (req, file, callback) {
        let fileName = file.originalname.slice(0, -4)

        var date = new Date()
        var components = [date.getYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()]

        var id = components.join('')
        fileName += '_'
        fileName += id
        fileName += '.pdf'
        callback(null, fileName)
    },
})
function get_data(f) {
    // body...

    fs.readFile('uploads/' + f, 'utf8', function (err, data) {
        // body...
        if (err) console.log(err)
        return data
    })
}

//Email
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
})

router.post('/apply_tender', function (req, res) {
    var et_id = req.body.et_id
    // var vd_id= req.body.vd_id;
    // var vcd_id= req.body.vcd_id;
    var bid_amt = req.body.bid_amt
    var time_period =req.body.time_period
    var vd_id = req.signedCookies.vd_id_e
    var vcd_id = req.signedCookies.vcd_id_e
    console.log('apply tender desc called ' + et_id+time_period)

    db_1.default.query('INSERT INTO `e_tender_vendor`(`et_id`, `vd_id`, `vcd_id`, `bidding_amt`,`time_period`,`status`) VALUES (?,?,?,?,?,"100"); 	 select LAST_INSERT_ID("etd_id");', [et_id, vd_id, vcd_id, bid_amt,time_period], function (error, results, fields) {
        if (error) {
            console.log('error', error)
            res.sendStatus(400)
        } else {
            if (results.length > 0) {
                console.log(results[0].insertId)
                res.send('{"etd_id":' + results[0].insertId + '}')
            } else {
                //does not exists
                res.sendStatus(400)
            }
        }
    })
})

router.post('/apply_tender_s3', function (req, res) {
    var etd_id = req.body.etd_id
    console.log('apply tender s3 called ' + etd_id)

    db_1.default.query('UPDATE `e_tender_vendor` SET `status` = "111" WHERE `etd_id` = ?;', [etd_id], function (error, results, fields) {
        if (error) {
            console.log('error', error)
            res.sendStatus(400)
        } else {
            console.log(results)
            res.sendStatus(200)
        }
    })
})

router.post('/confirm_tender_s5', function (req, res) {
    var etd_id = req.body.etd_id
    console.log(req.body.location, req.body.timestamp)

    console.log('confirm tender called ' + etd_id)

    db_1.default.query('UPDATE `e_tender_vendor` SET `status` = "1111",`location` = ?,`timestamp` = ? WHERE `etd_id` = ?;', [req.body.location, req.body.timestamp, etd_id], function (error, results, fields) {
        if (error) {
            console.log('error', error)
            res.sendStatus(400)
        } else {
            console.log(results)
            //   var mailOptions = {
            //     from: 'E-tender',
            //     to: ,
            //     subject: 'Confirmation Of Your Application to tender',
            //     text: 'Your application has been sucesfully submitted. Your application ID is AP00'+etd_id+' . \nThank You.',
            // }

            // transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //         console.log(error);
            //         //res.sendStatus(400);
            //     } else {
            //         console.log('Email sent: ' + info.response);
            //     }
            // });
            res.sendStatus(200)
        }
    })
})

router.post('/enter_file_uri1_db', function (req, res) {
    var etd_id = req.body.etd_id
    var ftype = req.body.f_type
    var furi = req.body.f_uri

    console.log('enter file1 db tender s3 called ' + etd_id)

    db_1.default.query('INSERT INTO `file_uri`(`furi1`, `etd_id`, `f_type`) VALUES (?,?,?)', [furi, etd_id, ftype], function (error, results, fields) {
        if (error) {
            console.log('error', error)
            res.sendStatus(400)
        } else {
            console.log(results)
            res.sendStatus(200)
        }
    })
})

router.post('/enter_file_uri2_db', function (req, res) {
    var etd_id = req.body.etd_id
    var ftype = req.body.f_type
    var furi = req.body.f_uri

    var tech_file = req.body.tech_file;
    var boq_file = req.body.boq_file;

    console.log('enter file2 db tender s3 called ' + etd_id)

    db_1.default.query('UPDATE `file_uri` SET `furi2` = ? WHERE etd_id = ? ', [furi, etd_id], function (error, results, fields) {
        if (error) {
            console.log('error', error)
            res.sendStatus(400)
        } else {
            console.log(results)

            var fs = require('fs')
            
            var filePath = '/root/e-sign/V-victory/Project/routes/uploaded_documents/' + tech_file;
            fs.unlinkSync(filePath);
            
            filePath = '/root/e-sign/V-victory/Project/routes/uploaded_documents/' + boq_file;
            fs.unlinkSync(filePath);

            var org_filename = tech_file.split("_signed.pdf");
            filePath = '/root/e-sign/V-victory/Project/routes/uploaded_documents/' + org_filename[0] + ".pdf";
            fs.unlinkSync(filePath);

            org_filename = boq_file.split("_signed.pdf");
            filePath = '/root/e-sign/V-victory/Project/routes/uploaded_documents/' + org_filename[0] + ".pdf";
            fs.unlinkSync(filePath);

            res.sendStatus(200)
        }
    })
})

router.post('/sms/send', (req, res) => {
    console.log('send sms called ' + JSON.stringify(req.body))
    var r = JSON.stringify(req.body)
    var options = {
        hostname: process.env.ADDRESS,
        port: 8082,
        path: '/sms/send',
        method: 'POST',
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    var req = https.request(options, function (resp) {
        resp.setEncoding('utf8')
        resp.on('data', function (chunk) {
            console.log('BODY: ' + chunk)
        })

        resp.on('end', function () {
            if (resp.statusCode == 200) {
                res.sendStatus(200)
            } else {
                console.log('Api call failed with response code ' + resp.statusCode)
                res.sendStatus(400)
            }
        })
    })

    req.on('error', function (e) {
        console.log('Error : ' + e.message)
    })

    // write data to request body
    console.log(r)
    req.write(r)

    req.end()
})

// router.post('/sign_8081', multer.single('file') ,(request, res) => {
//   console.log("sign 8081 called ")
//   // var r=JSON.stringify(request.body)
//   console.log(request.fields )
//   console.log(request.files)

//   var options = {
//       hostname: "165.22.210.37" ,
//       port: 8091,
//       path: "/sign",
//       method: 'POST',
//       rejectUnauthorized: false,
//       requestCert: true,
//       agent: false,
//       headers: {
//           'Content-Type': 'multipart/form-data'
//      }
//     };

//     const fileRecievedFromClient = request.file; //File Object sent in 'fileFieldName' field in multipart/form-data
//     console.log(request.file)

//     let form = new FormData();
//     form.append('file', fileRecievedFromClient.buffer, fileRecievedFromClient.originalname);
//     form.append('name',"name");
//     form.append('email',"email");
//     form.append('reason',"reason");
//     form.append('location',"location");

//     // axios.post('https://165.22.210.37:8091/sign ', form, {
//     //         headers: {
//     //             'Content-Type': `multipart/form-data;`
//     //         }
//     //     }).then((responseFromServer2) => {
//     //         res.send(responseFromServer2)
//     //     }).catch((err) => {
//     //         res.sendStatus(400)
//     //     })

//     var formdata ;
//   var req = https.request(options, function (resp) {
//       resp.setEncoding('utf8');
//       resp.on('data', function (chunk) {
//           console.log('BODY: ' + chunk);
//       });

//       resp.on('end',function(){
//         if (resp.statusCode == 200) {
//                   console.log(resp)
//                   res.send(resp)
//                   // req.end()

//         } else {
//           console.log("Api call failed with response code " + resp.statusCode);
//           res.sendStatus(400)
//           // req.end();
//         }
//       });

//     });

//     req.on('error', function (e) {
//       console.log("Error : " + e.message);
//       // req.end();
//     });

//     // write data to request body
//     console.log("did")
//     req.write(String(form));
//     req.end();

//   // axios({
//   //   method: "post",
//   //   url: "https://165.22.210.37:8091/sign ",
//   //   data: form,
//   //   headers: { 'Content-Type': `multipart/form-data;` }
//   // }).then((responseFromServer2) => {
//   //           res.send(responseFromServer2)
//   //       }).catch((err) => {
//   //           res.sendStatus(400)
//   //       })

// })

router.post('/sign_8081/:name/:email/:reason/:location/:flag', (req, res) => {
    console.log('sign 8081 called ' + JSON.stringify(req.body))
    var name = req.params.name
    var email = req.params.email
    var reason = req.params.reason
    var location = req.params.location
    var flag = req.params.flag
    // console.log(name);
    // console.log(req.params);

    var uploadPost = multer({ storage: postStorage }).single('file')
    uploadPost(req, res, function (error) {
        if (error) {
            console.log(error)
            return res.send('error uploading file')
        }
        console.log(req.file.filename)
        var options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: './routes/',
            args: [name, email, reason, location, req.file.filename],
        }
        PythonShell.run('sign_function.py', options, function (err, results) {
            if (err) throw err
            // Results is an array consisting of messages collected during execution
            var r = results[0].slice(26)
            console.log('results: ', results, r)
            if (flag == '0') {
                res.cookie('tech_file', r)
            } else if (flag == '1') {
                {
                    res.cookie('boq_file', r)
                }
            }
            res.json(JSON.parse(`{"filename":"` + r + `"}`))
        })
    })
})

router.post('/preview_pdf', function (req, res) {
    console.log('prview pdf called ', req.body.result0[0].et_tender_ref_no)
    var et_ref = req.body.result0[0].et_tender_ref_no
    var title = req.body.result0[0].et_title
    var fee = req.body.result0[0].et_tender_fee
    var bid_date = req.body.result0[0].et_bidding_date
    var vcd_name = req.body.result1[0].vcd_name
    var vcd_dob = req.body.result1[0].vcd_dob
    var vcd_designation = req.body.result1[0].vcd_designation
    var vcd_aadhar = req.body.result1[0].vcd_aadhar
    var vcd_email = req.body.result1[0].vcd_email
    var vcd_contact = req.body.result1[0].vcd_contact
    var v_name = req.body.result1[0].v_name
    var v_legal_id = req.body.result1[0].v_legal_id
    var v_yoe = req.body.result1[0].v_yoe
    var v_reg_no = req.body.result1[0].v_reg_no
    var v_gst = req.body.result1[0].v_gst
    var v_pan = req.body.result1[0].v_pan
    var v_email = req.body.result1[0].v_email
    var v_mobile = req.body.result1[0].v_mobile
    var v_address = req.body.result1[0].v_address
    var furi1 = req.body.result2[0].furi1
    var furi2 = req.body.result2[0].furi2
    var txn_id = req.body.result2[0].txn_id
    var txn_amount = req.body.result2[0].txn_amount
    var txn_timestamp = req.body.result2[0].txn_timestamp
    var bank_name = req.body.result2[0].bank_name
    var resp_message = req.body.result2[0].resp_message

    res.sendStatus(200)
})

exports.default = router
