# Node, Part 2—Put it on Heroku

## Authors
Sam Tarakajian for NYU

@starakaj

## Essential Questions
- How can you render dynamic webpages? Also what is a dynamic webpage?
- What is React? Why do people use it?
- What is transpiling? How do we transpile?
- How do you actually host a Node.js script somewhere?

## Introduction
This class is about taking Node out of production and putting it on the Internet. We'll talk about how to start building a website that has both a public face, intended to be viewed by a person, as well as an API, intended to be viewed by a machine. We'll look at React, a front-end framework for building dynamic webpages.

### Outcomes & Goals
* In this class we will create a Node server that serves a dynamic webpage. The server will also have an API that another machine can use to interface with the program.
* That dynamic webpage will use React to manage its front-end interface.
* We will also deploy the program to Heroku, so that other people can actaully play around with it.

### Pacing / Duration
- 0:10 - Discuss the reading from last week.
- Create a new Node project
- Talk about React
- We'll be using React here just as a templating engine, which is just the tip of what it can do.
- Basic idea: we create templates using React, and transpile these to JavaScript before turning them into HTML using react-dom/server
- mkdir public, mkdir src
- Install Babel `npm install --save-dev @babel/core@7.1.0 @babel/cli@7.1.0 @babel/preset-env@7.1.0 @babel/preset-react@7.0.0`
- Create a .babelrc file
- Install react `npm i react@16.5.2 react-dom@16.5.2`
- Make a file called `App.jsx` in src
- Compile it using babel
- Create a server file to serve the generated content using `renderToStaticMarkup`
- Split the thing into components
- Make a component that welcomes the user
- Make a component that tells the user on what kind of operating system the server is running
- Now for a fun challenge, make a counter that tells the user how many times they've visited the page.
- Put the whole thing up on Heroku

