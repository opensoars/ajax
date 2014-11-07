function Ajax(o){
  o = o || {};

  // A url is required
  if(!o.url) throw 'Ajax needs a url to make the request to';

  // We default to the method GET
  o.method = o.method || 'GET';

  // We default to an empty data string
  o.data = o.data || '';

  this.doneCb = undefined;
  this.failCb = undefined;


  this.req = new XMLHttpRequest();

  this.req.onreadystatechange = function (){
    console.log(this);
  };

  // 3rd arg true cuz we only use async ajax
  this.req.open(o.method, o.url, true);

  /**
   * Make our data ready for use
   */

  if(typeof o.data === 'function')
    throw 'Ajax cannot send a function';

  if(typeof o.data === 'object')
    o.data = JSON.stringify(o.data);


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
