'use strict';

/**
 * @class
 */
class Wrapper {

    /**
     * @constructor
     *
     * @param  {log4js} log4js
     * @param  {String} category
     */
    constructor (log4js, category) {
        this.iAmLog4jsNested = true;
        this._category = null;
        this._log4js = log4js;

        if (category) {
            this._category = category;
        }

        this._logger = this._log4js.getLogger(this._category);
    }

    /**
     * get new logger
     *
     * @param  {String} category
     * @return {Wrapper}
     */
    getLogger (category) {
        if (!category) {
            category = 'default';
        }
        return new Wrapper(this._log4js, this._getCategory(category));
    }

    /**
     * log level
     *
     * @return {String}
     */
    get level () {
        // TODO
        return this._logger.level.levelStr;
    }

    /**
     * proxy getDefaultLogger
     *
     * @return {*}
     */
    getDefaultLogger () {
        return this.getLogger();
    }

    /* proxing log4js functions */

    getBufferedLogger () {
        return this._log4js.getBufferedLogger.apply(this._log4js, arguments);
    }

    /* getLogger() see below */

    /* getDefaultLogger() see below */

    hasLogger () {
        return this._log4js.hasLogger.apply(this._log4js, arguments);
    }

    addAppender () {
        return this._log4js.addAppender.apply(this._log4js, arguments);
    }

    loadAppender () {
        return this._log4js.loadAppender.apply(this._log4js, arguments);
    }

    clearAppenders () {
        return this._log4js.clearAppenders.apply(this._log4js, arguments);
    }

    configure () {
        return this._log4js.configure.apply(this._log4js, arguments);
    }

    shutdown () {
        return this._log4js.shutdown.apply(this._log4js, arguments);
    }

    replaceConsole () {
        return this._log4js.replaceConsole.apply(this._log4js, arguments);
    }

    restoreConsole () {
        return this._log4js.restoreConsole.apply(this._log4js, arguments);
    }

    get levels () {
        return this._log4js.levels;
    }

    setGlobalLogLevel () {
        this._log4js.setGlobalLogLevel.apply(this._log4js, arguments);
    }

    get layouts () {
        return this._log4js.layouts;
    }

    get appenders () {
        return this._Log4js.appenders;
    }

    get appenderMakers () {
        return this._Log4js.appenderMakers;
    }

    /**
     * set log level
     *
     * @return {*}
     */
    setLevel () {
        return this._logger.setLevel.apply(this._logger, arguments);
    }

    /**
     * trace wrap
     *
     * @return {*}
     */
    trace () {
        return this._logger.trace.apply(this._logger, arguments);
    }

    /**
     * debug wrap
     *
     * @return {*}
     */
    debug () {
        return this._logger.debug.apply(this._logger, arguments);
    }

    /**
     * info wrap
     *
     * @return {*}
     */
    info () {
        return this._logger.info.apply(this._logger, arguments);
    }

    /**
     * warn wrap
     *
     * @return {*}
     */
    warn () {
        var args = this._processTerrorArgument(arguments);
        return this._logger.warn.apply(this._logger, args);
    }

    /**
     * error wrap
     *
     * @return {*}
     */
    error () {
        var args = this._processTerrorArgument(arguments);
        return this._logger.error.apply(this._logger, args);
    }

    /**
     * fatal wrap
     *
     * @return {*}
     */
    fatal () {
        var args = this._processTerrorArgument(arguments);
        return this._logger.fatal.apply(this._logger, args);
    }

    /**
     * console.time
     *
     * @param {String} name
     */
    time (name) {
        if (typeof process.env.DEBUG_PERF === 'string') {
            console.time(this._category + ':' + name);
        }
    }

    /**
     * console.timeEnd
     *
     * @param {String} name
     */
    timeEnd (name) {

        if (typeof process.env.DEBUG_PERF === 'string') {
            console.timeEnd(this._category + ':' + name);
        }

    }

    /**
     * get category helper
     *
     * @private
     * @param  {String} category
     * @return {String}
     */
    _getCategory (category) {
        if (!this._category) {
            return category;
        }

        return `${this._category}.${category}`;
    }

    /**
     * process terror error object stack
     *
     * @see https://github.com/nodules/terror
     *
     * @param {Object} args
     * @return {Boolean}
     */
    _processTerrorArgument (args) {

        if (
            args && args[0] &&
            args[0]._isTerror === true &&
            typeof args[0].getFullStack === 'function'
        ) {
            args[0] = args[0].getFullStack();
        }

        return args;

    }

}

module.exports = Wrapper;
