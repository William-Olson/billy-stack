module.exports = {
  db: {
    development: {
      logging: false,
      username: 'dev',
      password: 'dev',
      database: 'dev',
      host: 'db',
      dialect: 'postgres',
      define: {
        timestamps: false,
        underscored: true,
        freezeTableName: true
      }
    },
    test: {
      logging: false,
      username: 'dev',
      password: 'dev',
      database: 'dev',
      host: 'db',
      dialect: 'postgres',
      define: {
        timestamps: false,
        underscored: true,
        freezeTableName: true
      }
    },
    production: {
      logging: false,
      username: 'root',
      password: null,
      database: 'production',
      host: 'db',
      dialect: 'postgres',
      define: {
        timestamps: false,
        underscored: true,
        freezeTableName: true
      }
    }
  }
};