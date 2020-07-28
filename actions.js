const fetch            = require( 'node-fetch' );
const { getJokes, getMenu, priceArr } = require( './helper' );

const exchangeURL = 'http://data.fixer.io/api/latest?access_key=0b5799d1638139b86f5730be7a8e8b54&format=1';

let jokes = [],
	menus = [];

const sayHi = ( bot ) => {
	let helloMessage = 'Hi! I\'m MeoMeo! How are you doing? \n';
		helloMessage += 'I can "help" you out in no time. \n';
		helloMessage += 'mention @meomeo with "joke" | "dinner" | "gold" | "vnd" to play around. \n';
		helloMessage += 'MEOW!!';

	bot.postMessageToChannel( 'general', helloMessage );

	jokes = getJokes();
	menus = getMenu();
}

/**
 * 
 * `Spacing` before message to prevent: 
 * - `helper message` fire event
 * - event hell loop 
 */
const handleMessage = ( message, bot ) => {
	const keywords = [ ' help', ' joke', ' dinner', ' vnd', ' gold' ];

	keywords.forEach( el => {
		if ( message.includes( el ) ) {
			MEO[ el.replace(/\s/g, '') ]( bot );
		}
	} );
}

var MEO = {};

MEO.help = ( bot ) => {
	const options = 'mention @meomeo with "joke" | "dinner" | "gold" | "vnd" to "cuddle" with him';

	bot.postMessageToChannel( 'general', options );
}

MEO.joke = ( bot ) => {
	let randomJoke = jokes[ Math.floor( Math.random() * jokes.length ) ];

	bot.postMessageToChannel( 'general', randomJoke );
}

MEO.dinner = ( bot ) => {
	let randomMenu = menus[ Math.floor( Math.random() * menus.length ) ];

	bot.postMessageToChannel( 'general', randomMenu );
}

MEO.vnd = ( bot ) => {
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

			const message = `1 EUR = ${ vndRate } VND \n 1 USD = ${ usdvnd } VND \n 1 CNY = ${ cnyvnd } VND \n 1 JPY = ${ jpyvnd } VND \n 1 KRW = ${ krwvnd } VND \n 1 THB = ${ thbvnd } VND`

			bot.postMessageToChannel( 'general', message );
		} )
}

MEO.gold = ( bot ) => {
	let message = 'Giá vàng hiện tại: \n';
	priceArr.forEach( el => {
		message += `\n${ el }`
	} );

	bot.postMessageToChannel( 'general', message );
}

module.exports = {
	sayHi,
	handleMessage,
};