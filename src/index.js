import getDiff from './diff.js';
import readFile from './parsers.js';
import { stylish, plain } from './formmaters.js';

const getFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree, null);
    default:
      throw new Error(`Unexpected format: ${format}`);
  }
};
const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const differenceTree = getFormat(getDiff(data1, data2), formatName);
  return differenceTree;
};
export default genDiff;
