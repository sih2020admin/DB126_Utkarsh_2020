'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
var express_1 = __importDefault(require('express'))
var db_1 = __importDefault(require('./db'))
var router = express_1.default.Router()
// var unirest = require('unirest')
const  crypto = require('crypto')
var https = require('https')

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

// aadhar request

/* router.get('/', function (req, res) {
    // body...
    res.redirect('/v7_homepage.html')
}) */

router.post('/login_api', function (reqs, res) {
    var username = reqs.body.username
    var password = crypto.createHash('sha512').update(reqs.body.password).digest('hex')
    console.log('login called', username , password)
    db_1.default.query('SELECT * FROM  log_in_details WHERE role_id=2 and user_name = ?;', [username], function (error, results, fields) {
        if (error) {
            //console.log("error");
            res.status(400)
        } else {
            if (results.length > 0) {
                if (results[0].password == password) {
                    //password  matched
                    var aadharno
                    //console.log(results[0].vcd_id);
                    var vcd_id = results[0].vcd_id

                    //fetch aadhar number
                    db_1.default.query('SELECT vcd_aadhar,vd_id ,digi_access FROM  v_contact_details WHERE vcd_id = ?;', [vcd_id], function (error, results, fields) {
                        if (error) {
                            //console.log(error);
                            res.status(400)
                        } else {
                            aadharno = results[0].vcd_aadhar
                            var vd_id = results[0].vd_id
                            var digi_access = results[0].digi_access
                            console.log('fetched ' + aadharno)

                            //send to aadhar api

                            var options = {
                                hostname: process.env.ADDRESS,
                                port: 8082,
                                path: '/verify',
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
                                        // res.cookie('vd_id_e', vd_id, { signed: true })
                                        // res.cookie('vcd_id_e', vcd_id, { signed: true })
                                        // res.cookie('digi_access_e', digi_access, { signed: true })
                                        // reqs.session.vd_id = vd_id
                                        // reqs.session.vcd_id = vcd_id
                                        // reqs.session.digi_access = digi_access
                                        // reqs.session.username = 'hello'
                                        res.status(200).send({ aadhar: aadharno, vd_id: vd_id, vcd_id: vcd_id, digi_access: digi_access })
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
                            req.write(JSON.stringify({ aadharno: aadharno }))

                            req.end()
                        }
                    })
                } else {
                    //Users password do not match
                    res.sendStatus(400)
                }
            } else {
                //User does not exist
                res.sendStatus(400)
            }
        }
    })
})

router.post('/verifyOTP_login', (req, res) => {
    console.log('verify otp called ' + JSON.stringify(req.body))
    var r = JSON.stringify(req.body)
    var vcd_id = req.body.vcd_id
    var vd_id = req.body.vd_id
    var digi_access = req.body.digi_access
    var options = {
        hostname: process.env.ADDRESS,
        port: 8082,
        path: '/verifyOTP',
        method: 'POST',
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    var request = https.request(options, function (resp) {
        resp.setEncoding('utf8')
        resp.on('data', function (chunk) {
            console.log('BODY: ' + chunk)
        })

        resp.on('end', function () {
            if (resp.statusCode == 200) {
                res.cookie('vd_id_e', vd_id, { signed: true })
                res.cookie('vcd_id_e', vcd_id, { signed: true })
                res.cookie('digi_access_e', digi_access, { signed: true })
                req.session.vd_id = vd_id
                req.session.vcd_id = vcd_id
                req.session.digi_access = digi_access
                res.sendStatus(200)
            } else {
                console.log('Api call failed with response code ' + resp.statusCode)
                res.sendStatus(400)
            }
        })
    })

    request.on('error', function (e) {
        console.log('Error : ' + e.message)
    })

    // write data to request body
    console.log(r)
    request.write(r)

    request.end()
})

// router.post('/verifyOTP_login', (req, res) => {
//     console.log('verify otp called ' + JSON.stringify(req.body))
//     var vcd_id = req.body.vcd_id
//     var vd_id = req.body.vd_id
//     var digi_access = req.body.digi_access
//     var r = JSON.stringify(req.body)
//     var options = {
//         hostname: process.env.ADDRESS,
//         port: 8082,
//         path: '/verifyOTP',
//         method: 'POST',
//         rejectUnauthorized: false,
//         requestCert: true,
//         agent: false,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }
//     var reqs = https.request(options, function (resp) {
//         resp.setEncoding('utf8')
//         resp.on('data', function (chunk) {
//             console.log('BODY: ' + chunk)
//         })

//         resp.on('end', function () {
//             if (resp.statusCode == 200) {
//                 // res.cookie('vd_id_e', vd_id, { signed: true })
//                 // res.cookie('vcd_id_e', vcd_id, { signed: true })
//                 // res.cookie('digi_access_e', digi_access, { signed: true })
//                 // req.session.vd_id = vd_id
//                 // req.session.vcd_id = vcd_id
//                 // req.session.digi_access = digi_access
//                 res.sendStatus(200)
//             } else {
//                 console.log('Api call failed with response code ' + resp.statusCode)
//                 res.sendStatus(400)
//             }
//         })
//     })

//     req.on('error', function (e) {
//         console.log('Error : ' + e.message)
//     })
// })

router.post('/login/admin', function (req, res) {
    var username = req.body.username
    var password = crypto.createHash('sha512').update(req.body.password).digest('hex')
    console.log('admin login called', username)

    db_1.default.query('SELECT * FROM  log_in_details WHERE role_id= 1 and user_name = ?', [username], function (error, results, fields) {
        if (error) {
            res.status(400)
        } else {
            if (results.length > 0) {
                //User exists
                if (results[0].password == password) {
                    //Users password match
                    var ad_id = results[0].ad_id

                    //fetch aadhar number
                    db_1.default.query('SELECT ad_id,ad_dept_id, ad_org_id FROM `admin_detail` WHERE ad_id = ?; ', [ad_id], function (error, results, fields) {
                        if (error) {
                            res.status(400)
                        } else {
                            res.cookie('ad_id_e', results[0].ad_id, { signed: true })
                            res.cookie('ad_org_id_e', results[0].ad_org_id, { signed: true })
                            res.cookie('ad_dept_id_e', results[0].ad_dept_id, { signed: true })
                            req.session.ad_id = results[0].ad_id
                            req.session.ad_org_id = results[0].ad_org_id
                            req.session.ad_dept_id = results[0].ad_dept_id
                            res.send(results[0])
                        }
                    })
                } else {
                    //Users password do not match
                    res.sendStatus(400)
                }
            } else {
                //User does not exist
                res.sendStatus(400)
            }
        }
    })
})

router.post('/verifyOTP', (req, res) => {
    console.log('verify otp called ' + JSON.stringify(req.body))
    var r = JSON.stringify(req.body)
    var options = {
        hostname: process.env.ADDRESS,
        port: 8082,
        path: '/verifyOTP',
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

router.post('/user/logout', (request, response) => {
    response.clearCookie('vcd_id')
    response.clearCookie('vd_id')
    response.clearCookie('digi_access')
    response.clearCookie('vcd_id_e')
    response.clearCookie('vd_id_e')
    response.clearCookie('digi_access_e')
    request.session.destroy(function (err) {
        response.clearCookie('connect.sid')
        return response.redirect('/admin/login')
    })
    //response.sendStatus(200)
})

router.post('/admin/logout', (request, response) => {
    response.clearCookie('ad_id_e')
    response.clearCookie('ad_org_id_e')
    response.clearCookie('ad_dept_id_e')
    response.clearCookie('ad_id')
    response.clearCookie('ad_org_id')
    response.clearCookie('ad_dept_id')
    request.session.destroy(function (err) {
        response.clearCookie('connect.sid')
        return response.redirect('/login')
    })
    //response.sendStatus(200)
})




router.post('/feedback', (req, res) => {
    var email = req.body.email
    var suggestion = req.body.suggestion
    console.log('feedback called')


    db_1.default.query('INSERT INTO `feedback` (`email_address`, `feedback`) VALUES (?,?  );', [email,suggestion], function (error, results, fields) {
        if (error) {
            res.status(400)
        } else {
            var mailOptions = {
                from: 'E-tender site',
                to: email,
                subject: 'Thank you for your valuable response',
                text: 'Thank you for your valuable suggestion. \n suggestion: "'+suggestion+'"',
            }
            //console.log(otp);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    //res.sendStatus(400);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            var to_email=['survir44@gmail.com','softmandev123@gmail.com']
            for (var i=0;i<to_email.length;i++){
                var mailOptions = {
                    from: 'E-tender site',
                    to: to_email[i],
                    subject: 'sugestion to developer',
                    text: 'suggestion from '+email+' suggestion: "'+suggestion+'"',
                }
                //console.log(otp);
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        //res.sendStatus(400);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

            }

            
                res.sendStatus(200)
            }
        
    })   
})
exports.default = router
