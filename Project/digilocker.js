var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var crypto = require('crypto');

var cors = require('cors');
app.use(cors());

const rp = require('request-promise');
app.set('view engine', 'ejs');

//requiring path and fs modules
var fs = require('fs');

var mysql = require('mysql');

//creating sql connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "e_tender"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
})

//Below function will return current timestamp in IST
function getIST() {

    //getting Current Timestamp in IST
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    // ISTTime now represents the time as per IST
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    var secondsIST = ISTTime.getSeconds()
    var dateIST = ISTTime.getDate()
    var monthIST = ISTTime.getMonth() + 1    //gives 0 for january and so on.. hence added 1
    var yearIST = ISTTime.getFullYear()

    var date = "" + dateIST + "/" + monthIST + "/" + yearIST;
    var time = "" + hoursIST + ":" + minutesIST + ":" + secondsIST;

    return date + ";" + time;
}

//will make digilocker api call and update new token in database
function get_refresh_token(res, vcd_id) {
    var refresh_token1;
    var date, time;

    //get timestamp of token from database
    var sql = "SELECT date, time FROM access_token WHERE id=" + vcd_id;
    con.query(sql, function (err, result) {
        if (err) {
            res.status(400).send({ error: "Database connection failed, can't get timestamp of access token" });
        }
        else {
            console.log("data recieved");
            date = result[0].date;
            time = result[0].time;

            //get current timestamp in IST
            var temp = getIST();
            temp = temp.split(';');
            var cur_date = temp[0];
            var cur_time = temp[1];

            //get date, month, year from date and hr minute and sec from time
            date = date.split('/'); //split date to get day, month and year
            var date_d = date[0];
            var date_m = date[1];
            var date_y = date[2];

            time = time.split(':'); //split time to get hours, minutes and seconds
            var time_h = time[0];
            var time_m = time[1];
            var time_s = time[2];

            cur_date = cur_date.split('/'); //split --current-- date to get day, month and year
            var cur_date_d = cur_date[0];
            var cur_date_m = cur_date[1];
            var cur_date_y = cur_date[2];

            cur_time = cur_time.split(':'); //split --current-- time to get hours, minutes and seconds
            var cur_time_h = cur_time[0];
            var cur_time_m = cur_time[1];
            var cur_time_s = cur_time[2];

            var date = new Date(date_y, date_m, date_d, time_h, time_m, time_s); //structuring old date
            var cur_date = new Date(cur_date_y, cur_date_m, cur_date_d, cur_time_h, cur_time_m, cur_time_s); //structuring --current-- date

            //calculate time and day difference (time difference in minutes)
            timeDifference = Math.abs(date.getTime() - cur_date.getTime());

            let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
            let differentTime = Math.ceil(timeDifference / (1000 * 60));

            //compare dates if difference is == 0 or 1 days (we are taking diffDay = 1 because we have use ceil function see below)
            //and compare time if difference is < 50 minutes don't refresh token
            // note: although token expires after 60 minutes we will refresh token after 50 minutes only
            if ((differentDays == 1 || differentDays == 0) && differentTime < 50) {
                res.status(200).send({ msg: "No need to refresh token" });
            }
            else {
                //get refresh token from database... using which we can get new access token
                var sql = "SELECT refresh FROM access_token WHERE id=" + vcd_id;
                con.query(sql, function (err, result) {
                    if (err) {
                        res.status(400).send({ error: "Database connection failed, can't get refresh token from database" });
                    } else {
                        refresh_token1 = result[0].refresh;

                        //creating options parameter for external server call
                        var options = {
                            method: 'POST',
                            uri: 'https://api.digitallocker.gov.in/public/oauth2/1/token',
                            form: {
                                refresh_token: refresh_token1,
                                grant_type: "refresh_token"
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': 'Basic REM4RkI4Q0Y6YzBhZjE2NjFlZDA1Mjk0YjhmODM='
                            },
                            json: true
                        };
                        //sending request with above options to digilocker to get new access token
                        rp(options)
                            .then(function (body) {
                                console.log('Success');
                                console.log(body);

                                //getting Current Timestamp in IST
                                var temp = getIST();
                                temp = temp.split(';');
                                var date = temp[0];
                                var time = temp[1];

                                //Updating access and refresh token into database
                                var sql = "UPDATE access_token SET access = '" + body.access_token + "', refresh = '" + body.refresh_token + "', date = '" + date + "', time = '" + time + "' WHERE id=" + vcd_id;
                                con.query(sql, function (err, result) {
                                    if (err) {
                                        res.status(400).send({ error: "Database query failed, can't update access token" });
                                    } else {
                                        res.status(200).send({ msg: "Your token has been refreshed successfully" });
                                    }
                                });
                            })
                            .catch(function (err) {
                                console.log('Failure', err);
                                if (err) throw err;
                            });
                    }
                });
            }
        }
    });
}

