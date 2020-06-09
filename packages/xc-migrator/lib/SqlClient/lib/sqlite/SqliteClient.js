/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
const {promisify} = require("util");
const knex = require("knex");
const fs = require("fs");
const KnexClient = require("../KnexClient");
const Debug = require("../../../util/Debug.js");
const Result = require("../../../util/Result.js");
const queries = require("./sqlite.queries");
const lodash = require("lodash");

const path = require('path');
const mkdirp = require('mkdirp');
const ejs = require('ejs');

const log = new Debug("SqliteClient");

class SqliteClient extends KnexClient {
  constructor(connectionConfig) {
    super(connectionConfig);
    this.sqlClient = knex(connectionConfig.connection);
    this.queries = queries;
    this._version = {};
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
    const _func = this.testConnection.name;
    const result = new Result();

    log.api(`${_func}:args:`, args);

    try {
      await this.raw("SELECT 1+1 as data");
    } catch (e) {
      log.ppe(e);
      result.code = -1;
      result.message = e.message;
    } finally {
      log.api(`${_func} :result: ${result}`);
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
      const data = await this.raw("select sqlite_version() as version");
      log.debug(data[0]);
      result.data.object.version = data[0].version;
      const versions = data[0].version.split(".");

      if (versions.length && versions.length === 3) {
        result.data.object.primary = versions[0];
        result.data.object.major = versions[1];
        result.data.object.minor = versions[2];
        result.data.object.key = versions[0] + versions[1];
      } else {
        result.code = -1;
        result.message = `Invalid version : ${data[0].version}`;
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

  async createDatabaseIfNotExists(args) {
    const _func = this.createDatabaseIfNotExists.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      const exists = await promisify(fs.exists)(args.database);

      if (!exists) {
        log.debug("sqlite file do no exists - create one");
        const fd = await promisify(fs.open)(args.database, "w");
        const close = await promisify(fs.close)(fd);
        log.debug("sqlite file is created", fd, close);
      }

      // create new knex client
      this.sqlClient = knex(this.connectionConfig.connection);
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
      log.debug("dropping database:", args);
      await promisify(fs.unlink)(args.database);
      log.debug("dropped database:");
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
  async createTableIfNotExists(args = {}) {
    const _func = this.createTableIfNotExists.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      /** ************** START : create _evolution table if not exists *************** */
      const exists = await this.hasTable({tableName: args.tableName});

      if (!exists.data.value) {
        const data = await this.sqlClient.schema.createTable(
          args.tableName,
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



  async hasTable(args) {
    const _func = this.hasTable.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      await this.sqlClient.raw(`select * from ${args.tableName}`);
      result.data.value = true;
    } catch (e) {
      log.ppe(e, _func);
      result.data.value = false;
    }

    log.api(`${_func}: result`, result);

    return result;
  }

  async hasDatabase(args = {}) {
    const _func = this.hasDatabase.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    let exists = false;
    log.debug("sqlite databaseName:", args.databaseName);
    exists = await promisify(fs.exists)(args.databaseName);
    result.data.value = exists;
    return result;
  }

  async schemaCreate(args = {}) {
    const _func = this.createDatabaseIfschemaCreateNotExists.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    const rows = await this.sqlClient.raw(
      `create database ${args.database_name}`
    );
    return rows;
  }

  async schemaDelete(args = {}) {
    const _func = this.schemaDelete.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    const rows = await this.sqlClient.raw(
      `drop database ${args.database_name}`
    );
    return rows;
  }


}


// expose class
module.exports = SqliteClient;
