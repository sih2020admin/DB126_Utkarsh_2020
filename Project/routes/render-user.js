"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("./../miscellaneous/database/database functions/user");
var misc_1 = require("./../miscellaneous/database/database functions/misc");
var tender_1 = require("./../miscellaneous/database/database functions/tender");
var connection_1 = __importDefault(require("./../miscellaneous/database/connections/connection"));
var router = express_1.default.Router();
router.get('/', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request), tender_1.getTendersList()])
        .then(function (results) {
        response.render('user/index', {
            layout: false,
            tenders: results[1],
            user: user,
            username: results[0],
        });
    })
        .catch(function (error) {
        console.log('Error in loading Home Page');
        console.log(error);
    });
});
router.get('/register', function (request, response) {
    Promise.all([misc_1.getLegalStatus(), misc_1.getStates(), misc_1.getYears()])
        .then(function (result) {
        response.render('user/register', { layout: false, status: result[0], states: result[1], years: result[2] });
    })
        .catch(function (error) {
        console.log('Error in loading Register Page');
        console.log(error);
    });
});
router.get('/login', function (request, response) {
    response.render('user/login', { layout: false });
});
router.get('/help', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request)])
        .then(function (results) {
        response.render('user/help', { layout: false, user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Help Page');
        console.log(error);
    });
});
router.get('/profile', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request), misc_1.getYears(), misc_1.getLegalStatus(), misc_1.getStates(), tender_1.getProfileDetails(request)])
        .then(function (results) {
        response.render('user/profile', {
            layout: false,
            user: user,
            username: results[0],
            years: results[1],
            status: results[2],
            states: results[3],
            company_details: results[4][0][0],
            person_details: results[4][1][0],
            my_tenders: results[4][2],
            approved_tenders: results[4][3],
        });
    })
        .catch(function (error) {
        console.log('Error in loading Profile Page');
        console.log(error);
    });
});
router.get('/tenders', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request)])
        .then(function (results) {
        response.render('user/tenders', { layout: false, user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Tenders Page');
        console.log(error);
    });
});
router.get('/tender/apply', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request)])
        .then(function (results) {
        response.render('user/tender_apply', { layout: false, user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Tenders Page');
        console.log(error);
    });
});
router.get('/tender/upload-documents', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request)])
        .then(function (results) {
        response.render('user/tender_sign', { layout: false, user: user, username: results[0] });
    })
        .catch(function (error) {
        console.log('Error in loading Tenders Page');
        console.log(error);
    });
});
router.get('/tender/confirmation', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request), tender_1.confirmedTenderDetails(request)])
        .then(function (results) {
        results[1][2][0]['vcd'] = request.signedCookies.vcd_id_e;
        response.render('user/tender_confirmation', { layout: false, user: user, username: results[0], tender_details: results[1][0][0], personal_details: results[1][1][0], payment_details: results[1][2][0], bid_amt: results[1][3][0] , vcd:results[1][2][0]['vcd']});
    })
        .catch(function (error) {
        console.log('Error in loading Tenders Page');
        console.log(error);
    });
});
router.get('/tender/preview', function (request, response) {
    var user = user_1.isUser(request);
    var s;
    Promise.all([user_1.getUserUsername(request), tender_1.previewTenderDetails(request)])
        .then(function (results) {
        console.log(results[1][4]);
        response.render('user/preview', {
            layout: false,
            user: user,
            username: results[0],
            tender_details: results[1][0][0],
            personal_details: results[1][1][0],
            payment_details: results[1][2][0],
            misc_details: results[1][3][0],
        });
    })
        .catch(function (error) {
        console.log('Error in loading Tenders Page');
        console.log(error);
    });
});
router.get('/tender/payment', function (request, response) {
    var user = user_1.isUser(request);
    Promise.all([user_1.getUserUsername(request), tender_1.getPaymentDetails(request)])
        .then(function (results) {
        console.table({ value: results[1][0][0]['et_tender_fee'] });
        if (results[1][0][0]['et_tender_fee'] === '0') {
            connection_1.default.execute("update e_tender_vendor set status=110 where et_id=" + request.query["et_id"] + " and etd_id=" + request.query["etd_id"])
                .then(function (value) {
                response.redirect("/tender/upload-documents?et_id=" + request.query["et_id"] + "&etd_id=" + request.query["etd_id"]);
            });
        }
        else {
            response.render('user/tender-payment', { layout: false, user: user, username: results[0], amount: results[1][0][0]['et_tender_fee'], email: results[1][1][0]['vcd_email'], contact: results[1][1][0]['vcd_contact'] });
        }
    })
        .catch(function (error) {
        console.log('Error in loading Tender Payment Page');
        console.log(error);
    });
});
exports.default = router;
