const DbInit = require('./DbInit');

/**
 * Runs the db-init service and exits
 */
module.exports = class DbInitService
{
  constructor(stack, knex, db)
  {
    this._stack = stack;
    this._knex = knex;
    this._db = db;
  }

  async start()
  {
    const dbInit = this._stack.make(DbInit);

    try {

      // run db-init ops
      await dbInit.createTables();
      await dbInit.importData();

    }
    catch (err) {
      console.error('DB-Init Error: ', err);
      throw err;
    }

    // kill process when done
    process.exit(0);
  }
};
