const FleschKincaid = require('flesch-kincaid');
const AutomatedReadability = require('automated-readability');
const ColemanLiau = require('coleman-liau');

const analyse = (docMetrics) => {
  const fleschKincaidVal = FleschKincaid({
    sentence: docMetrics.sentences,
    word: docMetrics.words,
    syllable: docMetrics.syllables
  });

  const automatedReadabilityVal = AutomatedReadability({
    sentence: docMetrics.sentences,
    word: docMetrics.words,
    character: docMetrics.characters
  });

  const colemanLiauVal = ColemanLiau({
    sentence: docMetrics.sentences,
    word: docMetrics.words,
    letter: docMetrics.characters
  });

  return {
    FleschKincaid: fleschKincaidVal,
    AutomatedReadability: automatedReadabilityVal,
    ColemanLiau: colemanLiauVal
  }
};

const lint = function (docMetrics, watermark) {
  const analysis = analyse(docMetrics);
  return analysis.FleschKincaid < watermark
};

exports = module.exports = {
  analyse: analyse,
  lint: lint
}