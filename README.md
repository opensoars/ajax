ajax
====

Basic AJAX library that kind of simulates the way jQuery does AJAX requests.

[![Inline docs](http://inch-ci.org/github/opensoars/ajax.svg?branch=master)](http://inch-ci.org/github/opensoars/ajax)
[![Build Status](https://img.shields.io/travis/opensoars/ajax.svg?style=flat)](https://travis-ci.org/opensoars/ajax)

---

### Why another AJAX library?
We do not want to require useless code we don't use (like jQuery). This library is also a little bit more basic in terms of possibilities. It just does what it's supposed to do, and does it lightweight.

---


### API

#### Initialize a new AJAX request
```js
var options = {};

new Ajax(options);
```

#### Options
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

#### Callback functions
We use two types of callbacks:

1. `done` - Gets called when a request is completed succesfuly.
2. `fail` - Gets called when a request fails for whatever reason.

These can be added to the request simply by chaining calls after the Ajax initialization.
```js
new Ajax({
  url: '/someResource'
}).done(function (res){
  // The response from the request is now usable as a parameter
  // When it's a JSON response, it's automatily parsed
}).fail(function (res){
  // Note we still use the parameter res
  // Since it's still a response!
});
```

Both callback functions take 1 parameter.

1. `done` - The request response, either a string or an object.
2. `fail` - Object describing why the request failed.


The fail `res` looks like this:
```js
{
  desc: 'Description of why the request failed',
  status: 'The HTTP status code, this is 0 when the request timed out.'
}
```


---


### Examples
A minimal example
```js
new Ajax({
  url: '/someResource',
}).done(function (res){
  writeSucces(res);
}).fail(function (res){
  writeFail(res);
});
```