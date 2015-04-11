# Exercise 3 - Your First User Triggered Socket
### Let's give the user a button!


- Open up our frontend file: *index.ejs* and add a button to your page. Attach an event to that button that runs `socket.emit( 'button event', {buttons: 'rule'} );`
- Open up our backend counterpart: *bin/www* and towards the bottom, immediately after our socket event that handled the "my other event" emit, add 

```
socket.on( 'button event', function( data ) {
	console.log( "Apparently buttons=" + data.buttons );
} );
```

- Now with both your server terminal and your webpage open your should be able to see the events hitting your server. But let's have them bounce back at a delay to see the broadcasting side.
- First let's add the return message from the server by adding a timeout call in the "button event". This is an example of a single-socket response.

```
socket.on( 'button event', function( data ) {
		console.log( "Apparently buttons=" + data.buttons );
		setTimeout( function() {
			socket.emit( 'broadcast', { msg: 'my message here!' } );
		}, 2000 );
	} );
```

- Now I'm going to add JQuery for easier future DOM manipulating
- Second we need to log that out on the frontend to verify that it happened. Let's make it appear in the DOM. Add a div with an id attribute somewhere in your DOM. Then add a socket event to catch your "holla back" event and put its contents into that div. Something like this should work

```
socket.on( 'broadcast', function( data ) {
	$( "#display" ).append( $( '<p>' ).html( data.msg ) );
} );
```

### Lastly let's see something more powerful, the broadcast in Socket. Let's change our single-socket response to announce a message to EVERYONE
- First we'll change our server-side event. We need to emit to all sockets, one implementation SocketIO has is to use `io.sockets.emit(eventName, data)` or `io.emit(eventName, data)`
- Let's change our "button event" handler in *bin/www* to broadcast instead of simply responding:

```
socket.on( 'button event', function( data ) {
		console.log( "Apparently buttons=" + data.buttons );
		var d = new Date();
		setTimeout( function() {
			io.emit( 'broadcast', { msg: 'Someone press the button at: ' + d } );
		}, 2000 );
	} );
```

- Now restart your server and open two browser windows to your localhost. If you click on the button in one window you will see that the message gets sent to both. 