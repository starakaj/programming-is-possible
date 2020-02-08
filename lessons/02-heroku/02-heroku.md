# Node, Part 2—Put it on Heroku

## Authors
Sam Tarakajian for NYU

@starakaj

## Essential Questions
- How can you render dynamic webpages? Also what is a dynamic webpage?
- How do you actually host a Node.js script somewhere?

## Introduction
This class is about taking Node out of production and putting it on the Internet. We'll talk about how to start building a website that has both a public face, intended to be viewed by a person, as well as an API, intended to be viewed by a machine.

### Outcomes & Goals
* In this class we will create a Node server that serves a dynamic webpage. The server will also have an API that another machine can use to interface with the program.
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
What hardware, software, or other materials will students or teachers need for lessons.

### Exercises To Do Before Class
What materials (readings, tasks, exercises) should students complete before class to be prepared for the lesson.

### Vocabulary (example)
* Program: A procedure, or set of instructions, that performs a specific task when executed by a computer. 
* Programming Language: The human-readable commands and syntax (or grammar rules) used to write programs. 

## Exercise Descriptions
Descriptions of each exercise or phase of class. Similar to pacing but with more description of steps.

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
Include any sources cited, but not directly linked in the unit.

### Implementation Guidance & Teaching Reflection  
e.g. Please provide some guidance based on experience delivering the unit and potential modifications might you are considering making for future iterations of this unit. This is an opportunity for you as the unit author to give teachers practical guidance.

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***