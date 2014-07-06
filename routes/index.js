var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/urlGetter', function(req,res){
	url = req.body.url;
	command = 'crul' + url;
	ex = function(command,callback){
		exec(command,function(error,stdout,stderr){
			callback(stdout,error,stderr);
		});
	}
	ex(command,function(data,error,serror){
		if(data!==""){
			res.send(200);
		}else{
			res.send(400);
		}
	});
});

module.exports = router;
