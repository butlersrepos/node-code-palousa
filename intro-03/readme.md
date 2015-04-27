## Poor Man's Middleware

### Create the simple http server example
Use Intro-02's solution or the one you wrote and we'll start off with that code

### Let's make a primitive router
We were just responding with 'Hello World!' before but let's do more.
First let's use the trusty ole `switch` statement to route three different responses.
In order to get the url out of our request we'll use another Node utility [URL](https://nodejs.org/api/http.html#http_message_url)

```
var url = require('url');
...
var urlPieces = url.parse(req.url);
switch( urlPieces.pathname ) {
```

- Let's make our first `case` catch the '/hello' pathname and do what we were doing, saying 'Hello World'
- We'll make another route (`case`) for '/file'
- To serve a file you could try `readFile`ing like we did in the previous exercise, I'll be using `readFileSync` which takes no callback and returns the contents of the file directly.
- NOTE: if you create a .txt file in the same directory then the easiest way to pass it to `readFileSync` is by `__dirname + 'myFile.txt'`
- Our last route will be a `default` that just notifies the client that there's nothing here
- I've written these all as `res.write()` operations and then tacked a `res.end()` after the switch

### Try it out
The goal is to create a server that has two distinct endpoints;

- `/hello` which responds with 'Hello World'
- `/file` which responds with whatever text you put in your file

...and has a fallback endpoint that responds the same to all other incoming requests.

### Refactor -> Design Pattern
If you were to tidy this code up and keep building on to it you may end up with a paradigm very much like what the more advanced frameworks do for you.
Methods prior to our `switch` could manipulate the `req` object and decorate it with convenience methods and data for use down the pipeline.
The code that handles each `case` could be refactored out to other files for simplicity.
The switch itself could be abstracted!


The Express exercises explore the Express framework which does exactly these things for us while giving us convenient ways to configure them all. If you're done here you should begin with express-exercise-01. Congratulations!