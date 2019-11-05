
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line func-names
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.User);
  };
  return Project;
};
