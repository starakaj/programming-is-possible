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

## Student Reflections, Takeaways & Next Steps
Additional materials for the students to leave with that can help them dig deeper into the subject or additional exercises and challenges to help students progress their knowledge to the next level and gain mastery of the subject through independent study.

* Multiple Project Exit Points: an idea of high-medium-low projects so students are locked into one end product.
  * First Steps - a simple exercise
  * Next Steps - medium exercise
  * Big Steps - a challenge or open ended study
* Presentation: how might students share their work? With peers, outside world? What media or platforms could/should be referenced to students to encourage sharing (Instagram, Tumblr...)? 
* Reflection: reflection questions that ask students to think about CS concepts and practices. How can students express what they’ve learned in some creative way?

## Post Session

### References
- [Heroku](https://heroku.com)
- [Glitch](https://glitch.com)
- [Heroku Procfile with Node](https://devcenter.heroku.com/articles/nodejs-support)

### Implementation Guidance & Teaching Reflection  

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***