/**
 * Ajax constructor.
 * @param {object} o - Options
 * @example
 * new Ajax({ url: '/' }).done(cb).fail(cb);
 */
function Ajax(o){
  var self = this;
  o = o || {};

  if(!o.url) throw 'Ajax needs a url to make the request to';

  o.method  = o.method  || 'GET';
  o.data    = o.data    || '';
  o.timeout = o.timeout || 5000;


  this.doneCb = undefined;
  this.failCb = undefined;


  var req = new XMLHttpRequest(),
      has_completed = false;

  /**
   * Gets called when a requests succeeds.
   * @param {string|object} res - Response string, object if JSON
   * @private
   */
  function done(res){
    if(has_completed === false){
      has_completed = true;
      if(self.doneCb) self.doneCb(res, req); 
    }
    else throw '`has_completed === true`. Already called done or fail';
  }

  /**
   * Gets called when a request fails.
   * @param {object} res - Response object describing the failure
   * @private
   */
  function fail(res){
    if(has_completed === false){
      has_completed = true;
      if(self.failCb) self.failCb(res, req); 
    }
    else throw '`has_completed === true`. Already called done or fail';
  }

  /**
   * Gets called when the specified timeout is exceeded.
   * @private
   */
  function ontimeout(){
    fail({
      desc: 'Request timed out after: ' + req.timeout + ' ms',
      status: this.status
    }); 
  }

  /**
   * Ready state change handler. Either calls done or fail. Depending
   * on the response status.
   * @this XMLHttpRequest
   * @private
   */
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


  // Bind event handler functions to req
  req.onreadystatechange = onreadystatechange 
  req.ontimeout = ontimeout;


  req.open(o.method, o.url, true);

  // Timeout has to be set AFTER req.open cuz of IE o.O
  req.timeout = o.timeout;

  // Make sure data is OK
  if(typeof o.data === 'function')
    throw 'Ajax cannot send a function';

  if(typeof o.data === 'object')
    o.data = JSON.stringify(o.data);


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
