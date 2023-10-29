import log4js from 'log4js';

log4js.configure({
  "appenders": {
    "system": {
      "type": "dateFile",
      "filename": "logs/system.log",
      "backups": 2,
      "compress": true,
      "pattern": "-yyyy-MM-dd"
    },
    "access": {
      "type": "dateFile",
      "filename": "logs/access.log",
      "pattern": "-yyyy-MM-dd"
    },
    "error": {
      "type": "dateFile",
      "filename": "logs/error.log",
      "pattern": "-yyyy-MM-dd"
    },
    "console": {
      "type": "console"
    }
  },
  "categories": {
    "default": { "appenders": ["system","error","console"], "level": "debug" },
    "system": { "appenders": ["system","console"], "level": "debug" },
    "error": { "appenders": ["error","console"], "level": "error" },
  }
});

const sys_logger = log4js.getLogger("system");
const err_logger = log4js.getLogger("error");

export { sys_logger, err_logger };

