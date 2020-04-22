# Final Project
Class consultation: May 29 in class
Due date: May 5, midnight

## Introduction
Oh my oh my how the last few weeks have just flown by. Here we are at the end. Take a breath, you've earned it. Now it's time for us to start working on our final project. The goal here is to challenge yourself, and to bring all of the knowledge and experience you've gained throughout this course to bear on something concrete. Think about what you'd like to say, what techniques you'd like to investigate, and how you're going to accomplish something complete in the short time you have.

I hope that this course has given you a greater understanding of how to achieve larger, more ambitious projects. We've focused on two areas: breaking large projects into modular pieces that can somehow communnicate, and software libraries that make sense of the world. For the final project, I'd like you to put those skills to the test.

## Description
- In this final project, you will be working with a partner or a small group to build a software and/or hardware system, containing multiple interlinking parts, that connects to some of the themes we've been exploring in this class.
- One major goal is to give you the chance to dive deeper into a particular subject or technique that interests you.
- It's also intended that you come away with solid documentation that you can use to share the project.
- Finally this project encourages you to work together as a team, leveraging each other's skills.

For the midterm assignment, we looked at how to build a system that brought data from a remote sensor to a client interface. That's an extremely flexible model for a large range of projects. In this final assignment, the only hard technical requirement is that your project involves at least two separate systems working together, with some kind of communication system between them. That could mean a web application, written in p5 or React, that communicates with a remote server. It could be a game written in Unity that sends images to a Node server running a neural network. It could be a Max/MSP patch that communicates with an arduino. Again, the hard requirement is that there is some communication layer that can clearly separate the parts of the system.

If you still have the Raspberry Pi from earlier in the semester, you're welcome to use it here!

## Essential Questions
- How does hardware and software fit into a creative project?
- What libraries are interesting to you?
- How much can really be accomplished in two weeks?
- How will you work together?

## Working as a group
Given the fact that everyone will be working remotely for the rest of the semester, I thought about letting people work alone on this project. However, I've decided to stick to the original plan of asking people to work together. For this assignment, I'm asking you to work in groups. You can work in pairs, or even in a group of seven if you really want to, though the project you take on should be one that really requires seven people working together. I really want you to think about how to work on a large project like this as part of a team. Think back to the midterm assignment. What went well? What didn't go so well? How do you think you could work more effectively as a distributed team?

- How often will you have meetings? Who will facilitate those meetings?
- How will you stay in touch while working? Email? Slack?
- How will you manage the challenges of asynchronous communication? If you tell someone you need something over email, how soon should you expect a response?
- How can you support each other while working?
- What kinds of things do you need to communicate to the rest of the team while working?

## Example Projects
- A website that lets users play a collaborative online game.
- A "quantified self" project. If you have a Raspberry Pi or some other kind of microcontroller, you could use this to log some information about your daily routine. This information could be presented in a web interface.
- An interactive Twitter bot that writes automatic poetry.
- An automated Instagram account that generates audio visualizations with segments of popular music.
- An automatic watering system. A Raspberry Pi could control an watering pump depending on soil moisture levels. The moisture level should be viewable from an online interface.
- A drawing app that uses machine learning to augment the drawing interface.
- Using Twilio, an application that lets you text messages to a web server. Those messages could become graffiti on a collaborative, virtual wall.
- A website that lets people record short segments of them singing. Those segments are stored together and analyzed on a server, then presented as automatic choral arrangements. 

## Deliverables
This project is more than just the code. I want to understand why you chose the project that you did, and I want you to have documentation that expresses what's exciting about your project to the outside world. So the three deliverables for this project will be the code, the demo presentation, and online documentation.

### The code itself
All the code that you write for this project should go into a public repository. All of your code can be in one repo, or you can use more than one. You can use Github, Bitbucket, or whatever else you like, so long as I can get the code and look at it. Part of your grade for this assignment will come from the quality of the code itself. I hope that doesn't sound scary-I'm not going to dock you points if your code is a little messy or if you accidentally use `let` when you should have used `const`. I'm more interested in high level organization. For example:

- Does the repository have a README? Does it document clearly and succinctly what I need to know about the project?
- If the repository contains multiple applications, say a client and a server, are they in separate folders? Or is the logic all mixed together?
- Have you split up your files and classes in a way that makes sense? Or is everything kind of mashed together into one giant file?

Honestly, all of this will happen naturally if you organize your code in a way makes sense to your team. If you're all able to look at the code base, and you can all understand why it's laid out the way it is, then I have no doubt that you'll get full marks for the organization of the code.

Finally, the code should be of a complexity appropriate for a two-week project.

### Demo presentation
In class on May 6th, each team will do an in-class demo and presentation on their project. You don't have to use slides, or even any kind of visual aid, but it will probably be extremely helpful for organizing your thinking and presenting it clearly. An outline for a good presentation might look something like this:

- Introduction: the name of the project, one-sentence summary
- Project demonstration
- Motivation: why did you choose this project, why is it important to you?
- Overview: how does the project work, what processing steps does it go through?
- Structural description: what are the parts of the project, how do they communicate?
- In-depth dive: for each part of the project, how does it work? What technologies did you use?
- Group work: how did you all work together? How did you divide up the work? How did you communicate?
- Next steps: with more time what would you work on next? What weren't you able to finish?
- Q&A

To offer some more feedback and support, I'll be inviting a couple of guest critics. Really excited to see what you all come up with!

### Online documentation
In addition to the presentation and the code, the project should be documented somewhere online. The kind of information that you put online is mostly up to you, but the same kind of content that went into the presentation is probably appropriate here. Try to keep the audience in mind. They might have more or less technical skill than your class peers. THey might also not have very much time to devote to learning about your project, so you'll want to present the main points clearly and succintcly. Finally, it's nice to use different kinds of media together to tell a story about your project. You can use text in combination with images and video to make the documentation more engaging and informative.
