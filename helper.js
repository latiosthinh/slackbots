const dotenv = require( 'dotenv' );
dotenv.config();

const { GoogleSpreadsheet } = require( 'google-spreadsheet' );
const doc = new GoogleSpreadsheet( `${ process.env.SHEET_ID }` );
doc.useApiKey( `${ process.env.SHEET_API }` );

const axios = require( 'axios' );
const $     = require('cheerio');
const url   = `${ process.env.FETCH_URL }`;

const getCommonData = async ( sheetNumber ) => {
	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[ sheetNumber ]; // sheet joke

	await sheet.loadCells('A1:A26000');

	let data = [];
	for ( let i=0; i<sheet.cellStats.nonEmpty; i++ ) {
		data.push( sheet.getCell( i, 0 ).formattedValue )
	}

	return data;
}

const getMemberInfo = async () => {
	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[2]; // sheet member

	await sheet.loadCells( 'A2:J2' );

	let infos = [];
	for ( let i=0; i<10; i++ ) {
		infos.push( sheet.getCell( 1, i ).formattedValue )
	}

	return infos;
}

const getGoldPrice = async () => {
	let priceArr     = [];
	let titleArr     = [];
	let priceBuyArr  = [];
	let priceSellArr = [];

	await axios.get( url )
		.then( ( html ) => {
			$( 'td.ylo2_text', html.data ).each( ( i, el ) => {
				if ( i > 2 ) {
					titleArr.push( $(el).text() )
				}
			} )

			$( 'td.white_text span', html.data ).each( ( i, el ) => {
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

const getToday = () => {
	let d = new Date();

	const date  = d.getDate();
	const month = d.getMonth() + 1;

	return {
		'date': date,
		'month': month
	};
}

const closetDate = ( arr ) => {
	let closetEle = arr[0];

	for ( let i=1; i<arr.length; i++ ) {
		if ( parseInt( arr[i].dob.split( '/' )[1] ) < parseInt( closetEle.dob.split( '/' )[1] ) ) {
			closetEle = arr[i];
		}
	}

	return closetEle;
}

module.exports = {
	getCommonData,
	getMemberInfo,
	getGoldPrice,
	getToday,
	closetDate,
};