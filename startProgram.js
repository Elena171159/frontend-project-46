import { program } from 'commander';
import genDiff from './src/index.js';

export default () => {
  program
    .version('0.0.1', '-V, --version', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'choose format', 'stylish')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
      const result = genDiff(filepath1, filepath2, program.opts().format);
      console.log(result);
    });
  program.parse();
};
