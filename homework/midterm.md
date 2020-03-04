# Midterm
Due date: March 11, 6:30 pm

## Description
Through this course so far, we've seen how to build all the components of a data-gathering application. We've seen how to run a web server that exposes an API. We've seen how to persist data in that server using a database backend. We've seen how to build a client-facing application that can fetch data from the server and update its state. Finally, we've seen how to deploy code to a Raspberry Pi, and how to use sensors to fetch data from the real world. The question is, what can we do with all this data?

The goal for this project is to model a real-world application that might tie all these pieces together. This basic pattern—client, server, sensor—forms the backbone of a huge number of different projects. The basic structure looks something like this:

### Raspberry Pi
The Raspberry Pi component must have a sensor component and an actuator component. That is, it must have an element that can sense data from its environment, like a light sensor, a temperature sensor, or an accelerometer. It must also have an actuator component. This can be a literal actuator: a motor that can be driven at a particular speed or rotated to a particular position in response to a current. It can also be an LED that turns on or off, a heating element that activates or deactivates, or a water pump that can turn on or off. To interface with the rest of the system, the Raspberry Pi component must connect to a web server. Connecting to the web server should allow the Raspberry Pi to do at least two things: it should be able to report sensor data to the server, and it should be able to pull configuration data from the server. More on that below.

### Server
The server acts as a central point of correspondence for other parts of the system. It connects to the Raspberry Pi component, to the database back-end, and is serves the user-facing client application. It should be able to store sensor data from the Pi in a database to that this data can be retrieved later. That data should be organized by time, so that the server can expose an endpoint that filters sensor data to a given time interval. The server must host the client application, meaning it should statically serve the `bundle.js` file build from client code. It should be able to provide sensor data to the client through API endpoints, and it must be able to accept new settings for the Raspberry Pi from the client as well.

### Client
The client application must be a single-page, dynamic web application written using React. Visiting the page it should be possible to view data that has been gathered from the Raspberry Pi. It should be possible to view this data on different time scales. At minimum, it should be possible to view data from the last hour, the last day, and from the past week. In addition, it should be possible to configure the Raspberry Pi from the client. For example, the Raspberry Pi might activate a blue colored LED when temperature drops below a certain range, and a red LED when temperature goes above a certain range. From the client, it should be possible to reset those limits, or to invert the scale so that the blue light is mapped to high temperature and the red light to low temperature. The client must include a CSS file, and should be styled with some attention paid to its design. Whether or not you present a graph or a table of sensor readings is up to you.

## Example Project
I leave it up to you to design a project that fits these specifications. I'll go into some detail here describing one possible project, and then I'll sketch out some other possibilities as well. If you do decide to go for one of the more involved projects, just be careful to give yourself enough time, especially if you're on the Raspberry Pi team. You'll need time to get the hardware, set it up, and write code to make sure it works. You might find that you come back from the store with the wrong hardware, and that you need to make another trip. You might find that your time is better spent polishing your existing project than trying something more ambitious.

