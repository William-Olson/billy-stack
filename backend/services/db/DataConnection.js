const knexClient = require('knex');
const retry = require('async-retry').default;
const debug = require('debug')('db:auth');

module.exports = class DataConnection {

  constructor(stackConfig)
  {
    this._knex = knexClient(stackConfig.db);
    this._knex.authenticate = async () => await this.authenticate();
  }

  /*

    Retrieve the knex instance

  */
  getClient()
  {
    return this._knex;
  }

  /*

    Await this method to ensure knex has successfully connected to the
    postgres instance

  */
  async authenticate()
  {
    const task = async (exit, i) => {

      debug(`connection attempt: ${i}`);
      const res = await this._knex.raw('SELECT version()');

      if (!res || !res.rows) {
        throw new Error('knex failed to connect');
      }

    };
    const factor = 1.5;
    const maxTimeout = 15000;

    debug('...authenticating with db');
    await retry(task, { maxTimeout, factor });
    debug('db connection successful!');
  }
};
