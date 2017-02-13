/**
 * Users db api
 */
module.exports = class UsersApi {

  constructor(knex)
  {
    this._knex = knex;
  }

  /**
   * get all users in db
   */
  async getAll()
  {
    const rows = await this._q();
    return rows.map(r => this._clean(r));
  }

  /**
   * get a user by id
   */
  async getById(id)
  {
    if (!id) {
      throw new Error('Missing id param');
    }

    const [ res ] = await this._q(
      this._knex.raw(`id = ${id}`)
    );

    if (!res) {
      throw new Error(`Can't find user with id: ${id}`);
    }

    return this._clean(res);
  }

  /**
   * run a basic users query
   */
  async _q(w = {})
  {
    return await this._knex
      .select('*')
      .from('users')
      .where(w);
  }

  /**
   * strip down responses to relevant properties
   */
  _clean(model)
  {
    return {
      id: model.id,
      first_name: model.first_name,
      last_name: model.last_name
    };
  }

};
