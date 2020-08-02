const fetch = require( 'node-fetch' );
const { MeoData } = require( './data' );
const { getCommonData, getMemberInfo, getGoldPrice, getToday, closetDate } = require( './helper' );

const dotenv   = require( 'dotenv' );
dotenv.config();

const handleMessage = ( message, bot, channel ) => {
	Object.values( MEO )
		.filter( val => typeof val === 'function' )
		.forEach( val => val( bot, channel, message ) );
}

class MEO {
	static getHelp = ( bot, channel, message ) => {
		if ( ! message.match( MeoData.key_words_help ) || 'meomeo' === message ) {
			return;
		}

		bot.postMessage( channel, 'dạ meomeo đây ạ!' );
	}

	static makeJoke = ( bot, channel, message ) => {
		if ( ! message.match( MeoData.key_words_joke ) ) {
			return;
		}

		getCommonData( 0 ).then( res => {
			let randomJoke = res[ Math.floor( Math.random() * res.length ) ];
			bot.postMessage( channel, randomJoke );
		} );
	}

	static prepareDinner = ( bot, channel, message ) => {
		if ( ! message.match( MeoData.key_words_dinner ) ) {
			return;
		}

		getCommonData( 1 ).then( res => {
			let randomFood = res[ Math.floor( Math.random() * res.length ) ];
			bot.postMessage( channel, randomFood );
		} );
	}

	static tellMemberInfo = ( bot, channel, message ) => {
		if ( ! message.match( MeoData.key_words_member ) ) {
			return;
		}

		for ( let key in MeoData.indexTable ) {
			if ( message.includes( key ) ) {
				getMemberInfo().then( res => {
					bot.postMessage( channel, res[ MeoData.indexTable[key] ] );
				} );
			}
		}
	}

	static alertBirthDay = ( bot, channel, message ) => {
		if ( ! message.match( MeoData.key_words_birthday ) ) {
			return;
		}

		const today = getToday();
		let birthday = [];

		MeoData.memberData.forEach( el => {
			if ( parseInt( el.dob.split( '/' )[1] ) > today.month
				|| ( parseInt( el.dob.split( '/' )[1] ) == today.month && parseInt( el.dob.split( '/' )[0] ) >= today.date ) ) {
				birthday.push( el );
			}
		} );

		console.log( closetDate( birthday ) );
	}

	static convertToVnd = ( bot, channel, message ) => {
		if ( ! message.match( MeoData.key_words_currency ) ) {
			return;
		}

		fetch( MeoData.exchangeURL )
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
		if ( ! message.match( MeoData.key_words_gold ) ) {
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