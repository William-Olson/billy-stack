const debug = require('debug')('db:models');
const retry = require('async-retry').default;
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const modelsPath  = path.join(__dirname, '../../models');

module.exports = class ModelLoader
{

  constructor(stackConfig)
  {
    const config = stackConfig.db[stackConfig.NODE_ENV];
    this._sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );

    this._db = {};
  }

  importModels()
  {
    debug('loading db models now...');

    // import model files
    fs.readdirSync(modelsPath)
      .filter(file => file.slice(-3) === '.js')
      .forEach(file => {
        const model = this._sequelize.import(path.join(modelsPath, file));
        this._db[model.name] = model;
      });

    // associate models
    for (let modelName in this._db) {
      if (this._db[modelName].associate) {
        this._db[modelName].associate(this._db);
      }
    }

    // convenience props
    this._db.sequelize = this._sequelize;
    this._db.Sequelize = Sequelize;
    this._db.authenticate = this.authenticate.bind(this);

    debug('models loaded successfully!');
    return this._db;
  }

  async authenticate()
  {
    const task = async (exit, i) => {
      debug(`connection attempt: ${i}`);
      await this._sequelize.authenticate();
    };
    const factor = 1.7;
    const maxTimeout = 15000;

    debug('...authenticating with db');
    await retry(task, { maxTimeout, factor });
    debug('db connection successful!');
  }

};
