const base36map = '0123456789abcdefghijklmnopqrstuvwxyz';

function base36encode(number) {
  let parsedNumber = number;
  if (typeof number === 'string') {
    parsedNumber = parseInt(number, 10);
  }

  if (typeof parsedNumber !== 'number') {
    throw new TypeError('base36encode: parameter must be a positive integer or a string that can be parsed to one');
  }
  if (parsedNumber < 0) {
    throw new Error('base36encode: parameter must be a positive integer or a string that can be parsed to one');
  }

  const elements = [];
  let value = parsedNumber;

  while (value > 0) {
    elements.push(base36map[value % 36]);
    value = Math.floor(value / 36);
  }

  return elements.reverse().join('');
}

function base36decode(string) {
  if (string === null || string === undefined || typeof string !== 'string') {
    throw new TypeError('base36encode: parameter must be a string');
  }

  if (string.length <= 0) return 0;

  const lowerString = string.toLowerCase();
  return lowerString
    .split('')
    .reverse()
    .map((element, idx) => Math.pow(36, idx) * base36map.indexOf(element))
    .reduce((result, element) => result + element, 0);
}