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

    it('should use one level category', function () {

        var logger = log4js.getLogger('one');
        logger.trace('test');

        assert.equal(logEvent.category, 'one');
        assert.deepEqual(logEvent.data, ['test']);

    });

    it('should use two level category', function () {

        var logger = log4js.getLogger('one');
        var twoLogger = logger.getLogger('two');

        logger.trace('test');

        assert.equal(logEvent.category, 'one');
        assert.deepEqual(logEvent.data, ['test']);

        twoLogger.trace('two test');

        assert.equal(logEvent.category, 'one.two');
        assert.deepEqual(logEvent.data, ['two test']);

    });

    it('should use default category', function () {

        var logger = log4js.getDefaultLogger();

        logger.trace('test');

        assert.equal(logEvent.category, 'default');
        assert.deepEqual(logEvent.data, ['test']);

    });

    it('should return log level', function () {
        var logger = log4js.getDefaultLogger();
        assert.equal(logger.level, 'TRACE');
    });

    describe('#hasLogger', function () {

        it('should hasLogger return true on existing logger', function () {
            var test = log4js.getLogger('test');
            assert(log4js.hasLogger('test'));
            assert.isFalse(log4js.hasLogger('test123'));
        });

    });

    describe('#logging', function () {

        it('should trace', function () {
            var string = 'trace';
            var logger = log4js.getLogger(string);
            logger[string](string);
            assert.equal(logEvent.level, string.toUpperCase());
            assert.deepEqual(logEvent.data, [string]);
        });

        it('should debug', function () {
            var string = 'debug';
            var logger = log4js.getLogger(string);
            logger[string](string);
            assert.equal(logEvent.level, string.toUpperCase());
            assert.deepEqual(logEvent.data, [string]);
        });

        it('should info', function () {
            var string = 'info';
            var logger = log4js.getLogger(string);
            logger[string](string);
            assert.equal(logEvent.level, string.toUpperCase());
            assert.deepEqual(logEvent.data, [string]);
        });

        it('should warn', function () {
            var string = 'warn';
            var logger = log4js.getLogger(string);
            logger[string](string);
            assert.equal(logEvent.level, string.toUpperCase());
            assert.deepEqual(logEvent.data, [string]);
        });

        it('should error', function () {
            var string = 'error';
            var logger = log4js.getLogger(string);
            logger[string](string);
            assert.equal(logEvent.level, string.toUpperCase());
            assert.deepEqual(logEvent.data, [string]);
        });

        it('should fatal', function () {
            var string = 'fatal';
            var logger = log4js.getLogger(string);
            logger[string](string);
            assert.equal(logEvent.level, string.toUpperCase());
            assert.deepEqual(logEvent.data, [string]);
        });

    });

    // it('should return levels', function () {
    //     var logger = log4js.getLogger();
    //
    //     console.log(logger.levels);
    // });


});
