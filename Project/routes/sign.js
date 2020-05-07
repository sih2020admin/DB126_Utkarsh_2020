"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();

router.post('/details',function (req,res) {

    var id = req.body.vcd_id;
    db_1.default.query('SELECT vcd_name,vcd_aadhar,vcd_email FROM v_contact_details WHERE vcd_id=?',[id],function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        else{
            // console.log(result);
            res.status(200).send({"name":result[0].vcd_name,"email":result[0].vcd_email,"aadhar":result[0].vcd_aadhar});

        }
    });
});

exports.default = router;