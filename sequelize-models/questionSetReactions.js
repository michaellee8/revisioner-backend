/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questionSetReactions', {
    questionSetReactionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionSetReactionType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'questionSetReactionTypes',
        key: 'questionSetReactionType'
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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    questionSetReactionTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'questionSetReactions'
  });
};
