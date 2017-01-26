const DbInit = require('./DbInit');

module.exports = class DbInitService
{
  constructor(db)
  {
    this._db = db;
  }

  async start()
  {
    // wait for db connection to resolve
    await this._db.authenticate();

    // run db-init
    const dbInit = new DbInit(this._db);
    await dbInit.start();
  }
};
