const SlackBot = require( 'slackbots' );
const dotenv   = require( 'dotenv' );
dotenv.config();

const { MeoData } = require( './data' );

const { handleMessage } = require( './actions' );

const simsimi = require( 'simsimi' )( {
	key: `${ process.env.SIMSIMI_KEY_1 }`,
    lc: 'vn',
    ft: '1.0'
} );

const bot = new SlackBot( {
	token: `${ process.env.BOT_TOKEN }`,
	name: 'meow'
} );

bot.on( 'error', ( err ) => console.log( err ) );

bot.on( 'message', async ( data ) => {
	if ( 'message' !== data.type || 'meow' === data.username ) {
		return;
	}

	const message = data.text;
	const channel = data.channel;

	if ( message.match( MeoData.key_words_trigger ) ) {
		handleMessage( message, bot, channel );
	}
	else if ( message.match( MeoData.key_words_hello ) ) {
		bot.postMessage( channel, 'dạ, em tên là MeoMeo ạ!' );
	}
	else {
		simsimi( message ).then( res => {
			bot.postMessage( channel, res );
		}, e => console.error( 'simsimi error:', e ) );
	}
} )

