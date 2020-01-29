# Node, Part 1: What the heck is Node?

## Authors
Sam Tarakajian for NYU

@starakaj

## Essential Questions
- What is Node.js?
- What is npm?
- What is Express.js?
- What is git?
- What is a User Agent?

## Introduction
In this class we're going to start diving into Node.js. We're using Node and not Python or some other scripting language mostly for the sake of simplicity. Other languages are still great, and the stuff we'll talk about in this class and throughout the course extends to other languages as well. 

We'll talk about how to run a Node program, how to create a Node package, how to set up a simple server with Node, and how to push the whole thing up to GitHub. In future classes we'll drill down into each of these areas a little more closely.

### Target Audience / Prerequisite & Pre-Assessment
Before this class you should have Node installed, preferrably with nvm. On OS X you'll also want to have Developer Tools installed. Windows users should install Git Bash with MinGW. You might also want a coding text editor installed. Sublime Text and Visual Studio Code are both excellent.

### Outcomes & Goals
* In this class we'll create a Node project. The project will use Express.js to implement a simple HTTP server. Finally, we'll upload the whole thing to GitHub.
* Students will come away from this class with a basic understanding of how Node works. We'll also look at writing a web server, user agents, and debugging a Node program.

### Pacing / Duration
- 0:15 Discussing the assigned reading
- 0:10 What is Node used for? What is a web server? Why should we care?
- 0:10 Finding our way around the command line, mkdir, rm, cd, ls
- Using `git init` to create a repository.
- 0:10 Making git commits, making a branch, merging a branch
- 0:10 Creating a JavaScript script to run with Node, and running that script.
- Writing a script that prints out information about the operating system to the screen.
- Using NPM to set up a Node package
- Parts of a node package
- Installing a dependency (chance)
- Using `require` to link the dependency
- Running the script
- Debugging a Node program
- Break
- Installing Express.js
- Creating an HTTP server with Node
- Using an NPM script to run the server (also what is JSON?)
- Parts of a URL
- Express routes
- Returning a simple webpage
- Workshop: Make a website that tells the user about themselves.
    - What kind of computer are they using?
    - Where are they visiting from?
    - How many times have they visited?
    - What other websites have they visited?
    - Get each other's IP addresses and visit each other's websites
    - Upload the whole thing to GitHub

## Materials Needed
You'll need a computer with a connection to the internet. Node, nvm, and git should be installed. OS X users should install Developer Tools, Windows users should install MinGW. It's also highly recommended that you install Chrome.

### Exercises To Do Before Class
You might want to read an intro to Node, and definitely brush up on your JavaScript if it's new to you.

### Vocabulary
* Node:
* JavaScript:
* Express:
* Debugging: 

## Exercise Descriptions
### What is Node? What is a web server?
Well as you know Node is a JavaScript runtime built on the V8 engine. A server is any program that waits for connections to the outside world, and which receives and transmits data over any formed connections. Usually a web server transmits data using HTTP, and serves data that can be rendered in a web browser.

### Learning your way around the command line
We'll be using the command line a lot in this class. On OS X you have Terminal, though I recommend installing [iTerm](https://iterm2.com/) and [zsh](https://ohmyz.sh/), since it will make your life easier. On Windows there's the command prompt, but I have no idea how to use that. You're encouraged to use either Git for Windows, aka [Git Bash](https://gitforwindows.org/), or to follow [this guide](https://github.com/itp-dwd/2020-spring/blob/master/guides/windows-setup.md).

For some of you this may be review, but just in case it's not let's do the basics. Everything you do in the terminal runs a program. The first word, separated by spaces, is the name of the program. What follows are arguments.

`ls`

This runs the command "ls" with no arguments. You can type

`which ls`

to see where the ls program resides on your computer.

`mkdir newdir`

This runs the program "mkdir" with the argument "newdir", creating a directory called "newdir" in the current working directory.

These are some useful programs that we'll use all the time.

- `ls`: List the files and folders in the current directory
- `pwd`: Print the current directory, aka the working directory
- `mkdir`: Create a new directory
- `rm`: Remove a directory. Usually you'll run `rm` with the flags `-r` and `-f`, to remove the directory recursively and to "force" the directory removed, even if it contains files. `rm -rf somedir` will remove the directory "somedir" and all its contents.
- `cd`: Change directory. Remember that `.` is the current directory and `..` is the directory one level up. So you can always move up one directory by typing `cd ..`.
- `start`: On Windows, `start .` is a handy way to open the current directory in the file explorer.
- `open`: On OS X, `open .` is a handy way to open the current directory in Finder.

### Git

Git is an open source tool for version control. It wants to help you work on large, complex projects with multiple people all working on different parts at the same time. Git is organized around the notion of a commit. You do some work, which usually involves adding, moving, removing or updating files. You then commit that work, which attaches a hash identifier to that group of edits. 

- Let's add a README.md file and then commit it.
- Now let's add another file called os-info.js.
- Let's commit that file.
- Now let's create a new branch called os-info.
- Checkout that branch before moving to the next section.

