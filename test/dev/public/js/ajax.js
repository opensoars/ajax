function Ajax(o){

  var self = this;

  o = o || {};

  // A url is required
  if(!o.url) throw 'Ajax needs a url to make the request to';

  // We default to the method GET
  o.method = o.method || 'GET';

  // We default to an empty data string
  o.data = o.data || '';

  this.doneCb = undefined;
  this.failCb = undefined;



  // Let's create the XMLHttpRequest
  var req = new XMLHttpRequest();

  var completed = false;

  req.onreadystatechange = function (){
    if(this.readyState === 4)
      if(this.status === 200 || this.status === 304){
        var res = this.response;

        // Is the content-type set to JSON?
        if(/application\/json/.test(this.getAllResponseHeaders()))
          res = JSON.parse(res);
        
        if(completed === false){
          completed = true;
          self.doneCb(res); 
        }
      }
      else {
        if(completed === false){
          completed = true;
          self.failCb({
            desc: 'Status was not 200 or 304',
            status: this.status
          }); 
        }
      }

    
  };

  // 3rd arg true cuz we only use async ajax
  req.open(o.method, o.url, true);

  // We do not accept functions as data
  if(typeof o.data === 'function')
    throw 'Ajax cannot send a function';

  // If our data is an object, we JSON stringify it
  if(typeof o.data === 'object')
    o.data = JSON.stringify(o.data);

  // Let's send the request along with our data
  req.send(o.data);


  return this;
}

Ajax.prototype.done = function (cb){
  this.doneCb = cb;

  return this;
};


Ajax.prototype.fail = function (cb){
  this.failCb = cb;

  return this;
};
