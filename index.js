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

	const message = data.text.toLowerCase();
	const channel = data.channel;

	if ( message.match( MeoData.keywords.hello ) ) {
		bot.postMessage( channel, 'dạ, em tên là MeoMeo ạ!' );
	}
	else if ( 
		message.match( MeoData.keywords.trigger )
		|| message.match( MeoData.keywords.birthday )
		|| message.match( MeoData.keywords.currency )
		|| message.match( MeoData.keywords.dinner )
		|| message.match( MeoData.keywords.gift )
		|| message.match( MeoData.keywords.gold )
		|| message.match( MeoData.keywords.help )		
		|| message.match( MeoData.keywords.joke )		
		|| message.match( MeoData.keywords.member )		
		) {
		handleMessage( bot, channel, message );
	}
	else {
		simsimi( message ).then( res => {
			bot.postMessage( channel, res );
		}, e => console.error( 'simsimi error:', e ) );
	}
} )

