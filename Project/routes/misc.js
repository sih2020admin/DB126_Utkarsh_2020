"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();

router.post('/get-state', function (request, response) {
    db_1.default.query('select * from states', function (error, result) {
        if (error) {
            console.log(error);
            response.send('some error in sending state names');
        }
        else {
            response.status(200).send(result);
        }
    });
});
router.post('/get-legal-status', function (request, response) {
    db_1.default.query('select l_name from legal_status_details ', function (error, result) {
        if (error) {
            console.log(error);
            response.send('Some error in sending legal status ');
        }
        else {
            response.status(200).send(result);
        }
    });
});

router.post('/city',function(req,res){
    
    db_1.default.query('SELECT * FROM city', function (error, result) {
        if (error) {
            // console.log(error);
            res.status(400).send("Error in /city");
        }
        else {
            res.status(200).send(result);
        }
    });
});

router.post('/get-department', function (request, response) {
    db_1.default.query('select dept_name from department ', function (error, result) {
        if (error) {
            console.log(error);
            response.send('Some error in sending Department ');
        }
        else {
            var filtered_result = [];
            for (var i = 1; i < result.length; i++) {
                filtered_result.push(result[i]);
            }
            response.status(200).send(filtered_result);
        }
    });
});

router.post('/get-city', function (request, response) {
    var state_code = request.body.state_code;
    db_1.default.query('SELECT * FROM `city` WHERE st_id In (SELECT st_id from states where st_name = ?);', [state_code], function (error, result) {

        if (error) {
            console.log(error);
            response.status(400).send('Some error in sending legal status ');
        }
        else {
            response.status(200).send(result);
        }
    });
});
router.post('/check-username', function (request, response) {
    var username = request.body.username;
    db_1.default.query("SELECT * FROM log_in_details WHERE user_name='" + username + "'", function (error, result) {
        if (error) {
            console.log(error);
        }
        else {
            if (result.length !== 0) {
                response.send('Username already exists<br>Use a different Username');
            }
            else {
                response.send('ok');
            }
        }
    });
});
router.post('/check-company', function (request, response) {
    var gst_register_number = request.body.gst_register_number;
    var pan_number = request.body.pan_number;
    var registration_number = request.body.registration_number;
    var result1 = '';
    db_1.default.query("SELECT * FROM vendor_details where v_gst='" + gst_register_number + "'", function (error, result) {
        if (error) {
            console.log(error);
            console.log('Error in getting GST Register Number');
        }
        else {
            if (result.length !== 0) {
                result1 = result1 + 'GST Register Number Already Exists<br>';
            }
            db_1.default.query("SELECT * FROM vendor_details where v_pan='" + pan_number + "'", function (error, result) {
                if (error) {
                    console.log('Error in getting Pan Number');
                }
                else {
                    if (result.length !== 0) {
                        result1 = result1 + 'Pan Number Already Exists<br>';
                    }
                    db_1.default.query("SELECT * FROM vendor_details where v_reg_no='" + registration_number + "'", function (error, result) {
                        if (error) {
                            console.log('Error in getting Register Number');
                        }
                        else {
                            if (result.length !== 0) {
                                result1 = result1 + 'Registration Number Already Exists<br>';
                            }
                            response.send(result1);
                        }
                    });
                }
            });
        }
    });
});
exports.default = router;
