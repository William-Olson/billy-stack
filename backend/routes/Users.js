
module.exports = class UsersRoutes
{
  constructor({ harness, db })
  {
    this._db = db;
    harness.get('/', this.getUsers);
  }

  async getUsers()
  {
    return await this._db.users.findAll();
  }
};