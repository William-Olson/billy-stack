// adds lib to npm path before any requires happen
process.env.NODE_PATH = `${__dirname}/lib`;
require('module').Module._initPaths();

// run start up code
require('./start');
