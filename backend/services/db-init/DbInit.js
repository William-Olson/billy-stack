const debug = require('debug')('db:init');
const path = require('path');
const fs = require('fs');

// bring in sample data
const data = require('./sample-data.json');

// get table definition files
const modelsPath  = path.join(__dirname, '../../models');
const modelFiles = fs.readdirSync(modelsPath);
const tableFiles = modelFiles
  .filter(file => file.slice(-9) === '-table.js');


/**
 * Creates db tables and imports data to db
 */
module.exports = class DbInit
{
  constructor(knex)
  {
    this._knex = knex;
  }

  /**
   * Create the db schema
   */
  async createTables()
  {
    debug('Creating db tables now...');

    for (let file of tableFiles) {
      const def = require(path.join(modelsPath, file));
      await def.create(this._knex);
    }

    debug('Tables created successfully!');
  }

  /**
   * Import user data to db
   */
  async _importUsers()
  {
    // add users
    for (let user of data.users) {
      await this._knex
        .insert(user)
        .into('users');
    }
  }

 /**
  * Add static json data to db
  */
  async importData()
  {
    debug('Adding db-init data to database');

    // run db data insertions
    await this._importUsers();

    debug('DB-Init import Succeeded!');
  }
};