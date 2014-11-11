var page = require('webpage').create();
page.open('http://localhost:6789', function (){


  phantom.exit();
});

// Cuz it sometimes won't end?
setTimeout(function (){
  phantom.exit();
}, 5000);