### Node + git

From the command line, you run Node like a program. `node somefile.js` will run the file called "somefile.js". Let's create a simple file that prints out some information about the operating system that we're running on.

- Use `require` to include other JavaScript files as a module.
- Use the `os` module to access functions that describe the current operating system.
- `os` is part of the Node framework. You can browse all of the Node libraries in the (API Documentation)[https://nodejs.org/dist/latest-v12.x/docs/api/].
- `node os-info.js` will run that file. It should print out info about the current operating system.
- Having made progress, let's commit it to our branch. Then, let's switch back to the `master` branch and merge in those changes.

This pattern—making changes, commiting and then merging them, is part and parcel of working with git and node. For the rest of this class we'll be working on the master branch only. Often for smaller projects, making branches isn't necessary. However, when multiple people are working on a project, making branches can be an important way to keep work organized.

### npm, chance, and .gitignore

So far we haven't been working with any Node dependencies. However, Node becomes so much more powerful when you take advantage of all of the libraries that have already been written and uploaded to npm. Before we can do that, we need to initialize our own git package.

- Use `npm init` to initialize a Node package.
- This creates a `package.json` file, a file in [JSON format](https://www.json.org/) that documents our package.
- You should commit this file.

Having a `package.json` file allows us to inlcude other npm packages as dependencies.

- `npm install *packagename*` will install a package with the given name.
- Try `npm install chance` to get the chance package
- Once you've done this, notice that this updates package.json
- You'll notice that it also creates `package-lock.json`
- You'll notice that this also creates a folder called `node_modules`, containing our new dependency and all of its dependencies. 
- We don't actually want to commit this folder, since `package.json` can always be used to rebuild it. We instead create a new file called `.gitignore` and add `node_modules` to it. That way git won't try to include node_modules in version control.

With this, we can make a .js file that will give us a random name.

### Debugging

Suppose this file wasn't working correctly. How would be go about debugging it?

- Run the Node file again, this time passing "--inspect-brk"
- `node --inspect-brk namer.js`
- This runs the node process with the debugger active. This allows other processes to connect to the node process and inspect its state. The easiest way to debug is with the Chrome debugger. 
- Open up Chrome and type `chrome://inspect`
- You'll be able to find your process and set breakpoints.

### Express

Express is a Node package that makes setting up an HTTP server super simple. It lets us do things like route requests to an appropriate function, and send data back to the client.

- `npm install express`
- Create a file called `server.js`
- Require `express`
- Create the main express app
- Add a `.get` for the root path
- Send back some text
- `node server.js` to actually run the server

This creates an extremely simple server that responds to HTTP GET requests, sending back a simple message as structured JSON. Express routes can be more complex.

### Require and Module Resolution

Suppose we wanted to re-use the "namer" functionality that we created earlier. By using `module.exports`, we can create reusable functions that other parts of the code can use.

- Go back to namer.js
- Create two functions, `randomName` and `randomPlace`
- Go back to our server function, and require the "namer.js" file. Notice that we have to use a path prepended with "./", so that Node knows how to resolve the .js file.
- Add a new route for the name

### User Agents and returning gross HTML strings
You may have noticed that we're just returning JSON, which doesn't render in a cool way on the page. If we actually want the page to generate a webpage, then we'll have to return HTML. We'll look next week at templating, and at how to generate a page that way. For this week, we'll just be working with HTML strings.

- Modify the root to return an actual HTML page

For the workshop portion of this class, we're going to make use of a user agent. A user agent is a little bit of information that your browser sends to the server when it makes a request. It lets the server know all kinds of stuff, like what kind of machine you have and what language you speak.

- See if you can figure out how to get the user agent from an express request.
- Make a webpage that tells the user how much you know about them.
- Upload the whole thing to github

## Homework

## Student Reflections, Takeaways & Next Steps
Additional materials for the students to leave with that can help them dig deeper into the subject or additional exercises and challenges to help students progress their knowledge to the next level and gain mastery of the subject through independent study.

* Multiple Project Exit Points: an idea of high-medium-low projects so students are locked into one end product.
  * First Steps - a simple exercise
  * Next Steps - medium exercise
  * Big Steps - a challenge or open ended study
* Presentation: how might students share their work? With peers, outside world? What media or platforms could/should be referenced to students to encourage sharing (Instagram, Tumblr...)? 
* Reflection: reflection questions that ask students to think about CS concepts and practices. How can students express what they’ve learned in some creative way?

## Post Session aka Homework

### References
- [Node API](https://nodejs.org/dist/latest-v12.x/docs/api/)
- [Node require/resolve](https://nodejs.org/dist/latest-v12.x/docs/api/modules.html#modules_require_resolve_request_options)
- [Chance package](https://chancejs.com/)
- [Express](https://expressjs.com/)
- [Express User Agent](https://github.com/biggora/express-useragent/)

### Implementation Guidance & Teaching Reflection  


***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***