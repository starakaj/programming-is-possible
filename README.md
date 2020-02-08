# Programming is the Art of the Possible

> “Politics is the art of the possible, the attainable — the art of the next best” - Otto von Bismarck

This is a second semester creative coding course, designed for students who have a strong JavaScript foundation. The central goal for this course is to help students graduate from coding as a technical skill to programming as a situated practice. Programming is writing code with other people, for a particular use, within a tangled web of humans, nature, software and hardware—this is the situation in which programming finds itself.

A major theme in this course will be "ongoingness" in programming projects, or how to maintain a project in such a way that it's clearly expressed to its audience, well documented for new developers, and clear enough to be built on in the future. We'll see that theme expressed in three major domains: working with other programmers across large projects, incorporating diverse libraries and APIs, and considering the social impact of programming.

In the first half of this course, we'll build an end-to-end system incorporating a deployed Node server, a front-end client for retrieving data from that server, and a Raspberry Pi that gathers data for the server. Different student teams will be responsible for different parts of the system, and will have to work together to smoothly integrate their individual work. In the second half of the course we'll look at different libraries and APIs, before putting all our accumulated experience together in a final project.

One semester of JavaScript programming experience is required. Technologies that we'll use in this course include Node, Heroku, Express.js, React.js, Raspberry Pi, MongoDB, OSC, ml5, Runway.ai, Syphon, Wekinator, Bela, Meyda.js, and more.

## Info

This class is DM-GY 6063. I am Sam Tarakajian. You can reach me at st2774@nyu.edu.

## Office Hours

Office hours will be Mondays from 3pm-5pm. You can find me in the IDM Adjunct Office (370 Jay Room 344). Let me know if you can't make it and we'll arrange something via Hangouts.

## Course Work

