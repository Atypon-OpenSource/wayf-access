var log4js = require('log4js'),
    fs = require('fs'),
    config = require ('../config');

// from the director of the present module, go up one level and then look at the config file
var LOG_DIR = __dirname + '/../'+ config.logger.directory;

if (!fs.existsSync(LOG_DIR)) {
	fs.mkdirSync(LOG_DIR)
}

log4js.configure ({
	appenders: {
		console: {
			type: 'stdout'
		},
		file: {
			type: 'file',
			filename: LOG_DIR + 'server.log'
		},
		rolling: {
			type: 'dateFile',
			filename: LOG_DIR + 'server-rotated.log',
			pattern: '-yyy-MM-dd',
			alwaysIncludePattern: true
		}
	},
	categories: {
		default: {
			appenders: [
			  'console',
			  'file',
			  'rolling'
			],
			level: 'debug'
		}
	}
});

module.exports = log4js.getLogger();
