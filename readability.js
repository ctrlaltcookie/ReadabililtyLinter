const Syllable = require('syllable');
const FleschKincaid = require('flesch-kincaid');
const AutomatedReadability = require('automated-readability');
const ColemanLiau = require('coleman-liau');

const analyse = (doc) => {
  const words = doc.match(/\w+/g);
  const sentences = doc.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
  
  let totalCharacters = 0;
  let totalSyllables = 0;
  words.forEach( word => {
    totalSyllables += Syllable(word);
    totalCharacters += word.length;
  });

  const fleschKincaidVal = FleschKincaid({
    sentence: sentences.length,
    word: words.length,
    syllable: totalSyllables
  });

  const automatedReadabilityVal = AutomatedReadability({
    sentence: sentences.length,
    word: words.length,
    character: totalCharacters
  })

  const colemanLiauVal = ColemanLiau({
    sentence: sentences.length,
    word: words.length,
    letter: totalCharacters
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