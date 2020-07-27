const SlackBot = require( 'slackbots' );
const axios = require( 'axios' );
const dotenv = require( 'dotenv' );

dotenv.config();

const BOT_TOKEN = `${ process.env.BOT_TOKEN }`;

const bot = new SlackBot( {
	token: BOT_TOKEN,
	name: 'meomeo'
} );

bot.on( 'start', () => {
	const params = {
		icon_emoji: ':cat:'
	};

	const helperMessage = '@mention meomeo with "joke" | "dinner" | "gold" | "usd" to "cuddle" him';
	
	bot.postMessageToChannel( 'general', helperMessage, params );
});

bot.on( 'error', ( err ) => console.log( err ) );

bot.on( 'message', ( data ) => {
	if ( 'message' !== data.type ) {
		return;
	}

	handleMessage( data.text );
} )

/**
 * 
 * `Spacing` before message to prevent: 
 * - `helper message` fire event
 * - event hell loop 
 */
function handleMessage( message ) {
	if ( message.includes( ' joke' ) ) {
		tellJoke();
	}
}

function tellJoke() {
	axios.get( 'http://api.icndb.com/jokes/random' )
		.then( res => {
			const joke = res.data.value.joke;

			const params = {
				icon_emoji: ':cat:'
			};
			
			bot.postMessageToChannel( 'general', `joke: ${ joke }`, params );
		} )
}