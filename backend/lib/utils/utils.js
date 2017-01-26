module.exports = {
  strToArr(str)
  {
    return `${str}`.split(',')
      .map(s => s.trim())
      .filter(s => s && s !== 'undefined');
  }
};