module.exports = function(sequelize, DataTypes)
{

  const attributes = {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: { type: DataTypes.STRING, unique: true }
    // password: { type: DataTypes.STRING }
  };

  const options = {

    // scopes
    defaultScope: {
      attributes: ['id', 'username', 'first_name', 'last_name']
    },

    classMethods: {
      // associate: function(models) {
      //   User.hasMany(models.favorites);
      // }
    }

    // instance methods etc.

  };

  const User = sequelize.define('users', attributes, options);

  // webhooks etc.

  return User;
};
