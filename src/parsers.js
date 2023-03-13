import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const readFile = (filePath) => {
  const fileData = fs.readFileSync(path.resolve(process.cwd(), filePath).trim(), 'utf-8');
  const ext = path.extname(filePath);
  if (ext === '.json') {
    return JSON.parse(fileData);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(fileData);
  }
  return console.log(('Unknown file format'));
};
export default readFile;
