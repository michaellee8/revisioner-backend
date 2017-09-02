/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userFirebaseAuthId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userPhotoUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userLastInteractionTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    userCreateTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    userIntro: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
