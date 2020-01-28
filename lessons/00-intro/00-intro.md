# Intro: Programming is the Art of the Possible

## Authors
Sam Tarakajian for NYU IDM

DM-GY 6063

@starakaj

## Essential Questions
- What is this class all about?
- What is a protocol? An interface? An encoding?
- Where do these show up in our everyday lives?
- What does it mean to learn programming?

## Introduction
In this introductory class, we'll spend a little time getting to know each other, as well as discussing what this course is all about. There will be an exercise to prime our understanding of the major course themes of interface, protocol, and encoding.

### Target Audience / Prerequisite & Pre-Assessment
This course is intended for students at the undergraduate or graduate level who have completed an introduction to programming. The primary programming environment used in this course is Node, so familiarity with JavaScript or a C-like programming language is a big positive. However, the course will draw on a wide skillset, so proficiency in another language or environment is helpful.

### Outcomes & Goals
* A major goal of this course is to teach students how to manage larger software projects. We will be using Node.js, but we will learn skills that translate to any language or environment.
* A subtheme for this course is cybernetics and management between and among human and machine entities.
* Students will walk away with real-world skills like hosting a project on GitHub, making pull requests, organizing tickets, writing documentation, and working with a development team.
* Students will also learn to think critically about information systems.

### Pacing / Duration
- 0:10 - Welcome to class, introductions, how the class works
- 0:20 - Discussion, what makes a program good? What is an elegant program? What is an efficient program? Is a program a math formula? Is a program an essay? When we write a program, who are we writing it for?
- 0:20 - Discussion, what is a protocol? An encoding? An interface? What is the Kyoto Protocol? What is the Hyper Text Transfer Protocol? What is an API? What is an API for? If you order 50 pizzas to your friends house, does that make you a hacker? What if you do it in person? What if you use the command line?
- 0:05 - Quick break
- 0:50 - Exercise, making ourselves into a protocol. Can we set up a protocol right here in class? Divide into two teams. Each team divides into two groups. Group A gets a prompt for something to draw. They can only communicate with Group B by showing them one of three cards. The goal is to get group B to draw the prompt as accurately as possible. Group B has one card that they can use to communicate back. You have 15 minutes to work out how you're going to do it.
- 0:20 - Let's talk about the methods that each group came up with. What parts were an encoding? A protocol? An interface? How did you deal with the fact that you had to express omething complex using a very limited alphabet? What was the biggest strength of your particular choice. The biggest drawback? What shared assumptions did you and the drawing group had, that made things easier or harder?
- Whatever's left - Start getting set up for the next class.

## Materials Needed
- Laptop
- Internet connection

### Vocabulary (example)
* Interface: 
* Protocol:
* Encoding: 

## Class Script
I don't plan to write detailed notes for most of these classes, but for this first one there's a lot to say. Hence these somewhat detailed notes. If you're teaching this class yourself, you can of course say whatever you want here, adding your own examples and subtracting as much of what I've written here as you like. For this intro to fit with the rest of the course, some key bits should remain:

- Programming in this course refers to situated coding, or coding in the real world.
- This course will strengthen your ability to write programs with ongoingness—that other people can pick up use.
- Using code could mean continuing an open source project, appreciating a work of art, or joining a team.

### Introductions
We can start by going around and introducing each other.

This course is called "Special Topics in Digital Media" which is almost definitely a way for both the school and for me to say that we don't really have a good name for what this course is about. If you look on the GitHub, you'll see this quote to open the course "Politics is the art of the possible, the attainable — the art of the next best."

It might help to know that I'm not really an academic or an artist, though I've been working with academics and artists for ten years now. If there's one thing that's helped me organize the material for this course, it's the idea that the best way to learn to program is to do lots of programming. I want to try to give you the best of what ten years of working as a programmer has given me, in terms of an awareness of what programming is and how to do it well. This is the first time I've taught this course, the first time I've taugh at this school, and the first time I've taught this material. I'm hoping that we can work together. I'm imagining this being a bit like a senior-developer to junior-developer type relationship. I'm sure there's lots of things you know that I don't, and hopefully over the next few weeks we'll all grow a lot together.

