const knex = require("knex");
const Debug = require("../../../util/Debug.js");
const Result = require("../../../util/Result.js");
const log = new Debug("MysqlClient");
const queries = require("./mysql.queries");
const KnexClient = require("../KnexClient");



const Emit = require("../../../util/emit");

const evt = new Emit();

class MysqlClient extends KnexClient {
  constructor(connectionConfig) {
    super(connectionConfig);
    this.queries = queries;
    this._version = {};
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

  /**
   *
   *
   * @param {Object} args
   * @returns {Object} result
   * @returns {Number} code
   * @returns {String} message
   */
  async testConnection(args = {}) {
    const func = this.testConnection.name;
    const result = new Result();
    log.api(`${func}:args:`, args);

    try {
      // await this.sqlClient.raw(this.getQuery(_func))
      await this.sqlClient.raw("SELECT 1+1 as data");
    } catch (e) {
      // log.ppe(e);
      result.code = -1;
      result.message = e.message;
      result.object = e;
    } finally {

      if (result.code) {
        this.emitE(`TestConnection result: ${result.message}`);
      } else {
        this.emit(`TestConnection result: ${result.code}`);
      }

    }
    return result;
  }


  /**
   * Returns mysql version
   *
   * @param {Object} args - for future reasons
   * @returns {Object} result
   * @returns {Number} result.code
   * @returns {String} result.message
   * @returns {Object} result.data
   * @returns {Object} result.data.object - {version, primary, major, minor,key}
   */
  async version(args = {}) {
    const func = this.version.name;
    const result = new Result();
    log.api(`${func}:args:`, args);

    try {
      result.data.object = {};
      const data = await this.sqlClient.raw("select version() as version");
      log.debug(data[0][0]);
      result.data.object.version = data[0][0].version;
      const versions = data[0][0].version.split(".");

      if (versions.length && versions.length === 3) {
        result.data.object.primary = versions[0];
        result.data.object.major = versions[1];
        result.data.object.minor = versions[2];
        result.data.object.key = versions[0] + versions[1];
      } else {
        result.code = -1;
        result.message = `Invalid version : ${data[0][0].version}`;
      }
    } catch (e) {
      log.ppe(e);
      result.code = -1;
      result.message = e.message;
    } finally {
      log.api(`${func} :result: %o`, result);
    }
    return result;
  }


  /**
   *
   * @param {Object} args
   * @param {String} args.database
   * @returns {Result}
   */
  async createDatabaseIfNotExists(args = {}) {
    const func = this.createDatabaseIfNotExists.name;
    const result = new Result();
    log.api(`${func}:args:`, args, this.connectionConfig);

    try {
      // create a new knex client without database param
      const connectionParamsWithoutDb = JSON.parse(
        JSON.stringify(this.connectionConfig)
      );

      delete connectionParamsWithoutDb.connection.database;

      const tempSqlClient = knex(connectionParamsWithoutDb);

      const data = await tempSqlClient.raw(this.queries[func].default.sql, [
        args.database
      ]);

      log.debug("Create database if not exists", data);

      // create new knex client
      this.sqlClient = knex(this.connectionConfig);
      tempSqlClient.destroy();
    } catch (e) {
      log.ppe(e, func);
      throw e;
    }

    log.api(`${func}: result`, result);
    return result;
  }

  async dropDatabase(args = {}) {
    const func = this.dropDatabase.name;
    const result = new Result();
    log.api(`${func}:args:`, args);

    try {
      log.api("dropping database:", args);
      await this.sqlClient.raw(this.queries[func].default.sql, [args.database]);
    } catch (e) {
      if (e) log.ppe(e.message, func);
    }
    log.api(`${func}: result`, result);
    return result;
  }

  /**
   *
   * @param args {tableName}
   * @returns
   */
  async createTableIfNotExists(args = {}) {
    const func = this.createTableIfNotExists.name;
    const result = new Result();
    log.api(`${func}:args:`, args);

    try {
      /** ************** START : create _evolution table if not exists *************** */
      const exists = await this.sqlClient.schema.hasTable(args.tableName);

      if (!exists) {
        await this.sqlClient.schema.createTable(
          args.tableName,
          // eslint-disable-next-line func-names
          function (table) {
            table.increments();
            table.string("title").notNullable();
            table.string("titleDown").nullable();
            table.string("description").nullable();
            table.integer("batch").nullable();
            table.string("checksum").nullable();
            table.integer("status").nullable();
            table.dateTime("created");
            table.timestamps();
          }
        );
        log.debug("Table created:", `${args.tableName}`);
      } else {
        log.debug(`${args.tableName} tables exists`);
      }
      /** ************** END : create _evolution table if not exists *************** */
    } catch (e) {
      log.ppe(e, func);
      throw e;
    }

    log.api(`${func}: result`, result);

    return result;
  }

  async hasTable(args) {
    const func = this.hasTable.name;
    const result = new Result();
    log.api(`${func}:args:`, args);

    try {
      const response = await this.sqlClient.schema.hasTable(args.tableName);
      result.data.value = response;
    } catch (e) {
      log.ppe(e, func);
      throw e;
    }

    log.api(`${func}: result`, result);
    return result;
  }

  async hasDatabase(args) {
    const func = this.hasDatabase.name;
    const result = new Result();
    log.api(`${func}:args:`, args);

    try {
      const rows = await this.sqlClient.raw(this.queries[func].default.sql, [
        `${args.databaseName}`
      ]);
      result.data.value = rows.length > 0;
    } catch (e) {
      log.ppe(e, func);
      throw e;
    }

    log.api(`${func}: result`, result);

    return result;
  }



  async schemaCreate(args = {}) {
    const func = this.triggerList.name;
    const result = new Result();
    log.api(`${func}:args:`, args);
    // `create database ${args.database_name}`
    const rows = await this.sqlClient.raw(this.queries[func].default.sql, [
      args.database_name
    ]);
    return rows;
  }

  async schemaDelete(args = {}) {
    const func = this.schemaDelete.name;
    const result = new Result();
    log.api(`${func}:args:`, args);
    // `drop database ${args.database_name}`
    const rows = await this.sqlClient.raw(this.queries[func].default.sql, [
      args.database_name
    ]);
    return rows;
  }

}



// expose class
module.exports = MysqlClient;

