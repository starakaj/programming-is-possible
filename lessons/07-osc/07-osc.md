# OSC, UDP and IPC (alphabet soup the class)

## Authors
Sam Tarakajian for NYU IDM

DM-GY 6063

@starakaj

## Essential Questions
- How do programs communicate with each other?
- What is the difference between TCP and UDP?
- What can we accomplish by making programs work together?
- Wnat is Link?

## Introduction
Interacting with hardware and software, we sometimes expect different pieces to be in communication. We expect our phone to sync contacts with our desktop. We expect our browser to connect to the internet. However, in many other cases each program is like its own walled garden. If we're composing music in Logic, we don't really expect to be able to synchronize our music with something happening in Photoshop. Usually that's not a problem, but often when we're trying to do something unique and creative, it's useful to be able to make programs communicate with each other.

OSC stands for Open Sound Control, but the protocol is not limited to sound and in fact is extremely useful in a number of situations that have nothing to do with sound. Since it's built on top of UDP, OSC can be much lower overhead than HTTP or other communication protocols. It makes it super useful for defining interesting and complex interaction when we have the skill to write just a bit of our own code.

### Target Audience / Prerequisite & Pre-Assessment
This module is part of DM-GY 6063, _Programming is the Art of the Possible_. This is a second semester creative coding course, designed for students who have a strong JavaScript foundation.

### Outcomes & Goals
* In this workshop we'll be working with OSC to define communication between two unlikely programs. Along the way, we'll see how to start a UDP server, as well as how to format and route messages.
* Students will walk away with a deeper understanding of how programs communicate. They'll also be empowered to create their own complex systems involving multiple programs on their own machine.

### Pacing / Duration
TBD

## Materials Needed
TBD

### Exercises To Do Before Class
TBD. Maybe there's a document on OSC that they can read or something.

### Vocabulary
* Protocol - A guideline for interaction that preserves an invariant. TCP and UDP protocols allow endpoints to consume a series of bits while preserving sensible communication.
* UDP - User Datagram Protocol is an internet protocol like TCP, with some major differences. UDP is optimized for speed of transmission, so their are no guarantees that packets will arrive in order, or at all. Further, UDP doesn't need a bound connection for transmission.
* OSC - Open Sounds Control is a protocol built on top of UDP. Inspired by MIDI, it allows endpoints to communicate with typed, timestamped and addressed data.
* Address - The intended destination of an OSC packet (or any other packet)
* Socket - A point of connection between two endpoints (better definition).

## Exercise Descriptions
TBD

## Student Reflections, Takeaways & Next Steps
TBD

## Post Session

### References
TBD

### Implementation Guidance & Teaching Reflection  
TBD

***With thanks and acknowledgement, this is based on the template provided by [Eyebeam](https://github.com/eyebeam/curriculum/blob/master/TEMPLATE.md)***