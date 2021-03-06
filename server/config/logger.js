const {createLogger, transports, format} = require('winston')
const appRoot = require('app-root-path');


const options = {
    file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    },
    console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    },
}

const logger = createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false,
})

logger.stream = {
    write: function(message, encoding) {
    logger.info(message);
    },
};

module.exports = logger;