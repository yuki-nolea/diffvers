import log4js from 'log4js';

log4js.configure({
  "appenders": {
    "system": {
      type: "dateFile",
      filename: "logs/system.log",
      compress: true,
      pattern: "-yyyy-MM-dd",
      keepFileExt: true,
      numBackups: 14
    },
    "error": {
      type: "dateFile",
      filename: "logs/error.log",
      compress: true,
      pattern: "-yyyy-MM-dd",
      keepFileExt: true,
      numBackups: 14
    },
    "console": { type: "console" }
  },
  "categories": {
    "default": { "appenders": ["system","error","console"], "level": "debug" },
    "system": { "appenders": ["system","console"], "level": "debug" },
    "error": { "appenders": ["error","console"], "level": "error" },
    "console": { "appenders": ["console"], "level": "debug" },
  }
});

const sys_logger = log4js.getLogger("system");
const err_logger = log4js.getLogger("error");
const con_logger = log4js.getLogger("console");

export { sys_logger, err_logger, con_logger };

