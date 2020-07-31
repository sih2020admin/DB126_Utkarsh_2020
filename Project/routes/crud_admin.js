"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var router = express_1.default.Router();
var path = require("path")
var fs = require('fs');
var archiver = require('archiver');



var multer = require('multer');
var postStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        let fileName = '', postName;
        if(typeof req.body.postName !== "undefined") {
            postName = req.body.postName.toLowerCase().replace(/ /g, '-');
            filename += postName;
        }
        var date = new Date();
		var components = [
		    date.getYear(),
		    date.getMonth(),
		    date.getDate(),
		    date.getHours(),
		    date.getMinutes(),
		    date.getSeconds(),
		    date.getMilliseconds()
		];

		var id = components.join("");
        fileName +=id;
        fileName += ".pdf";
        callback(null, fileName);
    }
});
function get_data(f) {
	// body...

fs.readFile('uploads/'+f, 'utf8', function (err,data) {
		// body...
		if(err) console.log(err);
		return data;
	})
}


router.post('/fileupload', function (req, res) {

	console.log("file_upload called");
	var uploadPost = multer({storage: postStorage}).single('tender_pdf');
	uploadPost(req, res, function(err) {
        if(err) {
        	console.log(err)
            return res.end("error uploading file");
        }
        console.log(req.file.filename)
        res.send(`{"filename":"`+req.file.filename+`"}`);
    });
	
});

router.post('/generate_zip', function (req, res) {
	var p=path.resolve(__dirname, '..')+'/uploads/';
	console.log("generate zip called "+p);
	var f1 = req.body.file1_uri;
	var f2 = req.body.file2_uri;
	
    var date = new Date();
		var components = [
		    date.getYear(),
		    date.getMonth(),
		    date.getDate(),
		    date.getHours(),
		    date.getMinutes(),
		    date.getSeconds(),
		    date.getMilliseconds()
		];

		var id = components.join("");
    
	var output = fs.createWriteStream(p+'/'+id+'.zip');
	var archive = archiver('zip', {
	    gzip: true,
	    zlib: { level: 9 } // Sets the compression level.
	});

	archive.on('error', function(err) {
	  throw err;
	});

	// pipe archive data to the output file
	archive.pipe(output);

	// append files
	archive.file(p+f1, {name: 'technical.pdf'});
	archive.file(p+f2, {name: 'BOQ.pdf'});

	//
	archive.finalize();	
	// fs.unlinkSync(p+f1);
	// fs.unlinkSync(p+f2);
	res.end(`{"zip_link":"uploads/`+id+`.zip"}`);
	
});





router.post('/create_tender', function (req, res) {

	console.log("craete tender called",req.body.et_title)	
	var et_title	 = req.body.et_title
	var et_tender_fee	 = req.body.et_tender_fee
	// var et_tender_ref_no	 = req.body.et_tender_ref_no
	var et_tender_desc	 = req.body.et_tender_desc
	var et_last_date_apply	 = req.body.et_last_date_apply
	var et_bidding_date	 = req.body.et_bidding_date
	var et_file_uri	 = req.body.et_file_uri
	// var dept_id	 = req.body.dept_id
	// var ad_id = req.signedCookies.ad_id_e;
	var dept_id = req.signedCookies.ad_dept_id_e;
	var maximum_bid = req.body.max_bid
    // var ad_org_id = req.signedCookies.ad_org_id_e;

	db_1.default.query('SELECT dept_name,(SELECT max(et_id) FROM e_tender_details) as et_id FROM department WHERE dept_id=?',[dept_id],function(err,result){
		if(err){
			res.sendStatus(400);
			console.log("Create Tender Department Fetching Error");
		}
		else{
			const todaysDate = new Date()
			const currentYear = todaysDate.getFullYear()
			var et_id=result[0].et_id;
			et_id+=1;
			var ref_no= currentYear + '/' + et_id+ '/' + result[0].dept_name + et_id;
			db_1.default.query('INSERT INTO `e_tender_details` ( `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `is_delete`, `dept_id` , `maximum_bid`) VALUES ( ?, ?, ?,?,?,?, ?, 0, ?,?);',[et_title ,et_tender_fee ,ref_no ,et_tender_desc ,et_last_date_apply ,et_bidding_date ,et_file_uri ,dept_id,maximum_bid] ,function (error, results, fields) {
				if (error) {
					console.log("error",error);
					if (error.code == "ER_DUP_ENTRY") {
						res.status(400)
						res.send("Duplicate entry")
					}
					else res.sendStatus(400);
					// console.log("gettenderlist called0")	
				}
				else{
					res.sendStatus(200);
				}
			});
		}
	});	
});




router.post('/update_tender', function (req, res) {

	console.log("update tender called",req.body.et_id)
	var et_id = req.body.et_id	
	var et_title	 = req.body.et_title
	// var et_tender_fee	 = req.body.et_tender_fee
	// var et_tender_ref_no	 = req.body.et_tender_ref_no
	var et_tender_desc	 = req.body.et_tender_desc
	var et_last_date_apply	 = req.body.et_last_date_apply
	var et_bidding_date	 = req.body.et_bidding_date
	// var et_file_uri	 = req.body.et_file_uri

	db_1.default.query("UPDATE e_tender_details SET et_title=?,et_tender_desc=?,et_last_date_apply=?,et_bidding_date=? WHERE et_id=?",[et_title ,et_tender_desc ,et_last_date_apply ,et_bidding_date ,et_id] ,function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
	       		res.sendStatus(200);
      		}
    	});
});

router.post('/delete_tender', function (req, res) {

	console.log("update tender called",req.body.et_id)
	var et_id = req.body.et_id	
	
	db_1.default.query("UPDATE `e_tender_details` SET `is_delete`= 1  WHERE et_id = ? ;",[et_id] ,function (error, results, fields) {
		if (error) {
	      		console.log("error",error);
	      		res.sendStatus(400);
	      		// console.log("gettenderlist called0")	
	     	}
	     else{
	       		res.sendStatus(200);
      		}
    	});
});





exports.default = router;
