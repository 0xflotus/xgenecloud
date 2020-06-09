const knex = require("knex");
const fs = require("fs");
const Emit = require("../../util/emit.js");
const Result = require("../../util/Result.js");
const Debug = require("../../util/Debug.js");
const evt = new Emit();
const log = new Debug("KnexClient");
const SqlClient = require("./SqlClient");

class KnexClient extends SqlClient {
  
  constructor(connectionConfig) {
    
    super(connectionConfig);

    if (connectionConfig.connection && connectionConfig.connection.port)
      connectionConfig.connection.port = +connectionConfig.connection.port;

    this._connectionConfig = connectionConfig;

    if (this.connectionConfig.connection.ssl) {
      this.connectionConfig.connection.ssl.ca = fs
        .readFileSync(this.connectionConfig.connection.ssl.caFilePath)
        .toString();
      this.connectionConfig.connection.ssl.key = fs
        .readFileSync(this.connectionConfig.connection.ssl.keyFilePath)
        .toString();
      this.connectionConfig.connection.ssl.cert = fs
        .readFileSync(this.connectionConfig.connection.ssl.certFilePath)
        .toString();
    }
    let tmpConnection = connectionConfig.client === 'sqlite3' ? connectionConfig.connection : connectionConfig
    this.sqlClient = knex(tmpConnection);

    this.knex = this.sqlClient;
    this.metaDb = {};
    this.metaDb.tables = {};
    
  }


  emit(data) {
    log.api(data);
    evt.evt.emit("UI", {
      status: 0,
      data: `SQL : ${data}`
    });
  }

  emitW(data) {
    log.warn(data);
    evt.evt.emit("UI", {
      status: 1,
      data: `SQL : ${data}`
    });
  }

  emitE(data) {
    log.error(data);
    evt.evt.emit("UI", {
      status: -1,
      data: `SQL : ${data}`
    });
  }

  migrationInit(args) {
  }

  async selectAll(tableName) {
    return await this.sqlClient(tableName).select();
  }

  /**
   *
   *
   * @param args
   * @param args.table_name
   * @param args.fields
   * @param args.limit
   * @param args.where
   * @param args.sort
   * @param args.size
   * @param args.orderBy
   * @param args.page
   * @return {Promise<Result>}
   */
  async list(args) {
    const {size = 10, page = 1, orderBy} = args;

    const result = new Result();

    try {
      const countResult = await this.sqlClient(args.table_name).count();
      result.data.count = Object.values(countResult[0])[0];
      const query = this.sqlClient(args.table_name)
        .select()
        .limit(size)
        .offset((page - 1) * size);
      if (orderBy && orderBy.length)
        result.data.list = await query.orderBy(orderBy);
      else result.data.list = await query;
    } catch (e) {
      console.log(e);
      result.data.list = [];
    }
    return result;
  }

  executeSqlFiles() {
  }

  async createDatabaseIfNotExists(args) {
  }

  async createTableIfNotExists(args) {
  }

  async raw(statements) {
    const start = new Date().getTime();
    let response = null;
    let end = null, timeTaken = null;
    try {
      response = await this.sqlClient.raw(statements);
      end = new Date().getTime();
      timeTaken = end - start;
      log.api(`Query: (${statements}) [Took: ${timeTaken} ms]`);
      this.emit(`${statements} [Took: ${timeTaken} ms]`);
      return response;
    } catch (e) {
      end = new Date().getTime();
      timeTaken = end - start;
      this.emitE(`${e} [Took: ${timeTaken} ms]`);
      console.log(e);
      throw e;
    }
  }

  // Todo: error handling
  async insert(tableName, data) {
    const res = await this.sqlClient(tableName).insert(data);
    log.debug(res);
    return res;
  }

  async update(tableName, data, whereConditions) {
    const res = await this.sqlClient(tableName)
      .where(whereConditions)
      .update(data);
    return res;
  }

  async delete(tableName, whereConditions) {
    const res = await this.sqlClient(tableName)
      .where(whereConditions)
      .del();
    log.debug(res);
    return res;
  }

  async remove(tableName, where) {
    await this.sqlClient(tableName)
      .del()
      .where(where);
  }

  hasTable(tableName) {
  }

  hasDatabase(databaseName) {
  }

}

// expose class
module.exports = KnexClient;
