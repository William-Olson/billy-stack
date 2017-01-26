
module.exports = class RootRoutes
{
  constructor({ harness, db })
  {
    this._db = db;
    harness.get('/', this.getIndex);
  }

  async getIndex()
  {
    return `
    <h1>stack</h1>
    <h3>
      <ul><li><a href="/users">users</a></li></ul>
    </h3>
    `;
  }

};
