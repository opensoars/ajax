var express = require('express'),
    app = express();

// Config
app.set('port', 80);


// Middleware
app.use(express.static(__dirname + '/public'));


app.post('/login', function (req, res){

  res.json({
    status: 'succes',
    time: new Date().getTime()
  });

});


// Start listening
app.listen(app.get('port'));