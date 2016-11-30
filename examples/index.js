var log4jsNested = require('../index');
var terror = require('terror');

log4jsNested.setGlobalLogLevel('trace');

var testLogger = log4jsNested.getLogger('test');

var MyError = terror.create('MyError', {NOT_FOUND: 'notFound %id%', SERVER_ERROR: 'serverError'});

testLogger.trace('test');
testLogger.debug('test');
testLogger.info('test');
testLogger.warn('test');

var notFoundError = new MyError(MyError.CODES.NOT_FOUND);

notFoundError.bind({id: 100500});

testLogger.error(notFoundError);
testLogger.fatal(new MyError(MyError.CODES.SERVER_ERROR, new Error('test')));

console.log('===');

var nextLevelLogger = testLogger.getLogger('next');

nextLevelLogger.trace('test');
nextLevelLogger.debug('test');
nextLevelLogger.info('test');
nextLevelLogger.warn('test');
nextLevelLogger.error('test');
nextLevelLogger.fatal('test');

console.log('===');

var deeperLogger = nextLevelLogger.getLogger('deeper');

deeperLogger.trace('test');
deeperLogger.debug('test');
deeperLogger.info('test');
deeperLogger.warn('test');
deeperLogger.error('test');
deeperLogger.fatal('test');
