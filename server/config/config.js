var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://admin:bala1000@ds056998.mlab.com:56998/bookingservice',
		rootPath: rootPath,
		port: process.env.port || 3030
	},

	production:{
		db: 'mongodb://admin:bala1000@ds056998.mlab.com:56998/bookingservice',
		rootPath: rootPath,
		port: process.env.port || 80
	}
}