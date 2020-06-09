/* eslint-disable prefer-destructuring */
const knex = require("knex");
const _ = require("lodash");
const KnexClient = require("../KnexClient");
const Debug = require("../../../util/Debug.js");
const Result = require("../../../util/Result.js");
const queries = require("./pg.queries");
const lodash = require("lodash");
const log = new Debug("PGClient");
const ejs = require('ejs');
const {promisify} = require("util");
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class PGClient extends KnexClient {
  constructor(connectionConfig) {
    super(connectionConfig);
    // this.sqlClient = null;
    this.queries = queries;
    this._version = {};
  }




  /**
   * @param {Object} args
   * @returns {Object} result
   * @returns {Number} code
   * @returns {String} message
   */
  async testConnection(args = {}) {
    const _func = this.testConnection.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      await this.raw("SELECT 1+1 as data");
    } catch (e) {
      if (!/^database "[\w\d_]+" does not exist$/.test(e.message)) {
        log.ppe(e);
        result.code = -1;
        result.message = e.message;
      }
    } finally {
      log.api(`${_func}:result:`, result);
    }

    return result;
  }

  /**
   *
   *
   * @param {Object} args
   * @returns {Object} result
   * @returns {Number} code
   * @returns {String} message
   * @returns {Object} object - {version, primary, major, minor}
   */
  async version(args = {}) {
    const _func = this.version.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      result.data.object = {};
      const data = await this.raw("SHOW server_version");
      log.debug(data.rows[0]);
      result.data.object.version = data.rows[0].server_version;
      const versions = data.rows[0].server_version.split(".");

      if (versions.length && (versions.length === 3 || versions.length === 2)) {
        result.data.object.primary = versions[0];
        result.data.object.major = versions[1];
        result.data.object.minor =
          versions.length > 2 ? versions[2] : versions[1];
        result.data.object.key = versions[0] + versions[1];
      } else {
        result.code = -1;
        result.message = `Invalid version : ${data.rows[0].server_version}`;
      }
    } catch (e) {
      log.ppe(e);
      result.code = -1;
      result.message = e.message;
    } finally {
      log.api(`${_func} :result: %o`, result);
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
    const _func = this.createDatabaseIfNotExists.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      const connectionParamsWithoutDb = JSON.parse(
        JSON.stringify(this.connectionConfig)
      );
      connectionParamsWithoutDb.connection.database = "postgres";
      const tempSqlClient = knex(connectionParamsWithoutDb);

      log.debug("checking if db exists");
      const {rows} = await tempSqlClient.raw(
        `SELECT datname as database FROM pg_database WHERE datistemplate = false and datname = '${
          args.database
        }'`
      );

      if (rows.length === 0) {
        log.debug("creating database:", args);
        await tempSqlClient.raw(`CREATE DATABASE  ${args.database}`);
      }

      await tempSqlClient.destroy();
      this.sqlClient = knex(this.connectionConfig);
    } catch (e) {
      log.ppe(e, _func);
      throw e;
    }

    log.api(`${_func}: result`, result);
    return result;
  }

  async dropDatabase(args) {
    const _func = this.dropDatabase.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      const connectionParamsWithoutDb = JSON.parse(
        JSON.stringify(this.connectionConfig)
      );
      connectionParamsWithoutDb.connection.database = "postgres";
      const tempSqlClient = knex(connectionParamsWithoutDb);
      await this.sqlClient.destroy();
      this.sqlClient = tempSqlClient;

      await tempSqlClient.raw(`ALTER DATABASE ${
        args.database
      } WITH CONNECTION LIMIT 0;
      SELECT pg_terminate_backend(sa.pid) FROM pg_stat_activity sa WHERE
      sa.pid <> pg_backend_pid() AND sa.datname = '${args.database}';`);

      log.debug("dropping database:", args);
      await tempSqlClient.raw(`DROP DATABASE ${args.database};`);
    } catch (e) {
      log.ppe(e, _func);
      // throw e;
    }

    log.api(`${_func}: result`, result);
    return result;
  }

  /**
   *
   * @param args {tableName}
   * @returns
   */
  async createTableIfNotExists(args) {
    const _func = this.createTableIfNotExists.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      /** ************** START : create _evolution table if not exists *************** */
      const exists = await this.raw(
        `SELECT table_schema,table_name, table_catalog FROM information_schema.tables where table_schema='public' and
         table_name = '${args.tableName}' and table_catalog = '${
          this.connectionConfig.connection.database
        }'`
      );

      if (exists.rows.length === 0) {
        const data = await this.sqlClient.schema.createTable(
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
        log.debug("Table created:", `${args.tableName}`, data);
      } else {
        log.debug(`${args.tableName} tables exists`);
      }
      /** ************** END : create _evolution table if not exists *************** */
    } catch (e) {
      log.ppe(e, _func);
      throw e;
    }

    log.api(`${_func}: result`, result);

    return result;
  }

  async hasTable(args = {}) {
    const _func = this.hasTable.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      const {rows} = await this.raw(
        `SELECT table_schema,table_name, table_catalog FROM information_schema.tables where table_schema='public' and table_name = '${
          args.tableName
        }' and table_catalog = '${this.connectionConfig.connection.database}'`
      );
      result.data.value = rows.length > 0;
    } catch (e) {
      log.ppe(e, _func);
      throw e;
    }

    log.api(`${_func}: result`, result);

    return result;
  }

  async hasDatabase(args = {}) {
    const _func = this.hasDatabase.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      const {rows} = await this.raw(
        `SELECT datname as database FROM pg_database WHERE datistemplate = false and datname = '${
          args.databaseName
        }'`
      );
      result.data.value = rows.length > 0;
    } catch (e) {
      log.ppe(e, _func);
      throw e;
    }

    log.api(`${_func}: result`, result);

    return result;
  }

  async schemaCreate(args = {}) {
    const _func = this.schemaCreate.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      await this.raw(`create database ${args.database_name}`);
    } catch (e) {
      log.ppe(e, _func);
      throw e;
    }

    log.api(`${_func}: result`, result);

    return result;
  }

  async schemaDelete(args = {}) {
    const _func = this.schemaDelete.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      await this.raw(`drop database ${args.database_name}`);
    } catch (e) {
      log.ppe(e, _func);
      throw e;
    }

    log.api(`${_func}: result`, result);

    return result;
  }

}



// expose class
module.exports = PGClient;
