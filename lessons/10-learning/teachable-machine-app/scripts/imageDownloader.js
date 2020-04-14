#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const osmosis = require("osmosis");
const fetch = require("node-fetch");
const mkdirp = require("mkdirp");
const { program } = require("commander");

program
    .option("-d, --dry", "Dry run--print what would happen but don't do it")
    .option('-r, --randomize', 'Randomize the order of downloaded images')
    .option('--count <count>', 'number of images to download', 100)
    .option('-o, --output <outDir>', 'Directory to write to', process.cwd())
    .option("--wnid <word-net-id>", "Source Word Net ID. Leave blank for random images")
    .parse(process.argv);

const stopAt = program.count;
const randomize = program.randomize;
const wnid = program.wnid;
const destPath = path.normalize(program.output);

const sysnetListUrl = "http://www.image-net.org/api/text/imagenet.synset.obtain_synset_list";
const imagenetRoot = "http://image-net.org/api/text/imagenet.synset.geturls?wnid=";

if (!!wnid) {
    const sourceUrl = imagenetRoot + wnid;
    console.log(`Downloading up to ${stopAt} images from ${sourceUrl} to ${destPath} in ${randomize ? "random order" : "nonrandom order"}`);
} else {
    console.log(`Downloading up to ${stopAt} Image Net images at random to ${destPath}`);
}

if (program.dry) process.exit(0);

// Try to make the output directory
mkdirp.sync(destPath);

if (!!wnid) {
    // download images from a particular wnid link
    (async function() {
        const pageUrl = imagenetRoot + wnid;
        const pageLinks = await getLinksFromImageNetPage(pageUrl, stopAt, randomize);
        await Promise.all(pageLinks.map(async link => {
            const pathname = (new URL(link)).pathname;
            const basename = path.basename(pathname);
            const filename = path.join(destPath, basename);
            try {
                await download(link, filename);
            } catch (e) {
                console.log("Could not download image from " + link);
            }
        }))
    })();
} else {
    // download images at random
    (async function() {
        const randomWNIDs = await getRandomImageNetLinks(stopAt);
        const randomLinks = randomWNIDs.map(wnid => imagenetRoot + wnid);
        await Promise.all(randomLinks.map(async link => {
            const pageLinks = await getLinksFromImageNetPage(link, 1, true);
            const pathname = (new URL(pageLinks[0])).pathname;
            const basename = path.basename(pathname);
            const filename = path.join(destPath, basename);
            try {
                await download(pageLinks[0], filename);
            } catch (e) {
                console.log("Could not download image from " + pageLinks[0]);
            }
        }));
    })();
}

// Shuffle an array in place
function scramble(array) {
    for (let i = 0; i < array.length; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const tmp = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = tmp;
    }
}

// Return an array of random Image Net links
async function getRandomImageNetLinks(count) {
    return getLinksFromImageNetPage(sysnetListUrl, count, true);
}

// Return an array of Image Net links from a page
async function getLinksFromImageNetPage(pageUrl, count, doScramble) {
    return new Promise((resolve, reject) => {
        let nidsText;
        osmosis.get(pageUrl)
            .find("body")
            .set("nids")
            .data(item => nidsText = item.nids)
            .done(() => {
                if (nidsText) {
                    let links = nidsText.split("\n");
                    if (doScramble) scramble(links);
                    links = links.slice(0, count);
                    links = links.map(link => link.trim());
                    resolve(links);
                }
            })
            .error((e) => reject(e));
    });
}

// Download the file at a uri to a location
async function download(uri, filename) {
    return new Promise((resolve) => {
        fetch(uri).then(res => {
            if (res.ok) {
                const dest = fs.createWriteStream(filename);
                res.body.pipe(dest).on("close", resolve);
            }
        });
    });
};
