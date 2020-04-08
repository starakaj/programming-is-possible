const osmosis = require("osmosis");
const sbd = require("sbd");
const syllable = require("syllable");

function scramble(array) {
    for (let i = 0; i < array.length; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const tmp = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = tmp;
    }
}

function cleanText(text) {
    let cleanerText = text.replace(/\[[0-9]+\]/g, "");
    return cleanerText;
}

async function getText() {
    return new Promise((resolve, reject) => {
        let contents = [];
        osmosis.get("https://www.nytimes.com/2020/04/07/us/politics/trump-coronavirus-watchdog-glenn-fine.html") // Crawl this webpage
            .find("p") // Get all elements matching this CSS selector
            .set("contents") // Set the text contents of those elements to the "contents" property of an object
            .data(item => contents.push(item.contents)) // Pass that object to this function
            .done(() => resolve(contents)) // Call this when you're done
            .error(e => reject(e));
    });
}

async function firstWordsPoem() {
    const paragraphs = await getText();
    const firstWords = paragraphs.map(pg => {
        const firstSpace = pg.indexOf(" ");
        return pg.slice(0, firstSpace);
    });
    return firstWords.join(" ");
}

async function haikuPoem() {
    // 1. Get the text
    const paragraphs = await getText();
    let fragments = [];
    paragraphs.forEach(paragraph => {
        // 2a. Clean the paragraph
        const cleanParagraph = cleanText(paragraph);
        // 2. Split the paragraph into sentences
        const sentences = sbd.sentences(cleanParagraph);
        sentences.forEach(sentence => {
            // 3. Split the sentences by commas
            let pieces = sentence.split(",");

            // 3b. Filter pieces with numbers
            pieces = pieces.filter(piece => {
                return !(piece.match(/[0-9]+/g));
            });

            // Put those pieces into an array called fragments

            fragments = fragments.concat(pieces);
        });
    });

    // 4. Get 5 and 7 syllable pieces
    const fiveSyllableFragments = fragments.filter(fragment => syllable(fragment) === 5);
    const sevenSyllableFragments = fragments.filter(fragment => syllable(fragment) === 7);

    // 4b. Scramble the fragment arrays
    scramble(fiveSyllableFragments);
    scramble(sevenSyllableFragments);

    // 5. Make them into a haiku
    return [
        fiveSyllableFragments[0],
        sevenSyllableFragments[0],
        fiveSyllableFragments[1]
    ];
}

async function makePoem() {
    return await haikuPoem();
}

if (require.main === module) {
    // getText();
    makePoem().then(res => console.log(res));
}

module.exports = {
    makePoem
};
