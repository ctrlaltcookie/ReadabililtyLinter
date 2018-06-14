const Syllable = require('syllable');
const FleschKincaid = require('flesch-kincaid');
const AutomatedReadability = require('automated-readability');
const ColemanLiau = require('coleman-liau');
const fs = require('fs')

const singleDoc = (path) => {
  const doc = fs.readFileSync(path, 'utf8');

  const words = doc.match(/\w+/g);
  const sentences = doc.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
  
  let characters = 0;
  let syllables = 0;
  words.forEach( word => {
    syllables += Syllable(word);
    characters += word.length;
  });

  return {
    sentences: sentences.length,
    words: words.length,
    characters,
    syllables
  }
}

const multipleDocs = (directory, extension, watermark) => {
  const paths = fs.readdirSync(directory);
  console.log(paths);
  let wordsTotal = 0;
  let charactersTotal = 0;
  let syllablesTotal = 0;
  let sentencesTotal = 0;

  const perFileCounts = [];

  paths.forEach((path) => {
    const fullPath = `${directory}/${path}`;

    if (!path.includes(extension)) {
      return;
    }

    const doc = fs.readFileSync(fullPath, 'utf8');
    const words = doc.match(/\w+/g);
    const sentences = doc.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);

    let characters = 0;
    let syllables = 0;
    words.forEach( word => {
      syllables += Syllable(word);
      characters += word.length;
    });

    perFileCounts.push({
      characters,
      sentences,
      syllables,
      words
    });

    charactersTotal += characters;
    sentencesTotal += sentences;
    syllablesTotal += syllables;
    wordsTotal += words;
  });
  

  return {
    characters: charactersTotal,
    sentences: sentencesTotal.length,
    syllables: syllablesTotal,
    words: wordsTotal.length
  }
}

const analyse = (flags) => {
  const metrics = (flags.f) ? singleDoc(flags.f) : multipleDocs(flags.d, flags.e, flags.w);
  return processMetrics(metrics);
}

const processMetrics = (docMetrics) => {
  const fleschKincaidVal = FleschKincaid({
    sentence: docMetrics.sentences,
    word: docMetrics.words,
    syllable: docMetrics.syllables
  });

  const automatedReadabilityVal = AutomatedReadability({
    sentence: docMetrics.sentences,
    word: docMetrics.words,
    character: docMetrics.characters
  })

  const colemanLiauVal = ColemanLiau({
    sentence: docMetrics.sentences,
    word: docMetrics.words,
    letter: docMetrics.characters
  })

  return {
    FleschKincaid: fleschKincaidVal,
    AutomatedReadability: automatedReadabilityVal,
    ColemanLiau: colemanLiauVal
  }
}

const lint = function (flags) {

}

exports = module.exports = {
  analyse: analyse,
  lint: lint
}