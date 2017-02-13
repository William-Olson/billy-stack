const debug = require('debug')('db:model-creation');
module.exports = {

  /**
   * name of table
   */
  name: 'users',

  /**
   * create method with table definition
   */
  async create(knex)
  {
    return await knex.schema.createTableIfNotExists('users', table => {
      table.increments();
      table.string('first_name');
      table.string('last_name');
      table.string('username').unique();
      table.timestamps();
    })
    .catch(err => { throw new Error(err); })
    .then(() => debug('users table created'));
  }
};


