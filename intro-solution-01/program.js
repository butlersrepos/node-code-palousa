// Imports Node's built-in fs module, fs is for file system
var fs = require('fs');

// readFile takes ( filename and path, optional options, callback )
fs.readFile('myfile.txt', /* { encoding:  'UTF-8' }, */ function(err, data) {
	// This function is reached once Node has finished reading the entire file

	// Simple error handling
	if( err ) console.log( 'Error! ' + err );

	// Data is the entire contents of the file or null if an err occurred
	console.log( 'Data = ' + data );
	// If the file isn't a simple text file you may need to call data.toString() or pass readFile an encoding option
});