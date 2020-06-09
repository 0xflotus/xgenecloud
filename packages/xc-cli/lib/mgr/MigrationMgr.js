const {Migrator} = require('xc-migrator');
let migrator = new Migrator()

class MigrationMgr {

  static _getFolder(args) {
    args.folder = args.folder || process.cwd();
  }

  static async init(args) {
    try {
      args.type = args.type || "mysql";
      await migrator.init(args);
    } catch (e) {
      console.log('db.migrate.init : Error occured', e);
    }
  }

  static async sync(args) {
    try {
      this._getFolder(args);
      await migrator.sync(args);
    } catch (e) {
      console.log('db.migrate.sync : Error occured', e);
    }
  }

  static async create(args) {
    try {
      this._getFolder(args)
      await migrator.migrationsCreate({
        folder: args.folder,
        dbAlias: args.dbAlias || "primary"
      });
    } catch (e) {
      console.log('db.migrate.create : Error occured', e);
    }
  }

  static async up(args) {

    try {

      this._getFolder(args)

      let migrationSteps = args.steps || 9999;

      if (args.file) {
        migrationSteps = 0;
      }

      let migrator = new Migrator()
      await migrator.migrationsUp({
        folder: args.folder,
        env: args.env || "dev",
        dbAlias: args.dbAlias || "primary",
        migrationSteps,
        onlyList: args.list,
        sqlContentMigrate: (+args.sqlContentMigrate === 0 ? 0 : 1),
        file: args.file || null
      });

    } catch (e) {
      console.log('db.migrate.up : Error occured', e);
    }
  }

  static async down(args) {

    try {

      this._getFolder(args)

      let migrationSteps = args.steps || 9999;

      if (args.file) {
        migrationSteps = 0;
      }

      await migrator.migrationsDown({
        folder: args.folder,
        env: args.env || "dev",
        dbAlias: args.dbAlias || "primary",
        migrationSteps,
        onlyList: args.list,
        sqlContentMigrate: (+args.sqlContentMigrate === 0 ? 0 : 1),
        file: args.file || null
      });

    } catch (e) {
      console.log('db.migrate.down : Error occured', e);
    }
  }

  static async list(args) {

    try {

      this._getFolder(args)

      let migrationSteps = args.steps || 9999;

      if (args.file) {
        migrationSteps = 0;
      }

      const data = await migrator.migrationsUp({
        folder: args.folder,
        env: args.env || "dev",
        dbAlias: args.dbAlias || "primary",
        migrationSteps,
        onlyList: true,
        file: args.file || null
      });

      console.log(data.data.object.list);

    } catch (e) {
      console.log('db.migrate.up : Error occured', e);
    }

  }

  static async clean(args) {
    try {
      args.type = args.type || "mysql";
      await migrator.clean(args);
    } catch (e) {
      console.log('db.migrate.clean : Error occured', e);
    }
  }


}

//expose class
module.exports = MigrationMgr;