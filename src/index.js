import getDiff from './diff.js';
import readFile from './parsers.js';
import { makeDiff } from './formmaters.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const differenceTree = getDiff(data1, data2);
  const result = makeDiff(differenceTree, formatName);
  return result;
};
// console.log(genDiff('../__tests__/__fixtures__/file1.yml', '../__tests__/__fixtures__/file2.yml'));
export default genDiff;
