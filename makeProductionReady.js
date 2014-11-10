var uglify = require('uglify-js'),
    fs = require('fs');


var SCRIPT_LOCATION = __dirname + '/test/dev/public/js/ajax.js',
    PRODUCTION_LOCATION = __dirname + '/ajax.js',
    PRODUCTION_LOCATION_MIN = __dirname + '/ajax.min.js';


fs.readFile(SCRIPT_LOCATION, 'utf8', function (err, script){
  if(err) throw 'Could not read script from: ' + SCRIPT_LOCATION
    + '\n' + err;

  fs.writeFile(PRODUCTION_LOCATION, script, function (err){
    if(err) throw 'Could not write production script at: '
      + PRODUCTION_LOCATION + '\n' + err;
  });


  var uglified = uglify.minify(script, {fromString: true}),
      uglified_script = uglified.code;

  fs.writeFile(PRODUCTION_LOCATION_MIN, uglified_script, function (err){
    if(err) throw 'Could not write production minified script at: '
      + PRODUCTION_LOCATION + '\n' + err;
  });




});