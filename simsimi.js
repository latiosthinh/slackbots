const https = require( 'https' );

const post = ( url, headers, body ) => new Promise( ( resolve, reject ) => {
	const request = https.request( url, {
		method: 'POST',
		headers
	}, resolve );

	request.on( 'error', reject );

	if ( body ) {
		if ( typeof body !== 'string' ) {
			body = JSON.stringify( body );
		}

		request.write( body );
	}

	request.end();
});

const readStream = stream => new Promise( ( resolve, reject ) => {
	let buffer = '';

	stream
		.on( 'error', reject )
		.on( 'data', chunk => buffer += chunk )
		.on( 'end', () => resolve( buffer ) );
} );

const checkResponse = response => {
	if ( 200 === response.status ) {
		return response;
	} else {
		console.log( response );
	}
};
/**
 * simsimi
 * https://workshop.simsimi.com/document?lc=en
 */
module.exports = options => {
	const {
		key,
		lang,
		api
	} = options;

	return ( query, cb ) => {
		query = { utext: query, lang };

		const headers = {
			'x-api-key': key,
			'Content-Type': 'application/json',
		};

		return Promise
			.resolve()
			.then( () => post( api, headers, query ) )
			.then( readStream )
			.then( JSON.parse )
			.then( checkResponse )
			.then( res => ( cb && cb( null, res.atext, res ), res.atext) )
			.catch( err => {
				if ( cb ) {
					cb( err )
				} else {
					console.log( err );
				}
			} )
	};
};