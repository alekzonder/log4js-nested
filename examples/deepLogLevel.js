var log4js = require('../index');

log4js.configure({
    appenders: [{
        type: 'console'
    }, ],
    levels: {
        'one': 'TRACE',
        'one.two': 'DEBUG',
        'one.two.three': 'INFO',
        'one.two.three.four': 'ERROR',
    }
});

console.log('=== one');

var oneLogger = log4js.getLogger('one');
oneLogger.trace('trace');
oneLogger.debug('debug');
oneLogger.info('info');
oneLogger.error('error');

console.log('=== two');

var twoLogger = oneLogger.getLogger('two');
twoLogger.trace('trace');
twoLogger.debug('debug');
twoLogger.info('info');

console.log('=== three');

var threeLogger = twoLogger.getLogger('three');
threeLogger.trace('trace');
threeLogger.debug('debug');
threeLogger.info('info');

console.log('=== four');

var fourLogger = threeLogger.getLogger('four');
fourLogger.trace('trace');
fourLogger.debug('debug');
fourLogger.info('info');
fourLogger.error('error');