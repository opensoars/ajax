/**
 * Ajax constructor
 * @param  o {object}  Options
 * @return Ajax instance
 */
function Ajax(o){
  var self = this;
  o = o || {};

  /**
   * Setting up data which is required
   */
  if(!o.url) throw 'Ajax needs a url to make the request to';

  o.method  = o.method  || 'GET';
  o.data    = o.data    || '';
  o.timeout = o.timeout || 5000;

  // Make sure o.data is OK
  if(typeof o.data === 'function') throw 'Ajax cannot send a function';

  this.doneCb = undefined;
  this.failCb = undefined;


  /**
   * Scoped variables
   */
  var req = new XMLHttpRequest(),
      has_completed = false;


  /**
   * done and fail helper functions
   * Can get called from ontimeout and onreadystatechange
   */
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


  /**
   * Event handler functions
   */
  req.onreadystatechange = function (){
    if(this.readyState === 4 && this.status !== 0)
      if(this.status === 200 || this.status === 304){

        var res = this.response;

        if(/application\/json/.test(this.getAllResponseHeaders()))
          res = JSON.parse(this.response);

        done(res);
      }
      else fail({
        desc: 'HTTP status code was neiter a 200 nor 304',
        status: this.status,
        res: this.response
      }); 
  };

  req.ontimeout = function (){
    fail({
      desc: 'Request timed out after: ' + req.timeout + ' ms',
      status: this.status
    }); 
  }


  req.open(o.method, o.url, true);

  // Timeout has to be set AFTER req.open cuz of IE
  req.timeout = o.timeout;

  // Are we sending JSON?
  if(typeof o.data === 'object') o.data = JSON.stringify(o.data);

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
