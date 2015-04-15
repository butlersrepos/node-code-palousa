## Let's Make an HTTP Server

### Create a simple http server with just Node
We're going to create a server instance, turn it on, and see that it gets a request

- Node has a built-in module http-[Documentation Here](https://nodejs.org/api/http.html#http_http_createserver_requestlistener) that we can create a server object from

```
var http = require('http');
```

- The callback of the `createServer` method on `http` is a handler for all requests, it will have the Request as the first arg and a Response as the second arg

```
http.createServer( function(req, res) {} );
```

- After creating the server object simply call `serverObject.listen(8080)` to run the server on the given port
- If you just place a `console.log` in your callback you should see that in your output if you hit [localhost:8080](localhost:8080)

### Return something!
- Add a response to our request handler
- A simple way is to use the `.end()` method of the response object and pass it a string

```
    res.end("Hello World");
```

### Try it out
Our callback is the end-all be-all of our request handling at the moment, you could easily imagine a primitive router via `switch` statement placed in there.
If you want to serve a file you could try such an operation by `readFile`ing like we did in the previous exercise but when you get to your callback `write` the contents to the response. 
