# Exercise 1 - Node Basics
- This exercise is like a lite version of some of the good workshoppers found on nodeschool.io
- In a nutshell Node, sometimes referred to as io.js nowadays, is javascript + file i/o.
- Node comes with a plethora of built-in modules to use see - [https://nodejs.org/api/]()

## Prep
- Have Node installed, I used v0.10.x


## Let's write a simple Node program
This will show you the most basic Node invocation.

- Create your **program.js** to contain your Node code
- To run your program just try `node program.js` from the directory command-line, but add a line like `console.log('testing');` in your program to see it run

## Let's have Node read a file
We'll need to import the Node file system module, read a file in, and do something with that data

- Create a file to read: maybe **myfile.txt** in this directory
- Node's file system module is just called `fs` so to import it you add a line like `var fs = require('fs');` to the top of your program
- When `require` statements don't have any directory notation (`./`, `../`) then Node looks to its embedded modules or the node_modules/ directory in this case `fs` is a embedded Node piece
- The api to `fs` can be found [here](https://nodejs.org/api/fs.html)
- The function we want is [readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback)

### Callbacks
Those familiar with frontend javascript may be familiar with the callback paradigm. For those that are not - Node, and
javascript in general, is an async-friendly coding ecosystem and so callbacks are utilized abundantly to react to asyncly
fired events. So for our `fs.readFile` call we will pass a function as the last argument to proceed once the readFile finishes.

- The callback function you define should expect two arguments; `err` and `data` are the typical names
- `err` will be `null` if everything went alright
- `data` will contain the contents of our file
- As the documentation describes - `If no encoding is specified, then the raw buffer is returned.`
- If you see a Buffer output instead of readable text simply pass `{ encoding: 'UTF-8' }` as the second argument to your `fs.readFile` call

Example program.js;.

```
var fs = require('fs');

fs.readFile('myfile.txt', function(err, data) {
	if( err ) console.log( 'Error! ' + err );
	console.log( 'Data = ' + data );
});
```


#### Check the intro-solution-01 directory and run `node program.js` to see mine with comments