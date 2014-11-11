describe('ajax', function (){

  describe('#POST /login (normal)', function (){

    var return_obj_str =
      "{status: 'succes', u: 'usernam1', time: `time_integer` }";

    it('should return an object like: ' + return_obj_str, function (done, t){

      var username_to_post = 'username1';

      new Ajax({
        url: '/login',
        method: 'POST',
        data: {
          u: username_to_post,
          p: 'password1'
        },
      }).done(function (res){

        assert.equal(typeof res, 'object');
        assert.equal(res.status, 'succes');
        assert.equal(res.u, username_to_post);
        assert.equal(typeof res.time, 'number');
        done();

      }).fail(function (res){
        throw 'Request could not be completed\n' + res.desc;
      });

    });
  });

  describe('#POST /does_not_exist (not found)', function (){
    it('should fire the fail callback and give us an object with info about the fail', function (done){
      
      new Ajax({
        url: '/does_not_exist',
        method: 'POST',
        data: {
          u: 'username1',
          p: 'password1'
        },
      }).done(function (){
        throw 'The `done` callback was fired';
      }).fail(function (res){
        assert.equal(res.status, 404);
        assert.equal(res.desc, "HTTP status code was neiter a 200 nor 304");
        done();
      });

    });
  });

  describe('#GET /does_not_end (timeout)', function (){

    var timeout = 333;

    it('should timeout after ' + timeout + ' ms and give us an object with info about the fail', function (done){
      
      new Ajax({
        url: '/does_not_end',
        timeout: timeout,
      }).done(function (){
        throw 'The `done` callback was fired';
      }).fail(function (res){
        assert.equal(res.desc, "Request timed out after: " + timeout + " ms");
        assert.equal(res.status, 0);
        done();
      });

    });
  });

});