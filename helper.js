const reader  = require( 'g-sheets-api' );
const sheetID = '1zdbpRl59WqS_Gum7ndKTez7hXPGGoMM-dpbxXAA9YsA';

const rp  = require( 'request-promise' );
const $   = require('cheerio');
const url = 'http://sjc.com.vn/giavang/textContent.php';

const getJokes = () => {
	let jokes = [];

	const readerOptions = {
		sheetId         : '1zdbpRl59WqS_Gum7ndKTez7hXPGGoMM-dpbxXAA9YsA',
		sheetNumber     : 1,
		returnAllResults: true,
	};

	reader( readerOptions, ( res ) => {
		res.forEach( el => {
			for( let i in el ) {
				jokes.push( el[i] );
			}
		});
	} );

	return jokes;
}


const getMenu = () => {
	let menus = [];

	const readerOptions = {
		sheetId         : sheetID,
		sheetNumber     : 2,
		returnAllResults: true,
	};

	reader( readerOptions, ( res ) => {
		res.forEach( el => {
			for( let i in el ) {
				menus.push( el[i] );
			}
		});
	} );
	
	return menus;
}


var priceArr = [];
async function getGoldPrice() {
	let titleArr     = [];
	let priceBuyArr  = [];
	let priceSellArr = [];

	await rp( url )
		.then( ( html ) => {
			$( 'td.ylo2_text', html ).each( ( i, el ) => {
				if ( i > 2 ) {
					titleArr.push( $(el).text() )
				}
			} )

			$( 'td.white_text span', html ).each( ( i, el ) => {
				if ( i%2==0 ) {
					priceBuyArr.push( $(el).text() )
				}

				if ( i%2==1 ) {
					priceSellArr.push( $(el).text() )
				}
			} )

			for( let i=0; i<6; i++ ) {
				priceArr.push( `---${ titleArr[i] }--- \n Mua: ${ priceBuyArr[i] } | Bán: ${ priceSellArr[i] } \n\n` );
			}
		} )
		.catch( ( err ) => {
			console.log( err );
		} );
	
	return priceArr;
}

getGoldPrice();

module.exports = {
	getJokes,
	getMenu,
	priceArr,
};