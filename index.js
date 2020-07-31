const SlackBot = require( 'slackbots' );
const dotenv   = require( 'dotenv' );

dotenv.config();

const { prepareData, handleMessage } = require( './actions' );

const simsimi = require( 'simsimi' )( {
	key: `${ process.env.SIMSIMI_KEY_1 }`,
    lc: 'vn',
    ft: '1.0'
} );

const bot = new SlackBot( {
	token: `${ process.env.BOT_TOKEN }`,
	name: 'meow'
} );

bot.on( 'start', () => {
	prepareData();
} );

bot.on( 'error', ( err ) => console.log( err ) );

bot.on( 'message', async ( data ) => {
	if ( 'message' !== data.type || 'meow' === data.username ) {
		return;
	}

	const message = data.text;
	const channel = data.channel;

	const key_words = /meomeo/i;
	if ( message.match( key_words ) ) {
		handleMessage( message, bot, channel );
	} else {
		simsimi( message ).then( res => {
			bot.postMessage( channel, res );
		}, e => console.error( 'simsimi error:', e ) );
	}
} )

