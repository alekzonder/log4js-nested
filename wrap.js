var Wrapper = require('./Wrapper');

module.exports = (log4js, category) => {

    if (log4js.iAmLog4jsNested) {
        return log4js;
    }

    return new Wrapper(log4js, category);
};
