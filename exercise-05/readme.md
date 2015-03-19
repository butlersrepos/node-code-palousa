# Exercise 5 - But really, WHO are they?
### Let's keep track of user-provided names!
- The goal here is to tie the name to the socket and retrieve it later, as needed
- This will demonstrate how to tie any data to sockets, useful for any number of things

### Let's send the user's name
- Add an input and a button to our frontend
- Add a new event emit ('login') on the frontend that sends the text entered in the input

```
function loginButton() {
	socket.emit( 'login', {name: $('#name').val()} );
}
```

```
<input id="name"/>
<button id="login-button" onclick="javascript:loginButton()">LOGIN</button>
```

### Let's receive the user's name
- Add another socket event handler and save the name we receive onto the Client object
- Alter our room-list emitter to check for that field first and fallback to sending the Client ids instead

```
setInterval( function() {
	// Gather ids
	var ids = [];
	for( var id in io.to( 'my room' ).connected ) {
		if( io.to( 'my room' ).connected.hasOwnProperty( id ) ) {
			var thisSocket = io.to( 'my room' ).connected[id];
			var thisClient = thisSocket.client;
			if( thisClient.username ) {
				ids.push(thisClient.username);
			} else {
				ids.push( id );
			}
		}
	}
	io.to( 'my room' ).emit( 'people', {room: ids} );
}, 2000 );
```

```
socket.on( 'login', function(data) {
	console.log("Received login with name = " + data.name);
	socket.client.username = data.name;
});
```

### Try it out
- Do the same check as we did last exercise except that once you see both ids appearing in the console, fill a name into one window's input box and click its LOGIN button
- You should see the console output change to reflect the name we entered instead of the socket id