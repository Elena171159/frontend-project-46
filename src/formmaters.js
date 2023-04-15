import _ from 'lodash';

const keyOffset = 4;
const prefixOffset = 2;
const indentSymbol = ' ';
const openSymbol = '{';
const closeSymbol = '}';
// const addPrefix = (key, type, indent) => `${indent}${labels[type]} ${key}`;
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indentSize = depth * keyOffset;
  const keyIndent = indentSymbol.repeat(indentSize);
  const bracketIndent = indentSymbol.repeat(indentSize - keyOffset);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${keyIndent}${key}: ${stringify(val, depth + 1)}`);
  return [
    `${openSymbol}`,
    ...lines,
    `${bracketIndent}${closeSymbol}`,
  ].join('\n');
};
// `${keyIndent}+ ${node.name}:
const stylish = (data) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      const indentSize = depth * keyOffset;
      const bracketIndent = indentSymbol.repeat(indentSize);
      const keyIndent = indentSymbol.repeat(indentSize - prefixOffset);
      switch (node.status) {
        case 'added':
          return `${keyIndent}+ ${node.name}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${keyIndent}- ${node.name}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${keyIndent}  ${node.name}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return `${keyIndent}- ${node.name}: ${stringify(node.oldValue, depth + 1)}\n${keyIndent}+ ${node.name}: ${stringify(node.newValue, depth + 1)}`;
        case 'nested':
          return `${keyIndent}  ${node.name}: ${openSymbol}\n${iter(node.value, depth + 1).join('\n')}\n${bracketIndent}${closeSymbol}`;
        default:
          throw new Error('Invalid type');
      }
    });
    return result;
  };
  return [
    `${openSymbol}`,
    ...iter(data, 1),
    `${closeSymbol}`,
  ].join('\n');
};
const makeDiff = (data, format) => {
  switch (format) {
    case 'stylish': {
      return stylish(data);
    }
    case 'json': {
      return JSON.stringify(data, '', '\t');
    }
    default: {
      throw Error(`Incorrect format: ${format}`);
    }
  }
};

export { makeDiff, stylish };
