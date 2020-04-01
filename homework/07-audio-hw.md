# Homework 07

## Due Date

This assignment follows the audio analysis lesson, [07-audio](../lessons/07-audio/07-audio.md). It must be turned in by midnight, March 31. 

## Reading

Optionally, watch this very fun interview with Tarik Barri - https://www.youtube.com/watch?v=xtKnF_9XM_o

## Assignment - Audio Visualizer

Take a look at this
https://willianjusten.com.br/audio-experiments/triangles/

This is a very simple, yet effective audio visualizer. A number of triangles rotates around a center point. The size of each triangle is proportional to the energy in a particular part of the audio spectrum. You could use the "loudness" feature of the Meyda analyzer, which contains a property called "specific". Each element of this array contains the apparent loudness of a different portion of the audio spectrum. So, you could use this feature to scale the radius of each triangle.

### Description

An audio visualizer creates an evolving and dynamic visual scene, parametrized in some way to reflect the salient features of an audio source. In the case above, the radius of each triangle is proportional to the energy in the spectrum. A visualizer could also draw on the chroma, or the spectral centroid, or any number of other features. For this assignment, make an audio visualizer, using either a microphone or sound file as an audio source.

### Requirements
One word of advice: try not to spend too much time on getting a specific piece of data out of the audio. There are problems like accurately detecting beat, or determining the exact point in time at which a new note begins, that can be very difficult and time consuming. Try to work with the data that you have available.

Requirements:
- You may use any graphics library that you like. If you're familiar with WebGL or another drawing technology, then feel free to use that instead of p5 in instance mode. However, you should write your own visualizer code. It's fine to be inspired by something that you find on shadertoy, but it's not acceptible to copy something that you found online for the visual portion of the assignment.
- You must use at least two of the analysis parameters exposed by Meyda.js.

You must also complete one of these optional requirements:
- Control the parameters of your audio visualization with dat.gui
- Add a way to switch between different audio tracks.
- Add a way to switch between different video "scenes." For example, you might have a p5 draw function that works in a completely different way, depending on the value of a toggle.

### Grading
Again, this is a creative assignment, but creativity is not part of the grade. I'm excited to see what you come up with, but it's most important to me that you complete the requirements. If it's clear that you spent a bit of time with the assignment, and that you worked with Meyda enough to come up with a visualization that you're happy with, then you have nothing to worry about.

## Handing it in
Please send me a link to a github repository where your visualizer can be found. I should be able to pull your repository, run `npm install`, and then start up a server and run your visualizer. Please don't forget to create a README.md, even if it only contains a single sentence. If there's anything special I should know about running your visualizer, please add it to the README. The README is also a great place to talk about any problems that you ran into, or to highlight any particular things that you're especially proud of. If your visualizer works best with a particular piece of audio, please include a link where I can find it, but don't add the audio file to your repository.
