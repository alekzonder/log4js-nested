var log4js = require('../index');

var mainLogger = log4js.getLogger('main');
mainLogger.info('main');

var nextLogger = mainLogger.getLogger('next');
nextLogger.info('next');

var deeperLogger = nextLogger.getLogger('deeper');
deeperLogger.info('deep');

var veryDeepLogger = deeperLogger.getLogger('very-deeper');
veryDeepLogger.info('deep');