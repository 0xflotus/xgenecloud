const should = require("should");
const path = require("path");
const { promisify } = require("util");
const fs = require("fs");
const jsonfile = require("jsonfile");
const glob = require("glob");
const SqlMigratorCli = require("../lib/SqlMigratorCli");
const SqlClientFactory = require("../../SqlClient/lib/SqlClientFactory");

class TestUtil {
  static async checkFileExists(file, isExists, msg) {
    const exist = await promisify(fs.exists)("./config.xc.json");
    should.equal(exist, isExists, msg);
  }

  static async cmdInit(args) {
    const cli = new SqlMigratorCli(args);
    await cli.handle();
  }

  static async cmdSync(args) {
    const cli = new SqlMigratorCli(args);
    await cli.handle();
  }

  static async cmdMigrationCreate(args) {
    const cli = new SqlMigratorCli(args);
    await cli.handle();
  }

  /**
   *
   * @param args
   * @param args.tableName
   * @param args.env
   * @param args.envIndex
   * @param args.recordsLength
   * @returns {Promise<void>}
   */
  static async cmdMigrationUpVerify(args) {
    args.env = args.env || "dev";
    args.envIndex = args.envIndex || 0;

    const project = await promisify(jsonfile.readFile)("./config.xc.json");
    const sqlClient = SqlClientFactory.create(
      project.envs[args.env][args.envIndex]
    );

    const exists = await sqlClient.hasTable({ tableName: args.tableName });
    should.equal(
      exists.data.value,
      true,
      `${args.tableName} should have got created on migration`
    );

    const rows = await sqlClient.selectAll(
      project.envs[args.env][args.envIndex].meta.tableName
    );
    should.equal(
      rows.length,
      args.recordsLength,
      `${args.tableName} should have got created on migration`
    );
  }

  /**
   *
   * @param args
   * @param args.tableName
   * @param args.env
   * @param args.envIndex
   * @param args.recordsLength
   * @returns {Promise<void>}
   */
  static async cmdMigrationDownVerify(args) {
    args.env = args.env || "dev";
    args.envIndex = args.envIndex || 0;

    const project = await promisify(jsonfile.readFile)("./config.xc.json");
    const sqlClient = SqlClientFactory.create(
      project.envs[args.env][args.envIndex]
    );

    const exists = await sqlClient.hasTable({ tableName: args.tableName });
    should.equal(
      exists.data.value,
      false,
      `${args.tableName} table should have got created on migration`
    );

    const rows = await sqlClient.selectAll(
      project.envs[args.env][args.envIndex].meta.tableName
    );
    should.equal(
      rows.length,
      args.recordsLength,
      `${args.tableName} table should have got created on migration`
    );
  }

  static async cmdMigrationUp(args) {
    const cli = new SqlMigratorCli(args);
    await cli.handle();
  }

  static async cmdMigrationCreateVerify(args) {
    const { upStatement } = args;
    const { downStatement } = args;
    const { recordsLength } = args;
    const { dbAlias } = args;

    let files = [];

    files = await promisify(glob)(`./server/tool/${dbAlias}/migrations/*.up.sql`);
    console.log(files);
    should.equal(
      files.length,
      recordsLength,
      `/server/tool/${dbAlias}/migrations up file is not created`
    );

    await promisify(fs.writeFile)(
      files[files.length - 1],
      upStatement,
      "utf-8"
    );

    files = await promisify(glob)(
      `./server/tool/${dbAlias}/migrations/*.down.sql`
    );
    should.equal(
      files.length,
      recordsLength,
      `./server/tool/${dbAlias}} down files is not created`
    );
    await promisify(fs.writeFile)(
      files[files.length - 1],
      downStatement,
      "utf-8"
    );
  }

  static async cmdMigrationDown(args) {
    const cli = new SqlMigratorCli(args);
    await cli.handle();
  }