## Materials Needed
As always, bring your own laptop. Please also make an account on [Glitch](https://glitch.com/), which we will be using to get our feet wet with React before setting up our local toolchain. You'll also need an account on [Heroku](https://www.heroku.com/), and to have installed the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

### Exercises To Do Before Class
If you're new to front-end web development, and concepts like events, the DOM, and client-side state are new to you, then you might want to review. I highly recommend reading through the lesson notes for the Dynamic Web Development class at ITP, [available here](https://github.com/itp-dwd/2020-spring/blob/master/weeks/03_front-end-applications.md).

### Vocabulary (example)
* Client-side code: Code (in the context of the web, almost always JavaScript) that executes in the client's browser, as opposed to somewhere else.
* Dynamic webpage: Webpages who's structure and content can change after they are loaded.
* DOM: The Document Object Model. Basically, the structure of a web page, definied by the nesting relationship of its elements.
* Virtual DOM: A backing of the DOM that is faster to manipulate and to compare. Used by React to limit re-renders to those parts of the page that have changed.

## Exercise Descriptions
* Deploying a dead-simple Node application to Heroku.
* Playing with Glitch.com to learn the basics of client-side React.
* Installing a local toolchain to build a React app.
* Deploying our React app to the cloud.
* Working on the homework.

### Getting ready for Heroku
Last week we built a web server with Node that was able to display a simple webpage. We were able to run that server locally and to view the page on `localhost:3000`, but what if we wanted to put that server on the internet and run if from anywhere?

This is where things get a bit tricky. The first key to getting our server on the internet is to associate it with an IP address that anyone in the world can find. Up to now we've been using `localhost`, aka `127.0.0.1`, which is a special kind of IP address that always means "this machine." You could go to https://whatismyipaddress.com/ and get your IP, but that's just the IP address assigned to you by your ISP. It could change at any time, and you'd somehow have to inform everyone who wanted to visit your webpage about that change. Plus, if you wanted people to be able to visit your webpage at any time, you'd have to keep your computer running 24/7.

In the old days, individuals and businesses would have a physical server machine somewhere in their building that would be constantly handling requests from the outside world. People still do that these days, but it's also very common to work with a virtual machine provider to handle actually running your code for you. A VM host can do things like:

- Manage your IP address (static or dynamic).
- Dynamically balance your server load across multiple machines.
- Report security violations or suspicious activity.
- Automatically send you an email alert if your service goes down.
- Lots of other stuff.

So it's no real surprise that people pay for this kind of thing. Managing a virtual machine is a course—maybe even a degree—unto itself, but using Heroku we can get the basics working in just a few minutes. We could work from the server we build for homework (or the one from last week), but let's make one from scratch. It will be good practice.

```sh
mkdir hello-world-server
cd hello-world-server
git init
npm init
<accept all the defaults>
npm install express
```

We've seen how to make a server that uses template files last week, but for now let's make a barebones server that just returns a string. Make a file `server.js` that looks like this:

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("You did it, you made a web page");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
```

You should be able to run this file `node server.js`. Then navigate to `localhost:3000` and you should see your web page. If you see your page load, then we're ready to deploy.

### Preparing our code
With our app in this state, we're ready to deploy.

First, create a _Procfile_. When you deploy to Heroku, the first thing it has to do is set up your machine, basically from scratch. The _Procfile_ helps Heroku know what you need. It tells Heroku which processes to run in which contexts. For a Node process that's as simple as a server, we only need a `web` process. The `web` process is a special process that's able to connect to the outside world. Let's define a simple process:

```Procfile
# Procfile
web: npm start
```

We haven't talked about the "scripts" section of the `package.json` file yet, but it lets you attach a name to a particular set of instructions for Node to run. You'll see that `npm init` sets one up for us by default:

```json
// From package.json
{
    // ...
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    // ...
}
```

You can this script (which clearly won't do much) by running `npm run test`. The `start` script is special—you can run it by typing `npm run start` or `npm start`. 

Let's add a script to run our server with `npm start`. Edit package.json to look like this:

```json
// From package.json
{
    // ...
    "scripts": {
        "start": "node server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    // ...
}
```

If you like, you can test running your server with `npm start`.

Okay, the next thing we need to do is make a small change to our server code. Right now, we're using port 3000 no matter what, as our hardcoded port. The thing is, when Heroku runs our server, it's going to tell us which port we should be listening on. It will pass this to our server using the _environment_, which is a set of properties that we can access from `process.env`. Edit our server code so it looks like this:

```js
const express = require("express");

// Use the POST environment property or 3000 if none is available.
const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    res.send("You did it, you made a web page");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```

Okay, now we're almost ready, just one more tiny change to make in order to be ready for Heroku. We need to tell Heroku which version of Node we'd like to use. To do that, we add a "node" property to the "engines" property of our package.json file. The completed package.json should look something like this:

```js
{
  "name": "hello-world-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "engines": {
    "node": "12.x" // Use any Node version starting with 12
  }
}
```

Now we're ready!

### Deploying to Heroku

The basic idea behind deploying to Heroku is this: you push your code to a special repository location managed for you by Heroku. When you do, Heroku will detect that change and run your server for you.

First, we need to create a Heroku application. This contains the Heroku repo, as well as other resources for our application. Log in to Heroku, and under Apps, create a new app. The name has to be unique, so you can't call it hello-world-server (that's taken). Use whatever name you want. I named mine `dried-fish-server`.

Now Heroku is just waiting for us to push code to it. Let's go to the command line and commit all our changes.

```sh
git add .
git commit -m "Initial commit"
```

Now we need to login to Heroku. This has become very easy in recent years.

```sh
heroku login
```

Next, we need to add Heroku as a "remote." You can think of a remote as another machine that has been set up to mirror your git repository. We only need to set up this remote once.

```sh
heroku git:remote -a dried-fish-server
```

Now we can push to the remote named Heroku.

```
git push heroku master
```
We should get a bunch of stuff printed out, hopefully telling us that everything was successful.

```
remote: -----> Launching...
remote:        Released v3
remote:        https://dried-fish-server.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/dried-fish-server.git
```

That's it! Go to the URL indicated to see your page on the real internet.

### React Basics

Okay, now that we've made it this far, let's shift gears and talk a bit about React. Last week we were using HTML templates, with strings like `%%%TITLE%%%` that we would replace with some text, or even a bit of HTML that we wanted to use in its place. At an extremely high level, React does the same basic thing. However, it does it much more powerfully and flexibly. 

One downside to getting started with React is that it requires a bit of setup. We'll be working with a language for React called JSX that looks a bit like a blend of JavaScript and HTML. However, modern browsers can't work with JSX, so we have to _transpile_ (a porte-monteau of translate and compile) the JSX into JavaScript. To do that, we need to set up a local toolchain with developer tools called Webpack.

All of that toolchain stuff can get in the way of our learning how to work with React. So before we dive into that, let's head to glitch.com. We can use their setup to try out React without needing to set up as much stuff.

Navigate to glitch.com, log in. The project that we'll be starting from can be found at https://glitch.com/~starter-react. Let's go through the parts of this very briefly.

- _server.js_ - This should look extremely familiar, it's a server just like the one that we built last week.
- _watch.json_ - This is a glitch.com thing, that tells the app container when to re-launch. You can ignore this.
- _webpack.config.js_ - This describes the configuration of the Webpack bundler. For now, we can ignore this, but we'll return to it later.
- _index.html_ - This page loads our bundled _.js_ code and injects it into the page. For now we can ignore this.
- _app.jsx_ - This kicks off the whole program, and loads the "HelloWorld" component into the _div_ with the id "main".
- _HelloWorld.jsx_ - This is the component that is the root of the entire application. Let's start here—this is where we can start to change the behavior of the app.

Start by deleting everything in _HelloWorld.jsx_ (You can open up the preview to see what this does). Replace it with something like this:

```jsx
const React = require("react");

const HelloWorldComponent = function() {
  return <h1>This is a big ol' title</h1>
};

module.exports = HelloWorldComponent;
```

What the heck is going on here? Well there's a couple of things happening that we haven't talked about yet. First, we're using this thing called module.exports.

### module.exports

This is a mechanism that lets JavaScript files share functionality with each other. When you `require` another file, it's `module.exports` that defines what gets shared. We might have talked about this last week, I don't remember.

Create a new file at `app/logic/utils.js`. Add to that file something like this:

```js
function randomNumber() {
  return Math.random();
}

module.exports = {
  randomNumber: randomNumber
};
```

As you can see, module.exports is just an object. This one happens to be exporting just one function, but you can export as much as you like. Now modify `HelloWorld.jsx` so it looks like this:

```jsx
const React = require("react");
const utils = require("../logic/utils.js");

const HelloWorldComponent = function() {
  return <h1>A random number is {utils.randomNumber()}</h1>
};

module.exports = HelloWorldComponent;
```

You'll remember that with template literals (aka the backticks) we could use `${}` to signify JavaScript that will be executed and then inserted into the string. JSX uses `{}` for the same purpose. But what's going on with this function? In order to get the `randomNumber` function, we first import the module from `utils.js`, naming it utils (we could name it whatever we wanted). Then we call the `randomNumber` function. Notice that you have to use the relative path to the file, rather than its name, when you load a project file rather than something you installed with `npm install`.

### Functional Components

React is based around the notion of a _component_. A component is a function that returns a single JSX element (this element can have other elements as children). So our `HelloWorldComponent` function does exactly that. But React and JSX get really powerful when you start to compose React components.

Let's create a new file at `app/components/clockface.jsx`. This will display the current time. Fill it out like this:

```jsx
const React = require("react");

module.exports = function() {
  return <h2>The current time is 3:21</h2>;
}
```

Change `HelloWorld.jsx` to look like this:
```jsx
const React = require("react");
const utils = require("../logic/utils.js");
const Clockface = require("./clockface.jsx");

const HelloWorldComponent = function() {
  return <div>
    <h1>A random number is {utils.randomNumber()}</h1>
    <Clockface />
  </div>;
};

module.exports = HelloWorldComponent;
```

Reload and you should see the time appear like you'd expect. Okay, that's cool, but what if the current time changes? This is where props come in. We can pass props down to React components, which they can then use to draw themselves.

### React Props and State

Change `clockface.jsx` to look like this:

```jsx
const React = require("react");

module.exports = function(props) {
  const hours = props.hours;
  const minutes = props.minutes;
  const seconds = props.minutes;
  return <h2>The current time is {hours}:{minutes}:{seconds}</h2>;
}
```

Now change `HelloWorld.jsx` to look like this:

```jsx
const React = require("react");
const utils = require("../logic/utils.js");
const Clockface = require("./clockface.jsx");

const date = new Date()

const HelloWorldComponent = function() {
  
  return <div>
    <h1>A random number is {utils.randomNumber()}</h1>
    <Clockface
      hours={date.getHours()}
      minutes={date.getMinutes()}
      seconds={date.getSeconds()} />
  </div>;
};

module.exports = HelloWorldComponent;

```

You see what's going on here? We're passing the hours and minutes down to the child component as props. When it comes time to render, the child uses the passed in props to draw itself. The parent owns the actual state. But what if we want to update those props? For that we can use state. Change HelloWorldComponent like so:

```jsx
const React = require("react");
const utils = require("../logic/utils.js");
const Clockface = require("./clockface.jsx");

const date = new Date();

const HelloWorldComponent = function() {
  
  const [count, setCount] = React.useState(0);
  
  return <div>
    <h1>A random number is {utils.randomNumber()}</h1>
    <h2>The button has been clicked {count} times</h2>
    <Clockface
      hours={date.getHours()}
      minutes={date.getMinutes()}
      seconds={date.getSeconds()} />
  </div>;
};

module.exports = HelloWorldComponent;
```

Okay, this gives our "HelloWorld" component some state. That element of state is called `count` and the function for setting it is called `setCount`. When we update this state, React will re-render this component. Let's add a button to register clicks.

```jsx
const React = require("react");
const utils = require("../logic/utils.js");
const Clockface = require("./clockface.jsx");

const date = new Date();

const HelloWorldComponent = function() {
  
  const [count, setCount] = React.useState(0);
  
  return <div>
    <h1>A random number is {utils.randomNumber()}</h1>
    <h2>The button has been clicked {count} times</h2>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <Clockface
      hours={date.getHours()}
      minutes={date.getMinutes()}
      seconds={date.getSeconds()} />
  </div>;
};

module.exports = HelloWorldComponent;
```

Question: How come the random number updates every time we click the button? What could we change if we didn't want it to? How come the clock face doesn't change when we click the button?

### React Effects

Suppose we wanted the clock to update to reflect the time changing. How could we accomplish something like that? We might try something like setting a timer in the start of the file, and creating a new Date every second. The problem with this is, the component isn't a _thing_, it's more like instructions for creating a thing. We need instead some way to say "when you make my thing, here's something to do when you create it, before it's ready." That's where Effects come in, another kind of React hook. Modify HelloWorldComponent like so:

```jsx
const React = require("react");
const utils = require("../logic/utils.js");
const Clockface = require("./clockface.jsx");

const HelloWorldComponent = function() {
  
  const [count, setCount] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);
  
  return <div>
    <h1>A random number is {utils.randomNumber()}</h1>
    <h2>The button has been clicked {count} times</h2>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <Clockface
      hours={date.getHours()}
      minutes={date.getMinutes()}
      seconds={date.getSeconds()} />
  </div>;
};

