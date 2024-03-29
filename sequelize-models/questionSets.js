/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questionSets', {
    questionSetId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    questionSetTitle: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionSetIntro: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    questionSetSubject: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    questionSetCreateTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    questionSetLastUpdateTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'questionSets'
  });
};