  /**
   *
   * @param args
   * @param args.env
   * @param args.dbAlias
   * @returns {Promise<void>}
   */
  static async cmdMigrationCleanVerify(args) {
    let exists = await promisify(fs.exists)("./server/tool/primary");
    should.equal(
      exists,
      false,
      "./server/tool/primary is still left after clean"
    );

    exists = await promisify(fs.exists)("./server/tool/primary/migrations");
    should.equal(
      exists,
      false,
      "./server/tool/primary/migrations is still left after clean"
    );

    exists = await promisify(fs.exists)("./server/tool/secondary");
    should.equal(
      exists,
      false,
      "./server/tool/secondary is still left after clean"
    );

    exists = await promisify(fs.exists)("./server/tool/secondary/migrations");
    should.equal(
      exists,
      false,
      "./server/tool/secondary/migrations is still left after clean"
    );

    // database exists in all environments

    const project = await promisify(jsonfile.readFile)("./config.xc.json");

    for (const key in project.envs) {
      for (var i = 0; i < project.envs[key].length; ++i) {
        const connection = project.envs[key][i];

        if (connection === "sqlite3") {
          const key = "dev";

          for (var i = 0; i < project.envs[key].length; ++i) {
            const sqlClient = SqlClientFactory.create(connection);
            exists = await sqlClient.hasDatabase({
              databaseName: connection.connection.connection.filename
            });
            should.equal(
              exists.data.value,
              false,
              `${key}/${
                connection.connection.connection.filename
              } do not exists`
            );
          }
        } else {
          try {
            exists = { data: { value: false } };
            const sqlClient = SqlClientFactory.create(connection);
            exists = await sqlClient.hasDatabase({
              databaseName: connection.connection.database
            });
          } catch (e) {
            // exists.data = {false};
          }

          should.equal(
            exists.data.value,
            false,
            `${key}/${connection.connection.database} do not exists`
          );
        }

        // exists = await sqlClient.hasTable({tableName:connection.meta.tableName});
        // should.equal(
        //   exists,
        //   false,
        //   `${key}/${$connection.connection.database}/${
        //     connection.meta.tableName
        //   } do not exists`
        // );
      }
    }
  }

  static async cmdMigrationClean(args) {
    const cli = new SqlMigratorCli(args);
    await cli.handle();
  }

  /**
   *
   * @param {object} - args for future reasons
   * @returns {Promise<void>}
   */
  static async cmdInitVerify(args = {}) {
    /** ************** START : init verify *************** */
    await this.checkFileExists(
      "./config.xc.json",
      true,
      "config.xc.json is not created on init"
    );
    await this.checkFileExists(
      "./xmigrator",
      true,
      "./xmigrator is not created on init"
    );
    await this.checkFileExists(
      "./server/tool/primary",
      true,
      "./server/tool/primary is not created on init"
    );
    await this.checkFileExists(
      "./server/tool/primary/migrations",
      true,
      "./server/tool/primary/migrations is not created on init"
    );
    await this.checkFileExists(
      "./server/tool/secondary",
      true,
      "./server/tool/secondary is not created on init"
    );
    await this.checkFileExists(
      "./server/tool/secondary/migrations",
      true,
      "./server/tool/secondary/migrations is not created on init"
    );
    /** ************** END : init verify *************** */
  }

  /**
   *
   * @param {object} - args
   * @returns {Promise<void>}
   */
  static async cmdSyncVerify() {
    const project = await promisify(jsonfile.readFile)("./config.xc.json");

    try {
      for (const key in project.envs) {
        for (let i = 0; i < project.envs[key].length; ++i) {
          const connection = project.envs[key][i];
          const sqlClient = SqlClientFactory.create(connection);

          if (connection.client === "sqlite3") {
            let exists = await sqlClient.hasDatabase({
              databaseName: connection.connection.connection.filename
            });
            should.equal(
              exists.data.value,
              true,
              `${key}: /${
                connection.connection.connection.filename
              } do not exists`
            );

            exists = await sqlClient.hasTable({
              tableName: connection.meta.tableName
            });
            should.equal(
              exists.data.value,
              true,
              `/${connection.connection.connection.filename}/${
                connection.meta.tableName
              } do not exists`
            );
          } else if (connection.client === "oracledb") {
            let exists = await sqlClient.hasDatabase({
              databaseName: connection.connection.user
            });
            should.equal(
              exists.data.value,
              true,
              `${key}/${connection.connection.user} do not exists`
            );

            exists = await sqlClient.hasTable({
              tableName: connection.meta.tableName
            });
            should.equal(
              exists.data.value,
              true,
              `${key}/${connection.connection.database}/${
                connection.meta.tableName
              } do not exists`
            );
          } else {
            let exists = await sqlClient.hasDatabase({
              databaseName: connection.connection.database
            });
            should.equal(
              exists.data.value,
              true,
              `${key}/${connection.connection.database} do not exists`
            );

            exists = await sqlClient.hasTable({
              tableName: connection.meta.tableName
            });
            should.equal(
              exists.data.value,
              true,
              `${key}/${connection.connection.database}/${
                connection.meta.tableName
              } do not exists`
            );
          }
        }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static sleep(milliSeconds = 1100) {
    const until = new Date().getTime() + milliSeconds;
    while (new Date().getTime() < until) {}
  }
}

module.exports = TestUtil;
