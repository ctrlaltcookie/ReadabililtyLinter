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
  const docPaths = getAllDocPaths(directory, extension);
  console.log(docPaths)
  const perFileCounts = [];

  docPaths.forEach((path) => {
    const metric = processFile(path);
    metric.filePath = path;
    perFileCounts.push(metric);
  });

  return perFileCounts;
}

const getAllDocPaths = (directory, extension) => {
  const totalPaths = fs.readdirSync(directory);
  const directories = [];
  let paths = [];

  totalPaths.forEach((path) => {
    const fullPath = `${directory}/${path}`;
    if (path.includes(extension)) {
      paths.push(fullPath);
      return;
    }
    if (path.match(/\./g)) {
      return;
    }
    directories.push(fullPath);
  });

  directories.forEach((path) => {
    paths = paths.concat(getAllDocPaths(path, extension));
  });

  return paths;
}

exports = module.exports = {
  processFile: processFile,
  processFolder: processFolder
}