var express = require('express');
var app = express();
app.use(express.bodyParser());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.get('/', function(req, res) {
	res.send("hello world");
})

app.post('/files', function(req, res){
	console.log(req.body);
	var data = {
		msg: "/files/post"
	};

	if (req.files.files && req.files.files[0] && req.files.files[0].length)
	{
		data.msg = req.files.files[0].length + " files posted";
		for (var i = 0; i < req.files.files[0].length; i++) {
			console.log(JSON.stringify(req.files.files[0][i]));
		}
	}

  	res.send(data);
});

app.listen(3000);