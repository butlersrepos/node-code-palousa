# Exercise 4 - Who Are All These People?
### Let's show a list of users!
- The goals here are to keep track of users as they enter and leave the page as well as to keep an up-to-date list displayed for all those present

### Keeping tabs on people
- Events we'll care about; entering the page, leaving the page.
- What to do in those cases; 
	1. If they enter the page we keep track of them.
	2. If they leave the page we stop keeping track.
	
- How should we keep track of users? One way might be a simple array of names or even an array of **sockets** from Socket.IO. However there is something in Socket that we haven't used yet that fits this common scenario perfectly, **rooms**.
- In Socket.IO you may have **socket** objects join **rooms** with a simple call such as `socket.join('my room');`.
- **Rooms** may be broadcast to directly and thus make organizing groups much simpler.
- Let's write logic to add each user to a room whenever they connect, this will do in our event that already exists in **bin/www**.
 ```
 io.on( 'connection', function( socket ) {
 	socket.join('my room');
 ```
- Next let's write a bit to make sure we cleanup when someone leaves... but wait! Socket.IO [already does that for us](http://socket.io/docs/rooms-and-namespaces/#disconnection) so we can move on.

### Keeping people in the know
- What we're doing; Giving each client a list of current users
- What to do;
	1. Decide how often to inform clients. By the second? Only when changes occur?
	2. Emit the info to the relevant users and render it.

- For this example I'm just going to implement a 2 second timer that fires out the update using a simple `setInterval` trigger.
- This logic can be added somewhere in **bin/www**
```
setInterval( function() {
	io.to( 'my room' ).emit( 'people', {room: /* some data */} );
}, 2000 );
```

### But what are we going to send?
- Socket.IO gives us access to those sockets added to specific rooms. When you use `io.to('my room')` that call returns a [Namespace in Socket.IO](http://socket.io/docs/server-api/#namespace). Namespaces come with some properties including `connected` which contains a hashmap of all the ids in that namespace/room.
- We'll iterate over that lists keys and construct our list of present ids, I'm going to do this into an array and pass that as my data like so;
```
// Gather ids
var ids = [];
for( var id in io.to( 'my room' ).connected ) {
	if( io.to( 'my room' ).connected.hasOwnProperty( id ) ) {
		ids.push( id );
	}
}
```

### Now the frontend!
- For just checking that our code works as we expect - let's output our user list to the console with a quick event in **index.ejs** like this;
```
socket.on( 'people', function( data ) {
	console.log(data.room);
} );
```

- To test, start your server, open two browser windows. Goto [localhost:3000](localhost:3000) in the first window, open the console and notice the array with your socket id outputting.
- Not goto your second browser window and goto [localhost:3000](localhost:3000) and watch the console in the first window up date it's console statements to reflect the new socket id as well!
 