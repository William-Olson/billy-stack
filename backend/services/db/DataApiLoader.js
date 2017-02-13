const path = require('path');
const fs = require('fs');
const debug = require('debug')('db:api-loader');
const DATA_API_PATH = path.join(__dirname, '../../models');
const DATA_API_TAIL = '-api.js';


// read in db api filenames to an array
const apiFiles = fs.readdirSync(DATA_API_PATH)
  .filter(fname => fname.slice(-1 * DATA_API_TAIL.length) === DATA_API_TAIL);

/**
 * get a scope name based off a filename (converts any dashes to
 * underscores as well)
 */
const scopeName = fname =>
  fname.slice(0, fname.length - DATA_API_TAIL.length).replace(/\-/gim, '_');



/**
 * For loading up the data layer api
 */
module.exports = class DataApiLoader
{

  constructor(stack, knex)
  {
    this._stack = stack;
    this._knex = knex;
    this._db = {};
  }

  /**
   * Loads and instantiates all api class files and registers them with scope
   * names based off filenames
   */
  createApi()
  {
    debug('creating data layer api...');

    for (let file of apiFiles) {
      const M = require(path.join(DATA_API_PATH, file));
      const name = scopeName(file);
      const m = this._stack.make(M);

      // below might be overboard injection but w/e
      this._stack.registerInstance(name, m);

      this._db[name] = m;
    }

    debug('data layer api created successfully!');

    // shortcuts
    this._db.knex = this._knex;
    this._db.authenticate = this._knex.authenticate;

    return this._db;
  }


};
