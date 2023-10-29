import log4js from 'log4js';

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
    "default": { "appenders": ["system","error","console"], "level": "debug" },
    "system": { "appenders": ["system","console"], "level": "debug" },
    "error": { "appenders": ["error","console"], "level": "debug" },
  }
});

const sys_logger = log4js.getLogger("system");
const err_logger = log4js.getLogger("err");

export { sys_logger, err_logger };

