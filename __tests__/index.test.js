import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../src/index.js';

// const path = require('path');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const expected = readFileSync(getFixturePath('expectedjson.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
const expectedJson = readFileSync(getFixturePath('expected.txt'), 'utf-8');

test('noflat Json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expected);
});
test('noflat yml', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expected);
  expect(genDiff(getFixturePath('file3.yaml'), getFixturePath('file2.yml'))).toBe(expected);
  expect(genDiff(getFixturePath('file3.yaml'), getFixturePath('file2.yml'))).not.toBe('Unknown file format');
});
test('plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedPlain);
});
test('json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(expectedJson);
});
