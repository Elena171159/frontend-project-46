import getDiff from './diff.js';
import readFile from './parsers.js';

const makeTree = (mas) => {
  const diff = mas.map(({
    name, status, value, oldValue, newValue,
  }) => {
    switch (status) {
      case 'unchanged': return `   ${name}: ${value}`;
      case 'changed': return ` - ${name}: ${oldValue}\n + ${name}: ${newValue}`;
      case 'deleted': return ` - ${name}: ${value}`;
      case 'added': return ` + ${name}: ${value}`;
      default: throw new Error(`Unknown order state: '${status}'!`);
    }
  });
  const strDiff = diff.join('\n');
  return `{\n${strDiff}\n}`;
};
const makeDiff = (file1, file2) => {
  const obj1 = readFile(file1);
  const obj2 = readFile(file2);
  const result = getDiff(obj1, obj2);
  return makeTree(result);
};
console.log(makeDiff('__tests__/__fixtures__/file2.yml', '__tests__/__fixtures__/file1.json'));
export default makeDiff;
