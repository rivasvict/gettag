var express = require('express');
var router = express.Router();
var http = require('http');
var exec = require('child_process').exec;
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/urlGetter', function(req,res){
	url = req.body.url;

/*	request(url,function(error,response,body){
		if(body!==undefined){res.send(200)}else{res.send(404);}
	});*/

	var command = 'wget ' + url + ' -O /dev/null';
	ex = function(command,callback){
		exec(command,function(error,stdout,stderr){
			callback(stdout,error,stderr);
		});
	};

	ex(command,function(data,error,serror){
		if(serror.indexOf('200 OK')!==-1){
			res.send(200);
		}else{
			res.send(404);
		}
	});

});

module.exports = router;
