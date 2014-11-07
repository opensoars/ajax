/**
 * Ajax constructor
 * @param o {object}  Options
 */
function Ajax(o){
  var self = this;
  o = o || {};

  if(!o.url) throw 'Ajax needs a url to make the request to';

  o.method  = o.method  || 'GET';
  o.data    = o.data    || '';
  o.timeout = o.timeout || 1000;


  this.doneCb = undefined;
  this.failCb = undefined;


  var req = new XMLHttpRequest(),
      has_completed = false,
      has_timed_out = false;


  function done(res){
    if(has_completed === false){
      has_completed = true;
      if(self.doneCb) self.doneCb(res, req); 
    }
    else throw '`has_completed === true`. Already called done or fail';
  }

  function fail(res){
    if(has_completed === false){
      has_completed = true;
      if(self.failCb) self.failCb(res, req); 
    }
    else throw '`has_completed === true`. Already called done or fail';
  }

  function ontimeout(){
    fail({
      desc: 'Request timed out after: ' + req.timeout + ' ms',
      status: this.status
    }); 
  }

  function onreadystatechange(){
    if(this.readyState === 4 && this.status !== 0)
      if(this.status === 200 || this.status === 304){

        if(/application\/json/.test(this.getAllResponseHeaders()))
          this.response = JSON.parse(this.response);

        done(this.response);
      }
      else fail({
        desc: 'HTTP status code was neiter a 200 nor 304',
        status: this.status,
        res: this.response
      }); 
  };

  /**
   * SO WE GOTTA FIX THE TIMEOUT OURSELF!
   * SO WE GOTTA FIX THE TIMEOUT OURSELF!
   * SO WE GOTTA FIX THE TIMEOUT OURSELF!
   */
  //req.timeout = o.timeout;


  // Bind event handler functions to req
  req.onreadystatechange = onreadystatechange 
  req.ontimeout = ontimeout;


  req.open(o.method, o.url, true);

  // Make sure data is OK
  if(typeof o.data === 'function')
    throw 'Ajax cannot send a function';

  if(typeof o.data === 'object')
    o.data = JSON.stringify(o.data);


  req.send(o.data);


  return this;
}

// Set doneCb to the cb function given
Ajax.prototype.done = function (cb){
  this.doneCb = cb;
  return this;
};

// Set failCb to the cb function given
Ajax.prototype.fail = function (cb){
  this.failCb = cb;
  return this;
};