In the course title I've substituted the word "programming" for the word "politics," not to say that with progamming you never get anything real done. Rather I'm interested in drawing this distinction between coding as an area of study and programming as a discipline. It's a relationship that's sort of like geometry and architecture. When you project coding down into the real world, you get programming, which I think of like situated coding. My thesis for this course, which hopefully I can convince you of by the end, is that this difference between coding and programming is more than just _pure_ versus _real_ or _clean_ vs _dirty_. Programming isn't diminished or restricted by being in the world. Rather, it draws power from its entanglements. It entangles itself with programmers, customers, audiences, society, culture, and other programs.

One way we'll see that entanglement is with each other. There are two big assignments in this course, the first being your midterm assignment. My goal for that assignment is to give you all something to work on that's too big for any one group to finish by themselves. So, each group will work on a piece of the assignment in parallel. Before you complete the assignment, we'll put the pieces together and demo the whole system working in concert. In order to work on the assignment, you'll have to figure out how to work with each other. How can one team test the interaction with another part of the system, before that part is finished? How will you test your ability to work with data, before any data has been gathered?

In the second half of this course, we'll start looking at different ways that computers can measure and manipulate data. Programming involves writing software that works with other programs. Programs expose their capabilities through interfaces, and communicate with each other using protocols. We'll look at protocols like UDP, OSC, Websockets, MIDI and Link; we'll also investigate data analysis frameworks dealing with audio, video, language, gesture, and generalized machine learning.

Throughout the course, there will be reading assignments that are chosen to get you thinking about how programming impacts the world. Programming is situated coding, and that situation includes human society and culture. Some of this reading will talk about beneficial changes that programming brings to society. Some will challenge the idea that certain technologies are always good. Some will simply reflect on what programming is, and how concepts from programming mirror our own experince as human beings.

That, in a large nutshell, is what this course will be all about.

### What makes a program good?

Okay, I want to start with a discussion: what makes a program good? Let's look at a case study. This is a game called VVVVVV. Maybe you've played it. It's about jumping around a space station. As far as I can tell it's quite beloved.   According to Anthony Burch on Descructoid, VVVVVV is "untarnished videogame ecstasy".

VVVVVV is interesting because the developer has recently released the source code. It's doubly interesting because, according to a lot of people who have looked at the code, it's somewhat dubious. "VVVVVV is not a technically sophisticated game! Even by the standards of self taught indie devs, it’s kind of a mess," says the creator.

Someone pointed out this particular function, involving a several-hundred case switch stetement for determining the state of the game https://github.com/TerryCavanagh/VVVVVV/blob/12497f6478149e1c57191837316cd2462bf7b1ec/desktop_version/src/Game.cpp#L692.

So, all together we have:
- The game is, on some level, good. Foremost, it actually released, which is itself an accomplishment. Further, it's well liked and relatively stable.
- Something about the code is off. Looking at the code, we feel like we could improve its organization.

Is this a good program?

Let's look at another example. This is from the original Quake source code, maybe you've seen it before.

```c
float Q_rsqrt( float number )
{
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

	return y;
}
```

This code returns an approximation to an inverse square root, which is important when calculating lighting. It's faster than computing the equivalent using floating point arithmetic (at least on older hardware). At the same time, it involves some very difficult to understand math that depends on the underlying hardware. So, let's cast two things in tension:

- This code works. It got Quake released, and it wouldn't have been possible without this code.
- Imagine there was a bug in this code. If you were hired to fix the code and you hadn't worked on the original, how would you feel?

Given those two things, is this a good program?

One last example, take a look at this

```re
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

Can you guess what this does? This is the General Email Regex from RFC 5322, the Internel Message Format specification. It matches valid emails 99.99% of the time.

Is this a good program?

## Protocol, Interface, Encoding

Okay, let's keep discussing but I want to change gears a bit. Let's tal

## Student Reflections, Takeaways
TBD

## Post Session aka Homework

### Installation
Make sure that you come to the next class with Node, NPM and Git installed on your machine (see installation instructions). Make sure you have an account on github. If you hate github for some moral or philosophical reason, talk to me and we'll figure out how to use some other host.

### Reading
- https://www.sametab.com/blog/frameworks-for-remote-working

### References
TBD

### Implementation Guidance & Teaching Reflection  
TBD

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***