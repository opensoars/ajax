ajax
====

Basic AJAX library that kind of simulates the way jQuery does AJAX requests.

---

### Why another AJAX library?
We do not want to require useless code we don't use (like jQuery). This library is also a little bit more basic in terms of possibilities. It just does what it's supposed to do, and does it lightweight.


### API

##### Initialize a new AJAX request
```js
var options = {};

new Ajax(options);
```

##### Options
```js
var options = {

  // Required
  url: '/someResource',

  // Defaults to GET
  method: 'POST',

  // Defaults to 5000 ms
  timeout: 1000,

  // Can be an object, array, string or number
  // When it's valid JSON, it will be automaticly stringified
  data: {
    a: 'b',
    hello: 'world',
    selected: [1, 3, 4, 5]
  }

};
```

##### Callback functions
We use two types of callbacks:

1. `done`
2. `fail`


These can be added to the request simply chaining calls.
```js
Ajax({
  url: '/someResource'
}).done(function (res){

});
```


---

### Examples
A minimal example
```js
new Ajax({
  url: '/someResource',
}).done(function (res){
  // res is the request it's response
  // Which if it's JSON, will be parsed automaticly
}).fail(function (res){
  // res is an error description 
});
```