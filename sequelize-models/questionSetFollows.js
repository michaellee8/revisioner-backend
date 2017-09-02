/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questionSetFollows', {
    questionSetFollowId: {
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
    questionSetId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'questionSets',
        key: 'questionSetId'
      }
    },
    questionSetFollowTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'questionSetFollows'
  });
};
