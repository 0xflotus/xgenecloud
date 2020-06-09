/* eslint-disable func-names */
const KnexMigrator = require("../../SqlMigrator/lib/KnexMigrator");

process.on("uncaughtException", function(err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});

process.on("unhandledRejection", function(err) {
  console.error("> > > ", err);
  process.exit(1);
});

class Cli {

  constructor(commander) {
    this.program = commander;
    this.args = commander.args;
    this.migrator = new KnexMigrator();
  }

  async _handleMigrationUp() {
    // console.log('Handling migration UP');

    let migrationSteps = this.program.steps || 9999;

    if (this.program.file) {
      migrationSteps = 0;
    }

    await this.migrator.migrationsUp({
      env: this.program.env || "dev",
      dbAlias: this.program.dbAlias || "primary",
      migrationSteps,
      onlyList: this.program.list,
      file: this.program.file || null
    });
  }

  async _handleMigration() {
    if (this.args.length < 2) {
      console.log("Show CLI help");
      return;
    }

    switch (this.args[1]) {
      case "create":
      case "c":
        // console.log('Handling migration create');
        const files = await this.migrator.migrationsCreate({
          dbAlias: this.program.dbAlias || "primary"
        });
        break;

      case "up":
      case "u":
        await this._handleMigrationUp(this.args);
        break;

      case "down":
      case "d":
        // console.log('Handling migration DOWN');

        let migrationSteps = this.program.steps || 9999;

        if (this.program.file) {
          migrationSteps = 0;
        }

        await this.migrator.migrationsDown({
          env: this.program.env || "dev",
          dbAlias: this.program.dbAlias || "primary",
          migrationSteps,
          onlyList: this.program.list,
          file: this.program.file || null
        });
        break;

      default:
        break;
    }
  }

  async _handleInit(args) {
    await this.migrator.init(args);
  }

  async _handleSync() {
    await this.migrator.sync();
  }

  async _handleClean(args) {
    await this.migrator.clean(args);
  }

  async handle() {
    console.log("> > > > > > >");

    let args = {};

    console.log("Handling args:", this.args, this.args.length);

    if (this.args.length === 0) {
      console.log("Show CLI help");
      return;
    }

    switch (this.args[0]) {
      case "init":
      case "i":
        console.log("Handling init");
        args = {};
        args.type = this.args[1] || "mysql";
        await this._handleInit(args);
        break;

      case "sync":
      case "s":
        await this._handleSync();
        break;

      case "clean":
      case "c":
        console.log("Handling clean");
        args = {};
        args.dbAlias = this.program.dbAlias || null;
        args.env = this.program.env || null;
        args.json = this.program.json || false;
        await this._handleClean(args);
        break;

      case "migration":
      case "m":
        // console.log('Handling migration');
        await this._handleMigration();
        break;

      case "help":
      case "h":
        console.log("Show CLI help");
        break;

      default:
        console.log("Unknown option");
        console.log("Show CLI help");
        break;
    }

    console.log("< < < < < < < < < <");

    return 0;
  }
}

module.exports = Cli;
