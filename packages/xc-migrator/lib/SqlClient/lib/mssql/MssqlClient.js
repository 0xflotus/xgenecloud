/* eslint-disable prefer-destructuring */

const knex = require("knex");
const KnexClient = require("../KnexClient");
const Debug = require("../../../util/Debug.js");
const Result = require("../../../util/Result.js");
const lodash = require("lodash");
const log = new Debug("MssqlClient");

const path = require('path');
const mkdirp = require('mkdirp');
const ejs = require('ejs');


class MssqlClient extends KnexClient {
  // constructor(connectionConfig) {
  //   super(connectionConfig);
  // }

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
      log.ppe(e);
      result.code = -1;
      result.message = e.message;
    } finally {
      log.api(`${_func}:result:`, result);
    }

    return result;
  }

  async version(args = {}) {
    const _func = this.version.name;
    const result = new Result();
    log.api(`${_func}:args:`, args);

    try {
      const rows = await this.raw(
        `SELECT SERVERPROPERTY('productversion') as version, SERVERPROPERTY ('productlevel') as level, SERVERPROPERTY ('edition') as edition, @@version as versionD`
      );
      result.data.object = {};

      const versionDetails = rows[0];
      const version = versionDetails.version.split(".");
      result.data.object.version = versionDetails.version;
      result.data.object.primary = version[0];
      result.data.object.major = version[1];
      result.data.object.minor = version[2];
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
      result.data.value = await this.sqlClient.schema.hasTable(args.tableName);
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
      const rows = await this.raw(
        `select name from sys.databases where name = '${args.databaseName}'`
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
      const rows = await this.raw(
        `select name from sys.databases where name = '${args.database_name}'`
      );

      if (rows.length === 0) {
        await this.raw(`CREATE DATABASE  ${args.database_name}`);
      }
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
      const connectionParamsWithoutDb = JSON.parse(
        JSON.stringify(this.connectionConfig)
      );

      if (
        connectionParamsWithoutDb.connection.database === args.database_name
      ) {
        delete connectionParamsWithoutDb.connection.database;
        const tempSqlClient = knex(connectionParamsWithoutDb);
        await this.sqlClient.destroy();
        this.sqlClient = tempSqlClient;
      }

      await this.raw(
        `ALTER DATABASE ${
          args.database_name
        } SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
         DROP DATABASE ${args.database_name};`
      );
    } catch (e) {
      log.ppe(e, _func);
      throw e;
    }

    log.api(`${_func}: result`, result);

    return result;
  }
}

// expose class
module.exports = MssqlClient;
