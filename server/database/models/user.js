
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line func-names
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Project, {
      foreignKey: 'userId',
      as: 'projects',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
