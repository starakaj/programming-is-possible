Teachable Machine Scaffold
===========================

This app is a very small scaffold to get you started using Teachable Machine. It will require an internet connection to work, since it loads ml5 as well as TensorFlow from a CDN.

## Basic Usage

```
npm run watch
```

will start a webpack server at localhost:3000. From the browser you'll be able to see a simple example that recognizes "heart hands," or when you make your hands look like this ![Heart Hands](https://image.shutterstock.com/image-photo/woman-making-heart-her-hands-600w-1211985307.jpg)

If you want to see the sound recognition or drawing recognition examples, you'll need to comment out the appropriate line in `app/app.js` to change which `setup` function is loaded.

## Running the downloader

This starter includes a script that you can use to download images off of Image Net. To download 100 random images to a directory called `data/random` you could run

```sh
npm run images -- -o data/random
```

If you wanted instead to get 100 images with a particular wnid, then you'd execute something like this:

```sh
npm run images -- -o data/red-panda --wnid n02509815 --randomize
```

Which will download 100 images of a red panda. The `--randomize` flag tells the downloader whether to download the first 100 images, or to scramble the list of images first. You can also use the `--count` flag to limit or increase the number of images downloaded. Note that many links in Image Net are broken, and you may see errors in the console while downloading.

## Attribution
A long time ago this was a starter on Glitch using React and Webpack. It was copied by @starakaj, and then React has been removed You can find the original at https://glitch.com/~starter-react.

This project relates to video 2 of 5 in the [React Starter Kit](https://glitch.com/react-starter-kit) video series.
