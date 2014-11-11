describe('ajax', function (){
  describe('#normal post', function (){

    var return_obj_str =
      "{status: 'succes', u: 'usernam1', time: `time_integer` }";

    it('should return ' + return_obj_str, function (done, t){

      var username_to_post = 'username1';

      new Ajax({
        url: '/login',
        method: 'POST',
        data: {
          u: username_to_post,
          p: 'password1'
        },
      }).done(function (res){
        console.log(typeof res);
        assert.equal(res.status, 'succes');
        assert.equal(res.u, username_to_post);
        assert.equal(typeof res.time, 'number');
        done();
      }).fail(function (res){
        throw 'Request could not be completed\n' + res.desc;
      });

    });
  });
});