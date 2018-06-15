const fs = require('fs');
const Syllable = require('syllable');

const processFile = (path) => {
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

const processFolder = (directory, extension, watermark) => {
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
  });
  

  return perFileCounts;
}

exports = module.exports = {
  processFile: processFile,
  processFolder: processFolder
}