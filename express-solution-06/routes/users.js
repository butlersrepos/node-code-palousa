var express = require( 'express' );
var router = express.Router();

/* GET users listing. */
router.get( '/', function( req, res, next ) {
	res.setHeader( "Content-Type", "application/json" );
	res.statusCode = 200;

	var ids = [];
	for( var id in req.io.to( 'my room' ).connected ) {
		if( req.io.to( 'my room' ).connected.hasOwnProperty( id ) ) {
			var thisSocket = req.io.to( 'my room' ).connected[id];
			var thisClient = thisSocket.client;
			if( thisClient.username ) {
				ids.push( thisClient.username );
			} else {
				ids.push( id );
			}
		}
	}

	res.send( { users: ids });
	res.end();
} );

module.exports = router;
