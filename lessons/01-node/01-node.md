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
Well as you know Node is a JavaScript runtime built on the V8 engine. A server is any program that waits for connections to the outside world, and which receives and transmits data over any formed connections. Often when we browse the Internet we're dealing with a browser that transmits data using HTTP, and which serves data that can be rendered in a web browser (HTML, CSS, JavaScript). However, servers are really free to communicate using whatever protocol they like. Often modern web pages are rendered using a mix of techniques. If you're listening to music on SoundCloud, one server might provide the content of the web page, and another server entirely might be responsible for streaming music.

### The command line
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

Pressing tab will engage tab completion. Different shells have different options for tab completion. In OS X _Terminal_ for example, pressing tab will complete a path element if available. Other shells like _Oh My Zsh_ will offer tab completion for things like git branches.

You can press the up arrow to start walking back through previous commands. You can also type `history` to view a list of previous commands.

Let's make a directory, in which we'll do all our work today.

```bash
mkdir pip-node 
cd pip-node
```

### Git

Git is an open source tool for version control. It wants to help you work on large, complex projects with multiple people all working on different parts at the same time. Git is organized around the notion of a commit. You do some work, which usually involves adding, moving, removing or updating files. You then commit that work, which attaches a hash identifier to that group of edits. 

- First thing to do is initialize this as a git repository.
```bash
git init
```
- If you do `ls -a` you should see a new directory called `.git`. Normally you won't need to touch this at all. Git should take care of everything going on here.
- Let's add a README.md file.
```bash
touch README.md
git status
```
- You should see an indication that git recognizes this file as new, but it hasn't been committed yet
```bash
git add .
git commit -m "Added a file README.md"
```
- This adds a commit to the current branch (you can always type `git status` to see which branch you're on).
- Let's switch to a new branch 
```bash
git checkout -b os-info
```
- Now let's add another file called os-info.js.
- Let's commit that file.
- Now if we wanted to, we could merge those changes back into the master branch
```bash
git checkout master
git merge os-info
```
- This will do a "fast forward" merge, because there are no changes on master.
- Now let's try making a merge conflict happen.
```
git checkout master
echo "This is the first line of the readme" > README.md
git commit -am "modified README on master"
git checkout os-info
echo "No, this is the first line of the readme" > README.md
git commit -am "modified README on os-info"
git checkout master
git merge os-info
```
- You'll see a merge conflict. Git will add some markers to the file that show you where the conflict is. You can modify the file as needed, and the add and commit it.

### Node + git

From the command line, you run Node like a program. `node somefile.js` will run the file called "somefile.js". Let's create a simple file that prints out some information about the operating system that we're running on.

- Switch over to the `os-info` branch
- Modify the contents of `os-info.js`
```js
const os = require("os"); // pull in the 'os' node module (part of node)

console.log(`Looks like you're running ${os.platform()} ${os.arch()}`);
```
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

```js
const chance = require("chance"); // load the chance module
const c = new chance(); // Create an actual chance instace. See the docs.

console.log(`Your new random name is ${c.name()}`);
console.log(`You live on ${c.street()} in ${c.state()}`);
```

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

### Templating
We'll look at templating in more detail in a later week probably, but you can hack your own templating using replacements and file loading. This will also allow you to use css in conjunction with `express.static`.

```js
// You can use replace to pretend like you're using React
app.get("/identity", (req, res) => {
    const newName = randomName();
    const newAddress = randomPlace();
    let htmldoc = fs.readFileSync("./templates/index.html", "utf8");
    htmldoc = htmldoc.replace("%%%NAME%%%", newName);
    htmldoc = htmldoc.replace("%%%PLACE%%%", newAddress);
    res.send(
        htmldoc
    );
});
```

### Temporary local state
Suppose you wanted to count the number of times that someone had visited your homepage. That's pretty simple, all you need to do is to create a local variable to store the number of times that someone has visited your page.

```js
let counter = 0;

app.get("/", (req, res) => {
    counter++;
    let htmldoc = fs.readFileSync("./templates/index.html", "utf8");
    htmldoc = htmldoc.replace("%%%VIEWS%%%", counter);
    res.send(
        htmldoc
    );
});
```

## Workshop: Set a name
Okay, for the workshop portion of the class, add another route to the page that lets the user set their name. Display their name on the homepage, if they've set it.

### Forms

You'll need to add a form to the page. A form looks something like this. 

```html
<!--Used to set user name. The action is the name of the express route. The name will be the name of the field in body-->
<form method="POST" action="/set-name">
    <label for="username">Enter your new name: </label>
    <input id="username" type="text" name="username" />
    <input type="submit" />
</form>
```

The important bits:
- `method="POST"` This is how the browser knows where to send the form data. This corresponds to an express route.
- `name="username"` This will be the name of the property defined in the post body.

### urlencoded

Before anything else will work, we need to tell express that we want to use the urlencoded middleware. This lets us get `username` out of `req.body` later.

```js
// server.js
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

// ... //

app.post("/set-name", (req, res) => {
    const suggestion = req.body.username;

```

### Components
This should be about all the info you need so:
- A new route with a form for updating user name
- A new route to handle the form submission (remember to use post!)
- Display the users name on the homepage (or anywhere else you fancy)

## Homework: Text Adventure

See [Homework 2](../../homework/01-node-hw.md)

## Student Reflections, Takeaways & Next Steps

### References
- [Node API](https://nodejs.org/dist/latest-v12.x/docs/api/)
- [Node require/resolve](https://nodejs.org/dist/latest-v12.x/docs/api/modules.html#modules_require_resolve_request_options)
- [Chance package](https://chancejs.com/)
- [Express](https://expressjs.com/)
- [Express User Agent](https://github.com/biggora/express-useragent/)

### Implementation Guidance & Teaching Reflection  
If you're teaching this class at a university, especially one where students are working with Node in other courses, they might already have Node installed on their machine. They might have installed it in way that conflicts with the strategy recommended in this class (nvm). In that case, you'll have to work with them to get their machine sorted out.

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***