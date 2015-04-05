# Exercise 6 - Backtrack a bit, doesn't this presentation mention RESTful something or other?
## Let's create a RESTful endpoint that any app/webpage/3rd party could consume
### Why?
- This will show how simple it is to route in an Express app
- This kind of endeavor strengthens apps by (hopefully) decoupling and allowing easy modular improvements

### How?
- Setup our prefabricated user route to return a JSON response
- Attach middleware to give our request object a reference to SocketIO


### Process
We have an endpoint already setup. Check out **app.js** on line 25-26 and you should see
```
	app.use( '/', routes );
	app.use( '/users', users );
```
up at the top you should notice the imports
```
	var routes = require( './routes/index' );
	var users = require( './routes/users' );
```
and if we open up **routes/users.js** we can see our pre-built handler
```
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
```
This straightforward enough, now we want to change it to return a JSON object representing our user list.
We also want to change the response type so let's do that now. See [res.setHeader](https://nodejs.org/api/http.html#http_response_setheader_name_value).
```
	res.setHeader( 'Content-Type', 'application/json');
	res.statusCode = 200;
```

### But where's our info?
We need to get a reference to our SocketIO `io` object so we can send the same list we were
using previously which we built from `io.to( 'my room' ).connected`.

To get that reference we can utilize middleware in Node to stick it onto all our request objects.

Middleware in Node follows a strict order that is defined by when they are applied via the 'app.use' call.
SO we want to define ours **before** our `routes` and `users` got applied. But we also need a reference to `io`
which is defined in *bin/www* **not** in *app.js*.

We can (un)elegantly get that reference by moving the lines from *bin/www*
```
	var http = require( 'http' );
	var server = http.createServer( app );
	var io = require( 'socket.io' )( server );
```
somewhere into *app.js* **AFTER** `var app` is defined but **BEFORE** the routes are assigned.

### Middleware
Middleware in Node is done by calling `app.use` and passing it a function that typically accepts
three parameters; `req`, `res`, and `next`. When your function finishes your task be sure to invoke `next();`
to continue on through the remaining middleware.

Our middleware could be as simple as this:
```
	app.use( function( req, res, next ) {
		req.io = io;
		next();
	} );
```

### We need to fix something
To finish our reference-setup changes we need to update the module.exports at the bottom of *app.js* so that
we're exporting app, server, and io.
```
module.exports = {
	app   : app,
	server: server,
	io: io
};
```

Now we can go back to *bin/www* and change our declarations like so
```
	var app = require( '../app' ).app;
	var server = require( '../app' ).server;
	var io = require( '../app' ).io;
```

### Response
Now our req object in *users.js* (as well as the request objects in **ALL** route functions for that matter)
should come equipped with an `io` object attached. We can now build our userlist and write it back to the response.
```
	// Use same code we used in our Interval earlier to build ids
	res.send( {users: ids} );
	res.end();
```
