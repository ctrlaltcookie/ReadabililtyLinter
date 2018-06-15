const readability = require('./readability');
const DocMetrics = require('./metrics');
const Meow = require('meow');

const run = function () {

  const cli = Meow(`
    Usage: 
      readability <command> [tags]

    Commands:
      analyse             grab the total readability from file(s)
      lint                returns true or false if readability is above
                          watermark, set to grade 10 by default

    Options:
      -f, --file        path to file for analysis
      -d, --folder             path to directory for analysis, assumes
                               .txt extension unless specified
      -e, --extension          file extension to analyse
      -w, --watermark          sets the readability for watermark

    Examples:
      readability total -s ./potato-recipies.md
      readability total -f ./potato-recipies/ -e .md
  `, {
    flags: {
      'file': {
        alias: 'f'
      },
      folder: {
        alias: 'd'
      },
      extension: {
        alias: 'e'
      },
      watermark: {
        alias: 'w'
      }
    }
  });

  if (cli.input.length < 1) {
    showHelp();
  }

  
  let metrics;
  let func = cli.input[0].toLocaleLowerCase();
  const watermark = cli.flags.w || 10;
  
  //this is, frankly, lazy, and i don't care
  if (cli.flags.file) {
    metrics = DocMetrics.processFile(cli.flags.file);
    console.log(readability[func](metrics, watermark));
    process.exit(0);
  }
  if(cli.flags.extension === undefined) {
    console.log('extension is required in folders');
    showHelp(cli);
  }
  if (cli.flags.folder) {
    const metrics = DocMetrics.processFolder(cli.flags.folder, cli.flags.extension);
    metrics.forEach((metric) => {
      console.log(metric.filePath);
      console.log(readability[func](metric, watermark));
    });
    process.exit(0);
  }
};

const showHelp = (cli) => {
  cli.showHelp(1);
  process.exit(3);
} 

exports = module.exports = {
  run: run()
};