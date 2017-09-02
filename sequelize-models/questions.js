/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions', {
    questionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    questionSetId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'questionSets',
        key: 'questionSetId'
      }
    },
    questionTitle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    questionContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionMediaUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    questionType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    questionCreateTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    questionLastUpdateTimestamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'questions'
  });
};
