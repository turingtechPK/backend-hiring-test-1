module.exports = function (sequelize, DataTypes, NOW) {
    return sequelize.define(
      'voice_recordings',
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        callerName: {
          type: DataTypes.STRING(),
          allowNull: true,
          field: 'caller_name'
        },
        voiceUrl: {
          type: DataTypes.STRING(),
          allowNull: true,
          field: 'voice_url',
        },

      },
      {
        sequelize,
        tableName: 'voice_recordings',
        schema: 'public',
        indexes: [],
      }
    );
  };
  