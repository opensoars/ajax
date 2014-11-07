var express = require('express'),
    app = express();

// Config
app.set('port', 80);


// Middleware
app.use(express.static(__dirname + '/public'));

// Unorthodox body parser
app.use(function (req, res, next){
  var d = ''; req.on('data', function (c){ d += c; });
  req.on('end', function (){
    req.body = d;
    next();
  });
});

app.post('/login', function (req, res){

  res.json({
    status: 'succes',
    time: new Date().getTime()
  });

});


// Start listening
app.listen(app.get('port'));