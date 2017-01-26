const ModelLoader = require('./ModelLoader');

module.exports = class DbService
{
  constructor(stack)
  {
    // load the db models
    const loader = stack.make(ModelLoader);
    this._db = loader.importModels();

    // register the db instance
    stack.registerInstance('db', this._db);
  }

  async start()
  {
    await this._db.authenticate();
  }
};
