var log4js = require('../index');

var config = {
    appenders: [
        {
            type: 'console'
        }
    ],
    levels: {
        'one': 'TRACE',
        'one.two': 'DEBUG',
        'one.two.three': 'INFO',
        'one.two.three.four': 'ERROR',
        'one.two.three.four.five': 'FATAL',
    }
};

log4js.configure(config);

console.log('=== one' + ', log level = ' + config.levels['one']);

var oneLogger = log4js.getLogger('one');
oneLogger.trace('trace');
oneLogger.debug('debug');
oneLogger.info('info');
oneLogger.error('error');
oneLogger.fatal('fatal');

console.log('=== two' + ', log level = ' + config.levels['one.two']);

var twoLogger = oneLogger.getLogger('two');
twoLogger.trace('trace');
twoLogger.debug('debug');
twoLogger.info('info');
twoLogger.fatal('fatal');

console.log('=== three' + ', log level = ' + config.levels['one.two.three']);

var threeLogger = twoLogger.getLogger('three');
threeLogger.trace('trace');
threeLogger.debug('debug');
threeLogger.info('info');
threeLogger.fatal('fatal');

console.log('=== four' + ', log level = ' + config.levels['one.two.three.four']);

var fourLogger = threeLogger.getLogger('four');
fourLogger.trace('trace');
fourLogger.debug('debug');
fourLogger.info('info');
fourLogger.error('error');
fourLogger.fatal('fatal');

console.log('=== five' + ', log level = ' + config.levels['one.two.three.four.five']);

var fiveLogger = fourLogger.getLogger('five');
fiveLogger.trace('trace');
fiveLogger.debug('debug');
fiveLogger.info('info');
fiveLogger.error('error');
fiveLogger.fatal('fatal');

