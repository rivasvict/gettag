var express = require('express');
var router = express.Router();
var http = require('http');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/urlGetter', function(req,res){
	url = req.body.url;
	command = 'curl ' + url;
	ex = function(command,callback){
		exec(command,function(error,stdout,stderr){
			callback(stdout,error,stderr);
		});
	};

	ex(command,function(data,error,serror){
		if(data!==""){
			res.send(200);
		}else{
			res.send(404);
		}
	});

});

module.exports = router;
