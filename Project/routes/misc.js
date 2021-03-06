"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router = express_1.default.Router();
router.post('/get-state', (request, response) => {
    db_1.default.query('select st_name from states', (error, result) => {
        if (error) {
            console.log(error);
            response.send('some error in sending state names');
        }
        else {
            response.status(200).send(result);
        }
    });
});
router.post('/get-legal-status', (request, response) => {
    db_1.default.query('select l_name from legal_status_details ', (error, result) => {
        if (error) {
            console.log(error);
            response.send('Some error in sending legal status ');
        }
        else {
            response.status(200).send(result);
        }
    });
});
router.post('/get-department', (request, response) => {
    db_1.default.query('select dept_name from department ', (error, result) => {
        if (error) {
            console.log(error);
            response.send('Some error in sending Department ');
        }
        else {
            let filtered_result = [];
            for (let i = 1; i < result.length; i++) {
                filtered_result.push(result[i]);
            }
            response.status(200).send(filtered_result);
        }
    });
});
router.post('/get-city', (request, response) => {
    const state_code = request.body.state_code;
    db_1.default.query(`select c_name from city inner join states on city.st_id=states.st_id where st_name='${state_code}'`, (error, result) => {
        if (error) {
            console.log(error);
            response.status(400).send('Some error in sending legal status ');
        }
        else {
            response.status(200).send(result);
        }
    });
});
router.post('/check-username', (request, response) => {
    let username = request.body.username;
    db_1.default.query(`SELECT * FROM log_in_details WHERE user_name='${username}'`, (error, result) => {
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
router.post('/check-company', (request, response) => {
    let gst_register_number = request.body.gst_register_number;
    let pan_number = request.body.pan_number;
    let registration_number = request.body.registration_number;
    var result1 = '';
    db_1.default.query(`SELECT * FROM vendor_details where v_gst='${gst_register_number}'`, (error, result) => {
        if (error) {
            console.log(error);
            console.log('Error in getting GST Register Number');
        }
        else {
            if (result.length !== 0) {
                result1 = result1 + 'GST Register Number Already Exists<br>';
            }
            db_1.default.query(`SELECT * FROM vendor_details where v_pan='${pan_number}'`, (error, result) => {
                if (error) {
                    console.log('Error in getting Pan Number');
                }
                else {
                    if (result.length !== 0) {
                        result1 = result1 + 'Pan Number Already Exists<br>';
                    }
                    db_1.default.query(`SELECT * FROM vendor_details where v_reg_no='${registration_number}'`, (error, result) => {
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