//gets access_token from digilocker and stores it in database
app.post('/get_access_token', (req, res) => {
    var auth_code = req.body.code;
    var vcd_id = req.body.id;
    console.log("code", auth_code);

    //creating options parameter for external server call
    var options = {
        method: 'POST',
        uri: 'https://api.digitallocker.gov.in/public/oauth2/1/token',
        body: {
            code: auth_code,
            grant_type: "authorization_code",
            client_id: "DC8FB8CF",
            client_secret: "c0af1661ed05294b8f83",
            redirect_uri: "http://165.22.210.37:8081/v4_apply_tender_s3.html"
        },
        headers: {
            'Content-Type': 'application/json',
        },
        json: true
    };

    //sending request with above options to digilocker to get access token
    rp(options)
        .then(function (body) {
            console.log('Success');
            console.log(body);

            //getting Current Timestamp in IST
            var temp = getIST();
            temp = temp.split(';');
            var date = temp[0];
            var time = temp[1];

            //Updating digi_access value of user (set digi_access = 1 for specific user)
            var sql = "UPDATE v_contact_details SET digi_access=1 WHERE vcd_id=" + vcd_id;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("digi_access of user updated (digi_access = 1) now");

                //Inserting access and refresh token into database
                var sql = "INSERT INTO access_token (id, name, access, refresh, date, time) VALUES (" + vcd_id + ",'Sanket', '" + body.access_token + "', '" + body.refresh_token + "', '" + date + "', '" + time + "')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Access token has been successfully stored in DB");
                    res.status(200).send('{"msg":"Got digilocker access"}');
                });
            });

        })
        .catch(function (err) {
            console.log('Failure', err);
        });
});

//refreshes access token got from digilocker
app.post('/refresh_token', (req, res) => {
    var vcd_id = req.body.id;
    get_refresh_token(res, vcd_id);
});

//fetches self_uploaded files from digilocker
app.post('/fetch_files', (req, res) => {
    var current_id = req.body.id;
    var vcd_id = req.body.vcd_id;
    var access_token;

    //Get access token from database
    var sql = "SELECT access FROM access_token WHERE id=" + vcd_id;
    con.query(sql, function (err, result) {
        if (err) {
            res.status(400).send({ error: "Database query failed, can't get access token from DB" });
        };
        console.log("Data received");
        access_token = result[0].access;

        //creating options parameter for external server call
        var options = {
            method: 'GET',
            uri: 'https://api.digitallocker.gov.in/public/oauth2/1/files/' + current_id,
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        };

        //sending request with above options to digilocker to get list of files 
        rp(options)
            .then(function (body) {
                console.log('Success');
                res.status(200).send(body);
            })
            .catch(function (err) {
                console.log('Failure', err);
                res.status(400).send({ error: "Digilocker API call failed " + err });
            });
    });
});

//upload files to digilocker
app.post('/upload_files', function (req, res) {
    var file_name = req.body.filename;
    //console.log(file_name);

    //joining path of directory
    /*var path = require('path');
    const directoryPath = path.join(__dirname, '../uploaded_documents/'+file_name);
    */
    const directoryPath = '/root/e-sign/uploaded_documents/' + file_name;

    //console.log(directoryPath);
    var data = fs.readFileSync(directoryPath);
    //console.log(data);

    //console.log(req.body);     //show form data
    //console.log(req.files); //show form file
    //console.log(req.headers); //show headers

    var vcd_id = req.header('vcd_id');
    var pathDigi = req.header('path');
    //console.log(vcd_id, pathDigi);

    //Algorithm to be used for HMAC
    var algorithm = 'sha256';
    //Secret to be used with HMAC
    var secret = 'c0af1661ed05294b8f83';
    //creating hmac object
    var hmac = crypto.createHmac(algorithm, secret);

    //set file data in hmac object
    hmac.update(data);
    //generate hmac
    var gen_hmac = hmac.digest('base64')
    //console.log('Hmac generated using ' + algorithm + ' \nHashed output is :  ' + gen_hmac + ' \nFile name is :  ' + file_name);

    //Get access token from database
    var sql = "SELECT access FROM access_token WHERE id=" + vcd_id;
    con.query(sql, function (err, result) {
        if (err) {
            res.status(400).send({ error: "Database query failed" });
        };
        access_token = result[0].access;
        //console.log("Data received");

        var options = {
            method: 'POST',
            uri: 'https://api.digitallocker.gov.in/public/oauth2/1/file/upload',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': "application/pdf",
                'path': pathDigi + '/' + file_name,
                'hmac': gen_hmac
            }
        };

        rp(options)
            .then(function (body) {
                console.log('Success');
                res.status(200).send(gen_hmac);
            })
            .catch(function (err) {
                console.log('Failure', err);
            });
    });
});

//revoke digilocker token
app.post('/revoke_token', function (req, res) {
    console.log("Revoke called");
    console.log(req.body);
    console.log(req.body.vcd_id);
    var vcd_id = req.body.vcd_id;

    //Get access token from database
    var sql = "SELECT access FROM access_token WHERE id=" + vcd_id;
    con.query(sql, function (err, result) {
        if (err) {
            res.status(400).send({ error: "Database query failed" });
        };
        access_token = result[0].access;
        console.log("Data received", typeof (access_token));
        var options = {
            method: 'POST',
            uri: 'https://api.digitallocker.gov.in/public/oauth2/1/revoke',
            body: {
                token: access_token,
            },
            headers: {
                'Authorization': 'Basic REM4RkI4Q0Y6YzBhZjE2NjFlZDA1Mjk0YjhmODM=',
            },
            json: true
        };

        rp(options)
            .then(function (body) {
                console.log('Success');
                res.sendStatus(200);
            })
            .catch(function (err) {
                console.log('Failure', err);
            });
    });
});

app.listen(8085, (req, res) => {
    console.log("Listening on 8085");
});