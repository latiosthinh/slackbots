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

	memberData: [
		{ name: 'sếp', sex: 'male', dob: '11/11', desc: 'đẹp trai' },
		{ name: 'long', sex: 'male', dob: '4/1', desc: 'cute' },
		{ name: 'asd', sex: 'male', dob: '1/9', desc: 'cute' },
		{ name: 'thanh', sex: 'female', dob:'12/8', desc: 'xinh đẹp' },

	],

	exchangeURL: 'http://data.fixer.io/api/latest?access_key=0b5799d1638139b86f5730be7a8e8b54&format=1',

	key_words_trigger: /meomeo/i,

	key_words_currency: /(vnd|usd|cny|jpy|krw|thb)/g,
	key_words_gold    : /(gold|vàng)/g,
	key_words_member  : /(sếp|việt|long|hương|linh|lộc|hải|thanh)/g,
	key_words_dinner  : /(dinner|ăn|tối nay)/g,
	key_words_joke    : /(joke|funny|cười|truyện)/g,
	key_words_help    : /(help|giúp)/g,
	key_words_hello   : /(bạn.tên|em.tên|mày.tên)/g,
	key_words_birthday: /(sinh.nhật.gần|sinh.nhật.sắp|sắp.tới.sinh.nhật)/g
}

module.exports = {
	MeoData,
};