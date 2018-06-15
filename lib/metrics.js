const fs = require('fs');
const Syllable = require('syllable');

const sentenceRegex = /([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g;
const wordRegex = /\w+/g;
const format = 'utf8';

const processFile = (path) => {
  const doc = fs.readFileSync(path, format);

  const words = doc.match(wordRegex);
  const sentences = doc.match(sentenceRegex);
  
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

const processFolder = (directory, extension) => {
  const paths = fs.readdirSync(directory);
  console.log(paths)
  const perFileCounts = [];

  paths.forEach((path) => {
    const fullPath = `${directory}/${path}`;

    if (!path.includes(extension)) {
      return;
    }

    if (path.includes(/\./g)) {
      
    }

  });

  return perFileCounts;
}

exports = module.exports = {
  processFile: processFile,
  processFolder: processFolder
}