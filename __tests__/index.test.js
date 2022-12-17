import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import makeDiff from '../index.js';

// const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
// console.log(getFixturePath('file1.json'));
// const diff = makeDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
const expected = readFileSync(getFixturePath('expectedjson.txt'), 'utf-8');

test('flat Json', () => {
  expect(makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expected);
});
