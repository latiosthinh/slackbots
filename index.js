const SlackBot = require( 'slackbots' );
const dotenv   = require( 'dotenv' );

const { sayHi, handleMessage } = require( './actions' );

dotenv.config();

const BOT_TOKEN = `${ process.env.BOT_TOKEN }`;

const bot = new SlackBot( {
	token: BOT_TOKEN,
	name: 'meomeo'
} );

bot.on( 'start', () => {
	sayHi( bot );
});

bot.on( 'error', ( err ) => console.log( err ) );

bot.on( 'message', ( data ) => {
	if ( 'message' !== data.type ) {
		return;
	}

	handleMessage( data.text, bot );
} )