/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questionSetsTags', {
    questionSetTagId: {
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
    questionSetTagContent: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'questionSetsTags'
  });
};
