"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stats_1 = require("./../miscellaneous/database/database functions/stats");
const stats_2 = require("./../miscellaneous/database/database functions/stats");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/statistics', (request, response) => {
    console.log("vendor stats called")
    Promise.all([stats_2.getTotalCountOfApplicationsOfVendor(request), stats_2.getTotalCountOfApplicationsOfVendor_dept(request), stats_2.getCountOfApplicationsOfVendorPerDepartment(request)])
        .then((results) => {
        // console.log(results);
        response.send(results)
    })
        .catch((error) => {
        console.log(error);
    });
});
router.post('/admin/statistics', (request, response) => {
    
    Promise.all([stats_1.getCountOfApplicationsPerTender(request), stats_1.getCountOfApplicationsPerTenderByStatus(request), stats_1.getApplicationsWhichPassedFirstStage(request), stats_1.getAmountDifference()])
        .then((results) => {
        //console.log(results[1])
        response.send(results);
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.default = router;
