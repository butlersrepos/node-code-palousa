# Exercise 2 - Your First Socket
### We'll create the example socket that fires and responds from client to server.

- Run: `npm install socket.io@1.3.3 --save-dev` to get the socket library. *The --save-dev argument adds the entry to your package.json so that other devs can automatically get the appropriate libraries through an* `npm install` *later.*
- Add the `io` declaration to your **www** file: 
```
var server = http.createServer( app );
var io = require( 'socket.io' )( server );
```

And somewhere after that add the connection event logic:

```
io.on( 'connection', function( socket ) {
	socket.emit( 'news', { hello: 'world' } );
	socket.on( 'my other event', function( data ) {
		console.log( data );
	} );
} );
```

This is what fires when the server receives a **connection** event from a client. The callback here emits a **news** event with a data object back to the client and then creates a handler on this particular **socket** (*which is tied to this particular client/person/connection*) that responds to an event we're calling **'my other event'**. 

- Add the client side of [socket.io](http://socket.io) by throwing this block into the `<head>` of your view, **index.ejs**.
```
<script src="https://cdn.socket.io/socket.io-1.3.3.js"></script>
<script>
        var socket = io.connect( 'http://localhost:3000' );
        socket.on( 'news', function( data ) {
            console.log( data );
            socket.emit( 'my other event', { my: 'data' } );
        } );
</script>
```

Now if you fire up your server and connect to [localhost:3000](http://localhost:3000) with the dev console open you should see the server reply to the client with
```
 Object {hello: "world"}
```

and you should see in the terminal/console of your Node app
```
{ my: 'data' }
```
