ajax
====

Basic AJAX library that kind of simulates the way jQuery does AJAX requests.

---

### Why another AJAX library?
We do not want to require useless code we don't use (like jQuery). This library is also a little bit more basic in terms of possibilities. It just does what it's supposed to do, and does it lightweight.


### Description
###### Initialize a new AJAX request


### API

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