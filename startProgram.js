import { program } from 'commander';
import makeDiff from './index.js';

export default () => {
  program
    .version('0.0.1', '-V, --version', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'choose format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
      const result = makeDiff(filepath1, filepath2);
      console.log(result);
    })
    .parse(process.argv);
};
