// https://www.postgresql.org/docs/9.5/datatype.html

module.exports = {

  createDatabaseIfNotExists: {
    default: {
      sql: `create database if not exists ??`,
      paramsHints: ["database"]
    }
  },
  createTableIfNotExists: {
    default: {
      sql: ``,
      paramsHints: []
    }
  },
  dropDatabase: {
    default: {
      sql: `drop database ??`,
      paramsHints: ["database"]
    }
  },
  databaseList: {
    default: {
      sql: `SHOW databases`,
      paramsHints: []
    }
  },
  hasDatabase: {
    default: {
      sql: `SHOW DATABASES LIKE ??`,
      paramsHints: ["databaseName"]
    }
  },
  indexList: {
    default: {
      sql: `show index from ??`,
      paramsHints: ["table_name"]
    }
  },

  schemaCreate: {
    default: {
      sql: `create database ??`,
      paramsHints: ["database_name"]
    }
  },
  schemaDelete: {
    default: {
      sql: `drop database ??`,
      paramsHints: ["database_name"]
    }
  },
  testConnection: {
    default: {
      sql: ``,
      paramsHints: []
    }
  },
  version: {
    default: {
      sql: ``,
      paramsHints: []
    }
  },
};
