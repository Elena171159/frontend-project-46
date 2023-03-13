import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';

// const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
// console.log(getFixturePath('file1.json'));
const expected = readFileSync(getFixturePath('expectedjson1.txt'), 'utf-8');
// const expected1 = readFileSync(getFixturePath('expectedjson.txt'), 'utf-8');

test('noflat Json', () => {
  expect(genDiff(getFixturePath('filepath1.json'), getFixturePath('filepath2.json'))).toBe(expected);
});
test('noflat yml', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expected);
  expect(genDiff(getFixturePath('file3.yaml'), getFixturePath('file2.yml'))).toBe(expected);
  expect(genDiff(getFixturePath('file3.yaml'), getFixturePath('file2.yml'))).not.toBe('Unknown file format');
});
