const osmosis = require("osmosis");
const sbd = require("sbd");
const syllable = require("syllable");
const pos = require("pos");
const tagger = new pos.Tagger(); // We only need one
const lexer = new pos.Lexer(); // Again, only one needed
const rhyme = require("rhyme");

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
        osmosis.get("https://www.nytimes.com/2020/04/07/opinion/trump-coronavirus-press-conference.html") // Crawl this webpage
            .find("p") // Get all elements matching this CSS selector
            .set("contents") // Set the text contents of those elements to the "contents" property of an object
            .data(item => contents.push(item.contents)) // Pass that object to this function
            .done(() => resolve(contents)) // Call this when you're done
            .error(e => reject(e));
    });
}

async function loadRhymingDictionary() {
    return new Promise((resolve) => {
        rhyme(r => resolve(r));
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

async function posPoem() {
    const paragraphs = await getText();
    const posTags = [ 'VBG' ]; // This is the tag for a gerund
    const gerunds = [];

    paragraphs.forEach(pg => {
        const sentences = sbd.sentences(pg);
        sentences.forEach(sentence => {
            const lexes = lexer.lex(sentence);
            const tags = tagger.tag(lexes);
            tags.forEach(lexpair => {
                // If we want to collect this part of speech
                if (posTags.includes(lexpair[1])) {
                    // Exclude duplicates
                    if (!gerunds.includes(lexpair[[0]])) {
                        gerunds.push(lexpair[0]);
                    }
                }
            });
        });
    });

    // Now we can do something fun with square numbers. If we take the 
    // square root of the length of gerunds and floor it,  we know we'll have 
    // enough to print a staircase of length n
    // For example
    // running
    // jumping swimming
    // climbing singing shouting
    // fishing throwing
    // sleeping
    // would be a staircase poem
    const staircaseLength = Math.floor(Math.sqrt(gerunds.length));
    scramble(gerunds);
    let lines = [];
    let maxLineLength = 1;
    let countingDown = false;
    for (let i = 0; i < staircaseLength * staircaseLength;) {
        let thisLine = [];
        for (let j = 0; j < maxLineLength; j++) {
            thisLine.push(gerunds[i + j]);
        }
        lines.push(thisLine);

        // Max line length increases until we get to the middle
        i += maxLineLength; // move i over by the length of the current line
        maxLineLength += countingDown ? -1 : 1;
        if (maxLineLength === staircaseLength) {
            countingDown = true;
        }
    }

    return lines;
}

async function rhymingPoem() {
    const paragraphs = await getText();
    const rhymingDictionary = await loadRhymingDictionary();
    const rhymeGroups = {};

    // Assume fragment is an array of words
    function storeFragment(fragment) {
        let lastWord = fragment.slice(-1)[0];
        let pronunciations = rhymingDictionary.pronounce(lastWord);
        if (pronunciations && pronunciations.length > 0) {
            // Assume that the rhyme class is the last three phonemes
            // This isn't really true, but it's a decent approximation
            const rhymeClass = pronunciations[0].slice(-3).join(" ");

            // If we've never encountered a word like this, create a new array
            if (!rhymeGroups[rhymeClass]) rhymeGroups[rhymeClass] = [];

            // Push this fragment into the array
            rhymeGroups[rhymeClass].push(fragment);
        }
    }

    // Go through the paragraphs, chop them into fragments and store them
    paragraphs.forEach(pg =>{
        const cleanParagraph = cleanText(pg);
        const sentences = sbd.sentences(cleanParagraph);
        sentences.forEach(sentence => {
            let lexes = lexer.lex(sentence); // Use this to get an array of words
            for (let i = 0; i < lexes.length - 5; i++) {
                let fragment = lexes.slice(i, i + 5);
                storeFragment(fragment);
            }
        });
    });

    // Some of the rhyme classes won't be useful. They're too short and they contain
    // only duplicates
    let goodKeys = Object.keys(rhymeGroups);
    goodKeys = goodKeys.filter(key => {
        const lastWords = rhymeGroups[key].map(fragment => fragment.slice(-1)[0]); // Get the last word of each fragment
        // Make sure that they're not all the same
        return !lastWords.every(word => word.toLowerCase() === lastWords[0].toLowerCase()); 
    });

    // Now we're equipped to build our poem
    // This function gets a rhyming couplet
    function getCouplet(goodKeys, rhymeGroups) {
        scramble(goodKeys);
        const rhymingFragments = rhymeGroups[goodKeys[0]];
        scramble(rhymingFragments);
        const fragment1 = rhymingFragments[0];
        const fragmentsWithADifferentLastWord = rhymingFragments.filter(fragment => {
            return fragment.slice(-1)[0].toLowerCase() !== fragment1.slice(-1)[0].toLowerCase();
        });
        scramble(fragmentsWithADifferentLastWord);
        const fragment2 = fragmentsWithADifferentLastWord[0];
        return [fragment1.join(" "), fragment2.join(" ")];
    }

    // Uncomment if you'd rather write an elizabethan sonnet
    // const lines = [];
    
    // for (let i = 0; i < 3; i++) {
    //     const coupletA = getCouplet(goodKeys, rhymeGroups);
    //     const coupletB = getCouplet(goodKeys, rhymeGroups);
    //     lines.push(coupletA[0]);
    //     lines.push(coupletB[0]);
    //     lines.push(coupletA[1]);
    //     lines.push(coupletB[1]);
    // }

    // const couplet = getCouplet(goodKeys, rhymeGroups);
    // lines.push(couplet[0]);
    // lines.push(couplet[1]);

    // return lines;

    return getCouplet(goodKeys, rhymeGroups);
}

async function makePoem() {
    return await rhymingPoem();
}

if (require.main === module) {
    // getText();
    makePoem().then(res => console.log(res));
}

module.exports = {
    makePoem
};
