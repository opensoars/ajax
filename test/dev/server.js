var express = require('express'),
    app = express();

// Config, we use a weird port because of Travis
app.set('port', 6849);


// Middleware
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next){
  console.log(req.method + ' ' + req.url);
  next();
});

// Unorthodox body parser
app.use(function (req, res, next){
  var d = ''; req.on('data', function (c){ d += c; });
  req.on('end', function (){

    // Let's try to parse the data
    try { d = JSON.parse(d); }
    catch(e){}

    req.body = d;
    next();
  });
});

app.post('/login', function (req, res){

  res.json({
    status: 'succes',
    time: new Date().getTime(),
    u: req.body.u
  });

});


app.get('/does_not_end', function (req, res){

  console.log('Not ending request incoming');

});


// Start listening
app.listen(app.get('port'));

console.log('Server running at port:' + app.get('port'));