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
    constructor(log4js, category) {
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
    getLogger(category) {
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
    get level() {
        // TODO
        return this._logger.level.levelStr;
    }

    /**
     * configure log4js
     *
     * @param  {Object} config
     */
    configure(config) {
        this._log4js.configure(config);
    }

    /**
     * set global log level
     *
     * @param {String} level
     */
    setGlobalLogLevel(level) {
        this._log4js.setGlobalLogLevel(level);
    }

    /**
     * set log level
     */
    setLevel() {
        this._logger.setLevel.apply(this._logger, arguments);
    }

    /**
     * trace wrap
     */
    trace() {
        this._logger.trace.apply(this._logger, arguments);
    }

    /**
     * debug wrap
     */
    debug() {
        this._logger.debug.apply(this._logger, arguments);
    }

    /**
     * info wrap
     */
    info() {
        this._logger.info.apply(this._logger, arguments);
    }

    /**
     * warn wrap
     */
    warn() {
        this._logger.warn.apply(this._logger, arguments);
    }

    /**
     * error wrap
     */
    error() {
        this._logger.error.apply(this._logger, arguments);
    }

    /**
     * fatal wrap
     */
    fatal() {
        this._logger.fatal.apply(this._logger, arguments);
    }

    /**
     * get category helper
     *
     * @private
     * @param  {String} category
     * @return {String}
     */
    _getCategory(category) {
        if (!this._category) {
            return category;
        }

        return `${this._category}.${category}`;
    }

}

module.exports = Wrapper;
