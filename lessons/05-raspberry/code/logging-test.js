const bunyan = require("bunyan");
const log = bunyan.createLogger({
    name: "dht",
    streams: [
        {
            stream: process.stdout,
            level: "debug"
        },
        {
            path: "/var/tmp/dhtsensor.log",
            level: "error"
        }
    ]
});

log.info("This will be printed to the console, since 'info' is a log level above 'debug'");
log.error("This will also be written to a log file, since the file stream is for 'error' and higher");
