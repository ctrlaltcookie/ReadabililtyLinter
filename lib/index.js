const readability = require('./readability');
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
      -s, --single-file        path to file for analysis
      -f, --folder             path to folder for analysis, assumes
                               .txt extension unless specified
      -e, --extension          file extension to analyse
      -w, --watermark          sets the readability for watermark

    Examples:
      readability total -s ./potato-recipies.md
      readability total -f ./potato-recipies/ -e .md
  `, {
    flags: {
      'single-file': {
        alias: 's'
      },
      folder: {
        alias: 'f'
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
    cli.showHelp(1);
    process.exit(3);
  }

  const func = cli.input[0].toLocaleLowerCase();

  if (func === 'analyse') {
    console.log(readability.analyse(cli.flags.s));
  }

};

exports = module.exports = {
  run: run()
};