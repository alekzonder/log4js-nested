# log4js-nested

create nested log4js instances with nested categories

[![Code Climate](https://codeclimate.com/github/alekzonder/log4js-nested/badges/gpa.svg)](https://codeclimate.com/github/alekzonder/log4js-nested)
[![Build Status](https://travis-ci.org/alekzonder/log4js-nested.svg?branch=master)](https://travis-ci.org/alekzonder/log4js-nested)

[![NPM](https://nodei.co/npm/log4js-nested.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/log4js-nested/)

## install

```
npm i log4js-nested
```


## usage

```js
var log4js = require('log4js-nested');

var mainLogger = log4js.getLogger('main');
mainLogger.info('main');

var nextLogger = mainLogger.getLogger('next');
nextLogger.info('next');

var deeperLogger = nextLevelLogger.getLogger('deeper');
deeperLogger.info('deep');

var veryDeepLogger = deeperLogger.getLogger('very-deeper');
veryDeepLogger.info('deep');

// ...
```

#### output
```
[2016-05-18 17:06:39.002] [INFO] main - main
[2016-05-18 17:06:39.009] [INFO] main.next - next
[2016-05-18 17:06:39.010] [INFO] main.next.deeper - deep
[2016-05-18 17:06:39.010] [INFO] main.next.deeper.very-deeper - deep
```

also you can wrap your own log4js instance

```js
var log4js = require('log4js');
var log4jsNested = require('log4js-nested/wrap')(log4js);

var logger = log4jsNested.getLogger('main');
```

## configure loggers

you can configure log level for every categories and nested using log4js.configure

see full example in [examples/deepLogLevel.js](examples/deepLogLevel.js)

```js
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


var oneLogger = log4js.getLogger('one');
// ...

var twoLogger = oneLogger.getLogger('two');
// ...

var threeLogger = twoLogger.getLogger('three');
// ...

var fourLogger = threeLogger.getLogger('four');
// ..

```

#### output

```
=== one
[2016-05-18 17:31:30.939] [TRACE] one - trace
[2016-05-18 17:31:30.943] [DEBUG] one - debug
[2016-05-18 17:31:30.944] [INFO] one - info
[2016-05-18 17:31:30.944] [ERROR] one - error
=== two
[2016-05-18 17:31:30.944] [DEBUG] one.two - debug
[2016-05-18 17:31:30.944] [INFO] one.two - info
=== three
[2016-05-18 17:31:30.945] [INFO] one.two.three - info
=== four
[2016-05-18 17:31:30.945] [ERROR] one.two.three.four - error
```

see all [examples](examples)


## License

MIT