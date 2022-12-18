// readFiles makediff
import path from 'path';
import fs from 'fs';
import getDiff from './diff.js';

const readFile = (filePath) => {
  const fileData = fs.readFileSync(path.resolve(process.cwd(), filePath).trim(), 'utf-8');
  // const ext = path.extname(filePath);
  // if (ext === '.json') {
  return JSON.parse(fileData);
};

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
export default makeDiff;
