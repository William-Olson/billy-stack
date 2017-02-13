
module.exports = class UsersRoutes
{
  constructor({ harness, db })
  {
    this._users = db.users;
    harness.get('/', this.fetchAll);
    harness.get('/:id', this.fetchById);
  }

  async fetchAll()
  {
    return await this._users.getAll();
  }

  async fetchById(req)
  {
    const id = req.params.id;
    return await this._users.getById(id);
  }
};