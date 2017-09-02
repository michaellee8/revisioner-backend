/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questionSumbits', {
    questionSumbitId: {
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
    questionAnswerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'questionAnswers',
        key: 'questionAnswerId'
      }
    },
    questionSumbitTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'questionSumbits'
  });
};
