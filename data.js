const MeoData = {
	indexTable: {
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
	},

	exchangeURL: 'http://data.fixer.io/api/latest?access_key=0b5799d1638139b86f5730be7a8e8b54&format=1',

	key_words_trigger: /meomeo/i,

	key_words_currency: /(vnd|usd|cny|jpy|krw|thb)/g,
	key_words_gold    : /(gold|vàng)/g,
	key_words_member  : /(sếp|việt|long|hương|linh|lộc|hải|thanh)/g,
	key_words_dinner  : /(dinner|ăn|tối nay)/g,
	key_words_joke    : /(joke|funny|cười|truyện)/g,
	key_words_help    : /(help)/g,
	key_words_hello   : /(bạn.tên.gì|em.tên.gì|tên gì)/g,
}

module.exports = {
	MeoData,
};