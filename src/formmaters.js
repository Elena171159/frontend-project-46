import _ from 'lodash';

const keyOffset = 4;
const prefixOffset = 2;
const indentSymbol = ' ';
const openSymbol = '{';
const closeSymbol = '}';
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
const buildString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  return typeof data === 'string' ? `'${data}'` : String(data);
};

const plain = (data) => {
  const iter = (lines, path) => {
    const filter = lines.filter((line) => line.status !== 'unchanged');
    const result = filter.map((line) => {
      const { name } = line;
      const newPath = [...path, name];
      switch (line.status) {
        case 'added':
          return `Property '${newPath.join('.')}' was added with value: ${buildString(line.value)}`;
        case 'deleted':
          return `Property '${newPath.join('.')}' was removed`;
        case 'changed':
          return `Property '${newPath.join('.')}' was updated. From ${buildString(line.oldValue)} to ${buildString(line.newValue)}`;
        case 'nested':
          return iter(line.value, newPath);
        default:
          throw new Error(`Unknown type: ${line.status}`);
      }
    });
    return result.join('\n');
  };

  return iter(data, []);
};
export { stylish, plain };
