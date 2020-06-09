module.exports = {
  tableName: 'country',
  columns: [{
      columnName: 'country_id',
      type: 'integer',
      dataType: 'smallint',
      notNull: true,
      unsigned: true,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        func: [],
        args: [],
        msg: []
      },
    },
    {
      columnName: 'country',
      type: 'string',
      dataType: 'varchar',
      notNull: true,
      validate: {
        func: [],
        args: [],
        msg: []
      },
    },
    {
      columnName: 'last_update',
      type: 'timestamp',
      dataType: 'timestamp',
      notNull: true,
      default: "CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP",
      validate: {
        func: [],
        args: [],
        msg: []
      },
    },
  ],
  pks: [],
  hasMany: [{
    "constraintName": "fk_city_country",
    "tableName": "city",
    "columnName": "country_id",
    "positionInUniqueConstraint": 1,
    "referencedTableName": "country",
    "referencedColumnName": "country_id",
    "matchOption": "NONE",
    "updateRule": "CASCADE",
    "deleteRule": "RESTRICT",
    "tableSchema": "sakila"
  }],
  belongsTo: []
}