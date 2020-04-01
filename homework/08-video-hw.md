# Homework 08

## Due Date

This assignment follows the video analysis lesson, [08-video](../lessons/08-video/08-video.md). It must be turned in by midnight, April 7. 

## Reading

None, just relax.

## Assignment - Video into sound, or video into drawing
In class we looked at two example of how to process video, one generating sound and the other creating a visualization. For this assignment, develop one of those processes further. If you've worked with Tone before, or you're more interested in sound, you can pursue that path. Otherwise you can do more drawing based on video data.

### Description
If you choose to do some drawing based on video analysis, you might start from the optical flow example that we looked at in class. You're also free to take another one of the Computer Vision examples from Kyle's page and to start from there. If you'd rather work from face data instead, start from the face tracking example. Rather than sending out particles from the points of optical flow, do something else. Things you might experiment with:

#### Video
- Drawing text based on movement
- Distorting a shape using video movement
- Directing a swarm of particles using the edges in the video
- Giving the video an animated color depending on movement
- Making an "instagram filter" by drawing shapes or images on top of the face

#### Audio
- Add an audio effect to the processing chain, like reverb, filter or distortion. Control this with the face or with movement.
- Control the playback of an audio file using the video, perhaps adjusting its speed using the position of your face.
- Play a chord of multiple different notes. Maybe one note is controlled by each eye, and a third with the mouth.

### Requirements
There are no hard requirements for this assignment, except that it must use Computer Vision in some way. So, it could be based on one of the CV examples from Kyle's page, or it could use the face tracking data from the ml5 example. You should also try to go beyond simply tweaking what we did in class.

### Grading
Again, this is a creative assignment, but creativity is not part of the grade. I'm excited to see what you come up with, but it's most important to me that you complete the requirements. If it's clear that you spent a bit of time with the assignment, and you experimented with something new, then you have nothing to worry about.

## Handing it in
Please send me a link to a github repository where your project can be found. I should be able to pull your repository, run `npm install`, and then start up a server and run the example. Please don't forget to create a README.md, even if it only contains a single sentence. The README is also a great place to talk about any problems that you ran into, or to highlight any particular things that you're especially proud of. If you're doing some kind of complex audio mapping, please describe what you were trying to achieve in the README.
