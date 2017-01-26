const debug = require('debug')('db:init');

// bring in sample data
const data = require('./sample-data.json');

module.exports = class DbInit
{
  constructor(db)
  {
    this._db = db;
  }

 /**
  * Add static json data to db
  */
  async start()
  {
    try {
      await this._db.sequelize.sync();

      debug('Adding db-init data to database');

      // add users
      for (let user of data.users) {
        await this._db.users.create(user);
      }

      debug('DB-Init import Succeeded!');
    }
    catch (err) {
      debug('DB-Init Error: ', err);
      throw err;
    }
    process.exit(0);
  }
};