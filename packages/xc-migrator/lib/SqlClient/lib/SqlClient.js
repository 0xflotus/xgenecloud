class SqlClient {
  constructor(connectionConfig) {
    this.connectionConfig = connectionConfig;
    this.sqlClient = null;
  }

  async testConnection() {}

  migrationInit(args) {}

  migrationUp(args) {}

  migrationDown(args) {}

  selectAll(tableName) {}

  executeSqlFiles() {}

  async createDatabaseIfNotExists(args) {}

  async createTableIfNotExists(args) {}

  startTransaction() {}

  commit() {}

  rollback() {}

  hasTable(tableName) {}

  hasDatabase(databaseName) {}

  async schemaCreate(args) {}

  async schemaDelete(args) {}

}

module.exports = SqlClient;
