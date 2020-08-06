const MeoData = {
	indexTable: {
		'sếp': 0,
		'tuấn anh': 0,
		'sep': 0,
		'việt': 1,
		'viêt': 1,
		'long': 2,
		'long darkside': 2,
		'lê hương': 3,
		'hương nghìn': 3,
		'diệu linh': 4,
		'linh lớn': 4,
		'hải': 5,
		'lộc': 6,
		'phạm hương': 7,
		'hương bé': 7,
		'thanh': 8,
		'khánh linh': 9,
		'linh bố láo': 9
	},

	memberData: [
		{ name: 'sếp', dob: '11/11', desc: 'đẹp trai' },
		{ name: 'việt', dob: '17/12', desc: 'đẹp trai' },
		{ name: 'long', dob: '4/1', desc: 'cute' },
		{ name: 'lê hương', dob: '14/3', desc: 'xinh đẹp' },
		{ name: 'chị Linh', dob: '16/4', desc: 'xinh đẹp' },
		{ name: 'hải', dob:'15/10', desc: 'đepj trai' },
		{ name: 'lộc', dob:'18/1', desc: 'xinh đẹp' },
		{ name: 'thanh', dob:'12/8', desc: 'xinh đẹp' },
		{ name: 'phạm hương', dob:'4/10', desc: 'xinh đẹp' },
		{ name: 'khánh linh', dob:'25/12', desc: 'xinh đẹp' },

	],

	exchangeURL: 'http://data.fixer.io/api/latest?access_key=0b5799d1638139b86f5730be7a8e8b54&format=1',

	keywords: {
		trigger : /meomeo/i,
		author  : /(ai tạo ra em|tác giả)/g,
		currency: /(vnd|usd|cny|jpy|krw|thb)/g,
		gold    : /(gold|vàng)/g,
		member  : /(sếp|việt|long|hương|linh|lộc|hải|thanh)/g,
		qmember : /(nào|là ai|á|ko|không)/g,
		dinner  : /(dinner|ăn|món)/g,
		joke    : /(joke|funny|cười|vui)/g,
		help    : /(help|giúp)/g,
		hello   : /(bạn tên|em tên|mày tên|bạn là ai|mày là ai)/g,
		birthday: /(sinh nhật gần|sinh nhật sắp|sắp tới sinh nhật|là sinh nhật)/g,
		gift    : /(tặng|quà)/g
	},
}

module.exports = {
	MeoData,
};