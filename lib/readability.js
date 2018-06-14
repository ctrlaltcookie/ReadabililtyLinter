const Syllable = require('syllable');
const FleschKincaid = require('flesch-kincaid');
const AutomatedReadability = require('automated-readability');
const ColemanLiau = require('coleman-liau');
const fs = require('fs')

const processDoc = (path) => {
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
    sentences,
    words,
    characters,
    syllables
  }
}

const analyse = (path) => {
  const docMetrics = processDoc(path);

  const fleschKincaidVal = FleschKincaid({
    sentence: docMetrics.sentences.length,
    word: docMetrics.words.length,
    syllable: docMetrics.syllables
  });

  const automatedReadabilityVal = AutomatedReadability({
    sentence: docMetrics.sentences.length,
    word: docMetrics.words.length,
    character: docMetrics.characters
  })

  const colemanLiauVal = ColemanLiau({
    sentence: docMetrics.sentences.length,
    word: docMetrics.words.length,
    letter: docMetrics.characters
  })

  return {
    FleschKincaid: fleschKincaidVal,
    AutomatedReadability: automatedReadabilityVal,
    ColemanLiau: colemanLiauVal
  }
}



exports = module.exports = {
  analyse: analyse
}