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
  hasDatabase: {
    default: {
      sql: `SHOW DATABASES LIKE ?`,
      paramsHints: ["databaseName"]
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