### Networked Temperature Sensor
The Raspberry Pi is connected to the DHT22 temperature and humidity sensor, as well as a three-color LED that presents a different color hue depending on the temperature. In addition to changing the color of the LED, the temperature readings are also sent, along with a timestamp, to the central server. The server stores those temperature readings in a database. The client application presents those temperature readings in either a table or a graph (if you decide to use a graph, I'd recommend reading up on SVG, and using React components that wrap SVG elements). The client can choose between multiple time series, either viewing temperture readings from the past hour, the past day or the past week. Finally, from the client it should be possible to change the LED color corresponding to cold, as well as the color corresponding to hot. The high and low temperature range should also be adjustable.

Keep in mind that there's no way to "push" data from the server down to the Raspberry Pi. If you want to change something about the Pi's configuration, in response to a change from the client, then the Pi will have to poll the server, asking for configuration updates.

### Other projects

- A temperature-controlled environment. The Pi controls the temperature of an enclosure, always keeping it within a certain range. The temperature of the enclosure should be recorded on the server and visible from the client. It should be possible to set the "target temperature" of the enclosure from the client. Regulating the temperature of an enclosure can be accomplished by adding heat (with a heater for example) or by removing heat (with a fan). Depending on your approach, this could be a relatively difficult electronics project.
- A motion detector. An accelerometer attached to a Raspberry Pi can detect vibrations that correspond to movement. When acceleration crosses a threshold, the Pi should log the event and illuminate an LED. The client should be able to display such occurences. It should also be able to change the acceleration threshold, and the color of the LED.
- Automatic watering system. The Pi connects to a moisture sensor and illuminates an LED when soil wetness falls below a certain level. The minimum moisture threshold should be configurable from the client app. The client should also be able to see moisture readings. It might be cute to add in the humidity + temperature sensor data as well, as you might find that the soil dries out faster on hot + dry days.

## Detailed Requirements

### Raspeberry Pi
- Must include a Github repository containing all of the code needed to run the sensor upload module. After installing Node and Git on a new Raspberry Pi, it should be possible to pull and deploy this code.
- This code must be running on a Raspberry Pi that is actively collecting data from the real world.
- The Raspberry Pi must gather data from some kind of sensor (you can use the DHT22 temperature and humidity sensor). That data must be sent, along with a timestamp, to the server.
- The Raspberry Pi must also control some kind of physical output. That could be the speed of a motor, the position of a servo, the color of a three-color LED, or something else.
- The Raspberry Pi must have some kind of configuration that can be set externally. If, for example, the Raspberry Pi is displaying a colored light in response to changes in temperature, then it should be possible to reconfigure the color assigned to "warm" and "cold".
- It must be possible to reconfigure the Pi from the client application.
- The Raspberry Pi should run the code as soon as it is powered on. It should not be necessary to log into the Pi and start the Node script manually.
- If something goes wrong during the execution of the script, it should be written to a log that can be recovered later.
- In case the hardware sensor is not available, it should be possible to run the Pi in a special development mode. In this mode, data is not returned from an actual sensor. Instead, the Pi sends dummy data to the server. The server may or may not store this data, but it should not be mixed with "real", aka production data.
- The repository must contain a README describing the project, including directions on how to build the circuit and what parts are required. It may contain photos showing the completed circuit.
- If the code in the repository is somehow incomplete, that should be documented in the README.

### Server
- Must include a Github repository containing all of the code needed to run the server. After pulling the code and running `npm install`, the server should run on a new machine (provided Node is installed). The Client and Server may use the same repository (probably this is the easiest way to manage the codebase).
- The server must be deployed on Heroku (or another managed server platform, but Heroku is probably easiest).
- The server must use a database to store data from the Raspberry Pi.
- Optionally, the server may connect to multiple Raspberry Pis, and may store their data separately.
- The server must serve the client application, and it must also serve any static assets (images, .css files, etc.) that the client needs.
- The server must provide the following API endpoints:
    - Add a new datapoint, with a timestamp
    - Retrieve all datapoints from within a given time range
    - Delete a specific datapoint
    - Retrieve the Raspberry Pi configuration
    - Update the Raspberry Pi configuration
    - Optionally, if you're using multiple Raspberry Pis, there should be an API endpoint that lists the available Pis.
- Be mindful of the HTTP verb (GET/POST/DELETE) that you associate with each endpoint.
- The repository must contain a README describing the project, including what it's for and how it works.
- If the code in the repository is incomplete, that should be documented in the README.

### Client
- Must include a Github repository containing all of the code needed to run the client. After pulling the code and running `npm install`, it should be possible to run the client in a browser. The Client and Server may use the same repository, indeed they probably should.
- The client must be bundled using webpack (this should be taken care of for you if you start the client + server repo from https://github.com/starakaj/react-express-starter).
- The server should serve the client as a static resource from the "/" path. Again, this should already be the case if you start the client from the React-Express Starter.
- The client should be a single-page React app. This follows the same patterm as the [Tic-Tac-Toe homework assignment](./02-heroku-hw.md).
- The client should display data from the Raspberry Pi. It should allow the user to see data (temperature data if you're using the DHT22) from the past week, from the past day and from the past hour.
- Optionally, if you're using multiple Raspberry Pis, then the client should be able to view data from a particular Pi.
- The client should be able to modify the configuration of the Raspberry Pi. For example, if the Raspberry Pi activates a colored light when the temperature rises above a certain value, the client should be able to change that value, or to change the color of the LED.

### All groups
- Each group must write a README in Markdown format. The outline of the README is up to you, but I recommend following a nice template like [this one](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
- It's not required, but I highly, highly recommend that at least once before the assignment is turned in, the whole group should meet. You can meet in person, but it will probably be easier to meet over video chat.
- Before meeting, you should agree on an agenda for the meeting.
    - You will probably want to assign a facilitator for the meeting. What is this person's role? You might want to read this https://www.co2partners.com/what-is-a-facilitator-role-and-responsibilities/
    - What will you talk about? Are there any decisions that need to be made that will affect the whole group?
    - Is anyone blocked on something? What can you do to get them unstuck?
    - How will you make sure that everyone has a chance to be heard?
- If you get the chance to meet, prepare an agenda and turn in that agenda as part of the assingment.
- Also if you get the chance to meet, take notes from that meeting. Those notes should be turned in as part of the assignment.

### Presentations
- On the day when this assignment is turned in, each group will make a short presentation.
- For this presentation, we're role-playing an internal debrief for a new product or installation. Imagine you're working at some kind of art-tech design studio. Each group as built a different piece of a larger whole. The goal of this debrief is to share knowledge internally to make the whole organization stronger.
- The audience is other groups at your organization, who might be familiar with the scope of your work but not its details. You're trying to convey information that will be useful to other people at your organization.
- Some questions that you might want to answer in your presentation:
    - In what order did you work on different parts of the assignment? How did the needs of other groups affect your work?
    - What was a surprising technical challenge that took longer than expected?
    - Did you use any new software libraries or techniques that we didn't discuss in class?
    - Is there a piece of the project that you're particularly proud of?
    - What would you do differently next time?
- The whole presentation should be about 10-15 minutes long.

### Blogging
- Finally, each of you should keep a blog documenting your own contribution to this project.
- The goal of the blog is to give you some documentation that you can point to later.
- You can use tumblr, github, a bunch of .txt files, whatever you like. 
- On the days that you work on this project, write a paragraph or two talking about your experience.
    - What did you work on?
    - How did it fit into the project as a whole?
    - Did you learn something new today?
    - Did you encounter an obstacle?
- The intent is for us to be able to share these blogs internally, so that we can see how all the different strands weave together into the final project.
- This isn't a self-assessment and your grade does not depend on the quality of your blog. However, you are still required to complete it.

## Handing it in
- Each group should send me an email with a Github repo where the code is stored.
    - The server and client groups can use the same repo.
- Each group should also send me the slides from their presentation.
- The Raspberry Pi group should bring in the completed Raspberry Pi circuit.
- A project representative should send the meeting agenda and notes (if applicable).
- Each person should send a link to their blog as well.
