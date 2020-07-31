const fetch            = require( 'node-fetch' );
const { getJokes, getMenu, priceArr } = require( './helper' );

const exchangeURL = 'http://data.fixer.io/api/latest?access_key=0b5799d1638139b86f5730be7a8e8b54&format=1';

let jokes = [],
	menus = [];

const dotenv   = require( 'dotenv' );
dotenv.config();

const prepareData = () => {
	jokes = getJokes();
	menus = getMenu();
}

const handleMessage = ( message, bot, channel ) => {
	const keyword = 'meomeo';

	if ( ! message.includes( keyword ) ) {
		return;
	}

	Object.values( MEO )
		.filter( val => typeof val === 'function' )
		.forEach( val => val( bot, channel, message ) );

	// MEO.joke( bot, channel );
	// MEO.gold( bot, channel );
	// MEO.vnd( bot, channel );
	// MEO.dinner( bot, channel );

	// MEO.help( bot, channel );
}

const MEO = {
	getHelp: ( bot, channel, message ) => {
		const key_words = /(help)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		const options = 'type meomeo with "joke" | "dinner" | "gold" | "vnd" to "cuddle" with him';

		bot.postMessage( channel, options );
	},
	makeJoke: ( bot, channel, message ) => {
		const key_words = /(joke|funny|cười|truyện)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		let randomJoke = jokes[ Math.floor( Math.random() * jokes.length ) ];

		bot.postMessage( channel, randomJoke );
	},
	prepareDinner: ( bot, channel, message ) => {
		const key_words = /(dinner|ăn|tối nay)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		let randomMenu = menus[ Math.floor( Math.random() * menus.length ) ];

		bot.postMessage( channel, randomMenu );
	},
	convertToVnd: ( bot, channel, message ) => {
		const key_words = /(vnd|usd|cny|jpy|krw|thb)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		fetch( exchangeURL )
			.then( res => res.json() )
			.then( data => {
				const usdRate = data.rates.USD;
				const cnyRate = data.rates.CNY;
				const jpyRate = data.rates.JPY;
				const krwRate = data.rates.KRW;
				const thbRate = data.rates.THB;

				const vndRate = data.rates.VND;

				const usdvnd  = Math.round( ( vndRate/usdRate + Number.EPSILON ) * 1000 ) / 1000;
				const cnyvnd  = Math.round( ( vndRate/cnyRate + Number.EPSILON ) * 1000 ) / 1000;
				const jpyvnd  = Math.round( ( vndRate/jpyRate + Number.EPSILON ) * 1000 ) / 1000;
				const krwvnd  = Math.round( ( vndRate/krwRate + Number.EPSILON ) * 1000 ) / 1000;
				const thbvnd  = Math.round( ( vndRate/thbRate + Number.EPSILON ) * 1000 ) / 1000;

				const message_content = `1 EUR = ${ vndRate } VND \n 1 USD = ${ usdvnd } VND \n 1 CNY = ${ cnyvnd } VND \n 1 JPY = ${ jpyvnd } VND \n 1 KRW = ${ krwvnd } VND \n 1 THB = ${ thbvnd } VND`

				bot.postMessage( channel, message_content );
			} )
	},
	showGoldRate: ( bot, channel, message ) => {
		const key_words = /(gold|vàng)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		let message_content = 'Giá vàng hiện tại: \n';
		priceArr.forEach( el => {
			message_content += `\n${ el }`
		} );

		bot.postMessage( channel, message_content );
	},
	getMemberInfo: ( bot, channel, message ) => {
		
	}
};

module.exports = {
	prepareData,
	handleMessage,
};