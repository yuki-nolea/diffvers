import log4js from 'log4js';
//const log4js = require('log4js');

log4js.configure({
  "appenders": {
    "system": {
      "type": "dateFile",
      "filename": "log/system.log",
      "backups": 2,
      "compress": true,
      "pattern": "-yyyy-MM-dd"
    },
    "access": {
      "type": "dateFile",
      "filename": "log/access.log",
      "pattern": "-yyyy-MM-dd"
    },
    "error": {
      "type": "dateFile",
      "filename": "log/error.log",
      "pattern": "-yyyy-MM-dd"
    },
    "console": {
      "type": "console"
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "system",
        "error",
        "console"
      ],
      "level": "debug"
    }
  }
});

const logger = log4js.getLogger("system");

//debugLogger.debug('Hello world! for debug');
//systemLogger.info('Hello world! for system');

export default logger;

