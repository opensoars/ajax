var page = require('webpage').create();
page.open('http://localhost:6789/tests.html', function (){


  setTimeout(function (){
    page.render('example.png');
    phantom.exit();
  }, 5000);


});
