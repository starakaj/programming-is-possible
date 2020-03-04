const bunyan = require("bunyan");
const path = require("path");
const moment = require("moment");
const log = bunyan.createLogger({
    name: 'test',
    streams: [
      {
        level: 'info',
        path: path.join(__dirname, "test.log")
      }
    ]
});

// Make data for the last 7 days
for (let d = 0; d < 7; d++) {

    // Make data for 24 hours in that day
    for (let h = 0; h < 24; h++) {

        let temp = Math.random() * 100;
        let humid = Math.random() * 100;

        log.info({
            temp,
            humid,
            time: moment().subtract(d, "days").add(h, "hours").utc().format()
        });
    }
}
