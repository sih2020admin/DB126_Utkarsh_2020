"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
router.post("/get-state", function (request, response) {
    console.log("States loaded");
    db_1.default.query("select * from states", function (error, result) {
        if (error) {
            console.log(error);
            response.send("some error in sending state names");
        }
        else {
            response.status(200).send(result);
        }
    });
});
router.post("/get-legal-status", function (request, response) {
    console.log("Legal status loaded");
    db_1.default.query("select * from legal_status_details ", function (error, result) {
        if (error) {
            console.log(error);
            response.send("Some error in sending legal status ");
        }
        else {
            response.status(200).send(result);
        }
    });
});
exports.default = router;
