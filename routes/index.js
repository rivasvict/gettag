var express = require('express');
var router = express.Router();
var http = require('http');
var exec = require('child_process').exec;
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Gettag - Get script and css tags for your web app' });
});

//----------Attempts to touch an url given
router.post('/urlGetter', function(req,res){
	url = req.body.url;

	request(url,function(error,response,body){
		if(body!==undefined){res.send(200)}else{res.send(404);}
	});
});
//---------------------------------------------------------


//----------Retrieves the CDN object from http://api.cdnjs.com/libreries
router.post('/getCdn',function(req,res){
	url = 'http://api.cdnjs.com/libraries';

	request(url,function(error,response,body){
		res.send(response);
	});
});
//------------------------------------------


module.exports = router;
