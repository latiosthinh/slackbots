const fetch = require( 'node-fetch' );
const { getCommonData, getMemberInfo, getGoldPrice } = require( './helper' );

const exchangeURL = 'http://data.fixer.io/api/latest?access_key=0b5799d1638139b86f5730be7a8e8b54&format=1';

const dotenv   = require( 'dotenv' );
dotenv.config();

const handleMessage = ( message, bot, channel ) => {
	const keyword = 'meomeo';

	if ( ! message.includes( keyword ) ) {
		return;
	}

	Object.values( MEO )
		.filter( val => typeof val === 'function' )
		.forEach( val => val( bot, channel, message ) );
}

class MEO {
	static getHelp = ( bot, channel, message ) => {
		const key_words = /(help)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		const options = 'type meomeo with "joke" | "dinner" | "gold" | "vnd" to "cuddle" with him';

		bot.postMessage( channel, options );
	}

	static makeJoke = ( bot, channel, message ) => {
		const key_words = /(joke|funny|cười|truyện)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		getCommonData( 0 ).then( res => {
			let randomJoke = res[ Math.floor( Math.random() * res.length ) ];
			bot.postMessage( channel, randomJoke );
		} );
	}

	static prepareDinner = ( bot, channel, message ) => {
		const key_words = /(dinner|ăn|tối nay)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		getCommonData( 1 ).then( res => {
			let randomFood = res[ Math.floor( Math.random() * res.length ) ];
			bot.postMessage( channel, randomFood );
		} );
	}

	static tellMemberInfo = ( bot, channel, message ) => {
		const key_words = /(sếp|việt|long|hương|linh|lộc|hải|thanh)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		const indexTable = {
			'sếp': 0,
			'việt': 1,
			'long': 2,
			'hương lớn': 3,
			'linh lớn': 4,
			'hải': 5,
			'lộc': 6,
			'hương bé': 7,
			'thanh': 8,
			'linh bé': 9
		};

		for ( let key in indexTable ) {
			if ( message.includes( key ) ) {
				getMemberInfo().then( res => {
					bot.postMessage( channel, res[ indexTable[key] ] );
				} );
			}
		}
	}

	static convertToVnd = ( bot, channel, message ) => {
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
	}

	static showGoldRate = ( bot, channel, message ) => {
		const key_words = /(gold|vàng)/g;
		if ( ! message.match( key_words ) ) {
			return;
		}

		let message_content = 'Giá vàng hiện tại: \n';
		getGoldPrice().then( res => {
			res.forEach( el => {
				message_content += `\n${ el }`
			} );

			bot.postMessage( channel, message_content );
		} )
	}
};

module.exports = {
	handleMessage,
};