module.exports = HelloWorldComponent;
```

To make this absolutely the most correct, we could add also clear the interval when we're done. We can do this by returning a function from `useEffect`.

```jsx
const React = require("react");
const utils = require("../logic/utils.js");
const Clockface = require("./clockface.jsx");

const oneTimeRandomNumber = utils.randomNumber();

const HelloWorldComponent = function() {
  
  const [count, setCount] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);

    return () => clearInterval(timerId);
  }, []);
  
  return <div>
    <h1>A random number is {oneTimeRandomNumber}</h1>
    <h2>The button has been clicked {count} times</h2>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <Clockface
      hours={date.getHours()}
      minutes={date.getMinutes()}
      seconds={date.getSeconds()} />
  </div>;
};

module.exports = HelloWorldComponent;
```

Believe it or not, you've encountered just now the most important parts of React. There's a lot more to it, but these are the important pieces.

- Pass props to an object to configure it when it renders
- An object will re-render when its props changes
- With useState you can give an object state that you can change
- An object will re-render when its state changes
- You can use `useEffect` to hook into the creation of an object, and also its unmonunting.

Okay, let's get this thing off of glitch and down on our computer.

### Pulling it off glitch

In the bottom-left corner of the glitch project there a button that says `tools`. You can click on this, then on `Git, Import, Export`, and then on `Download project`.

Having done that, you might want to move this project to your NYU directory for this class. if you run `git status` you'll see some files we probably don't care about.

```sh
rm -rf .config
rm -rf .env
rm -rf .node-gyp
```

We'll also need to modify the `.gitignore` file so that it doesn't include `node_modules`.

```.gitignore
public
node_modules
```

Of course, we can also add a Procfile like we did before. This script is configured just like the other one, to run the server when we run `npm start`, so we can use the exact same procfile. Add a file:

```Procfile
web: npm start
```

One more small thing we can do, hop into the `package.json` file and change the `engines` to Node 12.x.

```json
"engines": {
  "node": "12.x"
},
```

Now we can commit and push to heroku.

```sh
git add .
git commit -m "Updating with a clock"
heroku login
heroku git:remote -a dried-fish-server
git push -f heroku master
```

You'll need that `-f` when you push, to override whatever you'd pushed to that Heroku endpoint before. And just like that, we've got a React app up on Heroku.

### Workshop: Dog CEO

There's a sick API out there called dog.ceo. Really it's cool.

https://dog.ceo/dog-api/

So with this, you can get random dog pictures for days. We haven't seen how to make a web request using JavaScript, but luckily in the browser there's a function called `fetch`. This belongs to the browser! It's not in Node—we can use it but only because this is a front-end application. We haven't seen asynchronous functions before either, so now let's talk about them. 

An asynchronous function is a function that doesn't return right away. `fetch` is a perfect example of an asynchronous function—it has to go off and do something, and it might take awhile. In the meantime, we don't want to be waiting around, with our app stalled while it's doing it's thing. So we write something like:

```js
const response = await fetch("https://dog.ceo/api/breeds/image/random");
```

The `await` keyword is a special and very sexy new JavaScript thing that lets us resume execution when an asynchronous function finishes. All asynchronous functions must be marked with the `async` keyword. And you can only use `await` in a function that is itself async. So we could write an asynchronous function that returned the parsed JSON of a request to dog.ceo:

```js
async function fetchDogData() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const dogData = await response.json();
  return dogData;
}
```

Okay! Armed with this new skill, can you add new functionality to our page? Add a button that, each time you push it, loads a new dog image into the page.

## Homework

See [homework 2](../../homework/02-heroku-hw.md)

### References
- [Heroku](https://heroku.com)
- [Glitch](https://glitch.com)
- [Heroku Procfile with Node](https://devcenter.heroku.com/articles/nodejs-support)
- [Dog CEO](https://dog.ceo/dog-api/)
- [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous) 
- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-state.html)
- [React Hooks Demistified](https://dev.to/kayis/react-hooks-demystified-2af6)
- [React Hooks are not Magic](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
- [React Hooks: how do they work?](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)

### Implementation Guidance & Teaching Reflection  
I have no idea if this class actually has way to much information or not enough information.

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***