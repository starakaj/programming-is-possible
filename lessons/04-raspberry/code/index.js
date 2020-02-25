console.log("Starting node sensor script");

const sensor = require("node-dht-sensor").promises;
 
sensor.setMaxRetries(10);

setInterval(async () => {
    try {
        const reading = await sensor.read(22, 4);
        const temp = reading.temperature;
        const humi = reading.humidity;
        console.log(`temp: ${temp}°C, humidity: ${humi}%`);
    } catch (e) {
        console.log("Error!");
        console.log(e);
    }
}, 1000);
