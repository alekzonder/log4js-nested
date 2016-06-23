var assert = require('chai').assert;

var log4js = require('log4js');

var appender = require('./appender');

var log4jsNestedWrap = require('../wrap');

log4js.setGlobalLogLevel('trace');

var logEvent = null;

log4js.loadAppender(__dirname + '/appender');

log4js.configure({appenders: []});

log4js.addAppender(log4js.appenders[__dirname + '/appender'](null, function (event) {
    logEvent = event;
}));

log4js = log4jsNestedWrap(log4js);

describe('log4js-nested', function () {

    it('one level', function () {

        var logger = log4js.getLogger('one');
        logger.trace('test');

        assert.equal(logEvent.category, 'one');
        assert.deepEqual(logEvent.data, ['test']);

    });

    it('two level', function () {

        var logger = log4js.getLogger('one');
        var twoLogger = logger.getLogger('two');

        logger.trace('test');

        assert.equal(logEvent.category, 'one');
        assert.deepEqual(logEvent.data, ['test']);

        twoLogger.trace('two test');

        assert.equal(logEvent.category, 'one.two');
        assert.deepEqual(logEvent.data, ['two test']);

    });
});
