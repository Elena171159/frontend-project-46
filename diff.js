// getDiff
import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.union(keys1, keys2).sort(); // host time  proxy follow verbose
  const result = uniqKeys.map((key) => {
    const isInfirst = _.has(data1, key);
    const isInsecond = _.has(data2, key);
    const value1 = _.get(data1, key);
    const value2 = _.get(data2, key);
    if (isInfirst && !isInsecond) return { name: key, status: 'deleted', value: value1 };
    if (!isInfirst && isInsecond) return { name: key, status: 'added', value: value2 };
    // if (isInfirst && isInsecond && value1 === value2)
    if (isInfirst && isInsecond && value1 !== value2) {
      return {
        name: key, status: 'changed', oldValue: value1, newValue: value2,
      };
    }
    return { name: key, status: 'unchanged', value: value2 };
  });
  return result;
};
export default getDiff;