Work for this course will consist of a [midterm project](lessons/06-midterm/06-midterm.md), a [final project](lessons/12-final/12-final.md), and weekly reading and programming assignments. Students are encouraged to work together and to help each other through programming assignments, but each student must submit their own work. Submissions will be made through GitHub—each programming assignment can be its own repository, or one repository can contain all the course work for this course (please reach out right away if you're unsure what this means or how to use GitHub). We'll be using the QCQ technique for reading assignments: for each reading assignment, you must come up with a Question, a Comment and a Quote. These will not be collected, but you may be asked to share them during class discussion.

## Schedule

Just to say that this is more of a road map, and we may (likely will) deviate from it along the way.

### [Week 1 — Intro](lessons/00-intro/00-intro.md)
We'll spend some time getting to know each other, talking about the course objectives, and the structure of the course. We'll also have discussions about topics related to programming. What is a protocol? What is an interface? What is an encoding? What happens to information as it passes along these channels? We may also do some Node review, to as a warm up.

### [Week 2 — Node + Git + Express](lessons/01-node/01-node.md)
This will be a fairly fast-paced class, since most of the early part of the class should be review. We'll talk about how to set up a git repository, how to make commits and synchronize git with a remote. We'll write a simple node server, using express to handle routes. 

### [Week 3 — Heroku + React](lessons/02-heroku/02-heroku.md)
This week we'll dip our toes into client-side programming, looking at React and at deploying a web interface using React. To get used to the mechanics of React we'll build a project on glitch.com, before using React in our own Node server for server-side rendering. Finally, we'll add a Procfile to deploy the whole thing to Heroku.

### [Week 4 — Persistence](lessons/03-persistence/03-persistence.md)
This week we'll return to the backend to add some CRUD to our server. We'll talk about REST and how strongly people feel about it. We'll install MongoDB on our machines and implement a server that can actually hold on to data. Finally, we'll deploy all of that to Heroku for data that persists on a web server.

### [Week 5 — Raspberry Pi](lessons/05-raspberry/05-raspberry.md)
With all the pieces we've built to far, we're ready to put some interesting data onto our servers. This week we'll get out a Raspberry Pi and start programming it. Each Raspberry Pi will be equipped with some kind of data-gathering device, and we'll see how to upload data from our Raspberry Pi to our server.

### [Week 6 — Midterm](lessons/06-midterm/06-midterm.md)
It's time to integrate everything that we've learned so far. We'll split into teams, with each focusing on a different part of the client-server-sensor stack. After a discussion on software architecture, we'll talk a bit about how to organize our code. We'll spend the rest of class working on the code.

### Week 7 — Midterm Part 2 + Presentation
There will be a bit of time in this class to iron out last minute changes to the code, and then we'll demo the whole system. We'll debrief, talking about what worked, what didn't and what we could do differently next time. Each team will get the chance to present on the technologies that they used to get the project done.

### [Week 8 - OSC + Interapp Routing](lessons/07-osc/07-osc.md)
Here the course switches gears a bit, and we start to discuss working with different libraries. The goal is to start generating ideas about a final project, so this will be when the final project prompt is given, even though we won't start on it for a few weeks. In this class we'll focus on OSC (Open Sound Control) and UDP. We'll talk about the difference between UDP and TCP, which is academic but still fun. Maybe we'll write something crazy, like something that scripts Illustrator using OSC.

### [Week 9 - Audio + Video Analysis](lessons/08-av/08-av.md)
There are a ton of tools available for doing audio and video analysis. The particular pieces of software that we look at will depend on the skills and interests of the class, but the underlying concepts will be the same throughout. In the sound domain we'll look at envelope, spectrum, pitch class, spectral centroid and cepstral coefficients. Switching to video, we'll talk about color, points of interest, optical flow, facial recognition and pose tracking. Potential technologies  include medya.js, max/msp, and others.

### [Week 10 - Natural Language](lessons/09-language/09-language.md)
Extracting information from written and spoken language is the challenge of natural language processing, or NLP. We'll take a survey of some technologies, and talk about how to connect these tools to other programs for visualization and further contextualization.

### [Week 11 - Machine Learning](lessons/10-learning/10-learning.md)
Having talked a bit about knowledge representation and feature vectors during the natual language module, we'll be ready to dive into machine learning more generally. We'll talk about how to get started with tools like ml5.js and TensorFlow.js, which make it much easier to work with neural nets. 

### [Week 12 - Gesture Analysis](lessons/11-gestures/11-gestures.md)
Rounding out the second half of the course, we'll talk broadly about gesture analysis. We'll use an ML tool called Wekinator to experiment with classifying and parametrizing gestures. Then, we'll see how to connect those classifications to systems for generating video and sound. Hopefully we'll get a Leap Motion or some other gesture analyzing system that we can play around with as well.

### [Week 13 - Final Project Proposals](lessons/12-final/12-final.md)
Similar to the workshop, the final project should be large enough to require a group effort. The goal for the final project is to build a system that communicates an effective idea by using multiple technologies in concert. Different members of the group are allowed and encouraged to work on different parts of the project. After proposals, there will be time to work on the project in class.

### Week 14 - Final Project Presentation
In the last class we'll share our group work. Final project presentations will include an in-class demo, as well as a brief presentation. This presentation should focus on the technical and social choices that the group made while realizing their work. Lastly, the final project will include online documentation, communicating the scope of the project, in addition to making relevant parts of the code available.

## Policies

### Evaluation
You are required to attend all class meetings and submit all weekly assignments and a final project. You are also required to do the weekly reading and to prepare for in-class discussion.

Grading will be based on a combination of factors:

Attendance, participation in class discussion, and engagement in other students' projects (40%)
Programming Assignments (20%)
Midterm Project (20%)
Final Project (20%)

Attendance is mandatory. Please inform your teacher via email if you are going to miss a class. Two unexcused absences is cause for failing the class. (An unexcused lateness of 10 minutes or more is equivalent to 1/2 an absence.)

This class will be participatory, you are expected to participate in discussions and give feedback to other students both in class and participate with their projects. This (along with attendance) is 40% of your grade. There will be weekly reading assignments. We'll be using the QCQ technique for these assignments: for each reading assignment, you must come up with a Question, a Comment and a Quote. These will not be collected, but you may be asked to share them during class discussion.

Programming assignments should be completed before the class in which they are due and uploaded to GitHub. Students are encouraged to work together and to help each other through programming assignments, but each student must submit their own work. Each programming assignment can be its own repository, or one repository can contain all the course work for this course (please reach out right away if you're unsure what this means or how to use GitHub).

The midterm project will make up 20% of your grade. The midterm will include a programming component and a presentation component. The programming component should work in concert with the pieces submitted by the other groups. The presentation component will detail the tech choices you made and your working strategy. More information will be released when the midterm is assigned.

Class will culminate with final projects. You are expected to push your abilities to produce something that utilizes what you have learned in the class that is useful in some manner to yourself or the world. This will comprise 20% of your grade.

### Statement of Academic Integrity
Plagiarism is presenting someone else’s work as though it were your own. More specifically, plagiarism is to present as your own: A sequence of words quoted without quotation marks from another writer or a paraphrased passage from another writer’s work or facts, ideas or images composed by someone else.

### Statement of Principle
The core of the educational experience at the Tisch School of the Arts is the creation of original academic and artistic work by students for the critical review of faculty members. It is therefore of the utmost importance that students at all times provide their instructors with an accurate sense of their current abilities and knowledge in order to receive appropriate constructive criticism and advice. Any attempt to evade that essential, transparent transaction between instructor and student through plagiarism or cheating is educationally self-defeating and a grave violation of Tisch School of the Arts community standards. For all the details on plagiarism, please refer to page 10 of the Tisch School of the Arts, Policies and Procedures Handbook, which can be found online at: http://students.tisch.nyu.edu/page/home.html

### Statement on Accessibility
Please feel free to make suggestions to your instructor about ways in which this class could become more accessible to you. If you are student with a disability who is requesting accommodations, please contact New York University’s Moses Center for Students with Disabilities at 212-998-4980 or mosescsd@nyu.edu.  You must be registered with CSD to receive accommodations.  Information about the Moses Center can be found at
www.nyu.edu/csd. The Moses Center is located at 726 Broadway on the 2nd floor.

### Statement on Counseling and Wellness
Your health and safety are a priority at NYU. If you experience any health or mental health issues during this course, we encourage you to utilize the support services of the 24/7 NYU Wellness Exchange 212-443-9999. Also, all students who may require an academic accommodation due to a qualified disability, physical or mental, please register with the Moses Center 212-998-4980. Please let your instructor know if you need help connecting to these resources.

### Statement on use of Electronic Devices
Laptops will be an essential part of the course and may be used in class during workshops and for taking notes in lecture. Laptops must be closed during class discussions and student presentations. Phone use in class is strictly prohibited unless directly related to a presentation of your own work or if you are asked to do so as part of the curriculum.
