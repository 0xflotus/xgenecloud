const Util = require('./util/Util');
const colors = require('colors');
const shell = require('shelljs');
const MigrationMgr = require('./mgr/MigrationMgr');
const NewMgr = require('./mgr/NewMgr');
const PermissionsMgr = require('./mgr/PermissionsMgr')
const AppMgr = require('./mgr/AppMgr')
const SocialMgr = require('./mgr/SocialMgr');
const client = require('./mgr/Client');
const ComponentMgr = require('./mgr/ComponentMgr');
const ModelMgr = require('./mgr/ModelMgr');

let cmdProcessedOnce = 0;
let cmdOriginalArgs = null;

class CliMgr {

  static async runCmd(str) {
    shell.echo(`\nNow, executing command : ${str}\n\n`.blue);
    if (shell.exec(str).code !== 0) {
      shell.echo(`\n\nError running command internally\n\n\t"${str}"`.red);
      shell.echo(`\nExiting...`.red);
      shell.exit(1);
    }
  }

  static async process(args) {

    cmdOriginalArgs = cmdOriginalArgs ? cmdOriginalArgs : args;

    try {
if(args._ && args._.length)
      switch (args._[0]) {

        case 'man':
          if(args._.length > 1) {
            Util.showHelpForCommand(args);
          } else {
            Util.showHelp(args);
          }

          process.exit(0);
          break;

        /**************** START : new project with apis creation ****************/
        case 'n':
        case 'new':
          if (await NewMgr.getNewProjectInput(args)) {
            await client.requestSend(args)
          } else {
            process.exit(0)
          }

          break;

        /**************** END : new project with apis creation ****************/

        /**************** START : apis creation ****************/
        case 'ga':
        case 'gar':
        case 'gen.apis':
        case 'gen.apis.rest':
          //console.log(`xc : Generating REST APIs`.green, args);
          await client.requestSend(args);
          break;

        case 'gag':
        case 'gen.apis.graphql':
        case 'gen.apis.gql':
          //console.log(`xc : Generating GraphQL APIs`.green);
          await client.requestSend(args);
          break;
        /**************** END : apis creation ****************/


        case 'gm':
        case 'gen.module':
          await client.requestSend(args);
          break;

        /**************** START : rest components scaffolding ****************/
        case 'gmr':
        case 'gen.module.router':
          await client.requestSend(args);
          break;

        case 'gmm':
        case 'gen.module.middleware':
          await client.requestSend(args);
          break;

        case 'gms':
        case 'gen.module.service':
          await client.requestSend(args);
          break;
        /**************** END : rest components scaffolding ****************/


        /**************** START : graphql components scaffolding ****************/
        case 'ggm':
        case 'gen.gql.module':
          await client.requestSend(args);
          break;

        case 'ggmr':
        case 'gen.gql.module.resolver':
          await client.requestSend(args);
          break;

        case 'ggmm':
        case 'gen.gql.module.middleware':
          await client.requestSend(args);
          break;

        case 'ggms':
        case 'gen.gql.module.service':
          await client.requestSend(args);
          break;
        /**************** END : graphql components scaffolding ****************/


        /**************** START : Migration stuff ****************/
        case 'db.migrate.init' :
        case 'dmi' :
          console.log('migration init', args);
          await MigrationMgr.init(args);
          process.exit(0);
          break;

        case 'db.migrate.sync' :
        case 'dms' :
          console.log('migration sync', args);
          await MigrationMgr.sync(args);
          process.exit(0);
          break;

        case 'db.migrate.list' :
        case 'dml' :
          console.log('migration list');
          await MigrationMgr.list(args);
          process.exit(0);
          break;

        case 'db.migrate.create' :
        case 'dmc' :
          console.log('migration create', args);
          await MigrationMgr.create(args);
          process.exit(0);
          break;

        case 'db.migrate.up' :
        case 'dmu' :
          console.log('migration create', args);
          await MigrationMgr.up(args);
          process.exit(0);
          break;

        case 'db.migrate.down' :
        case 'dmd' :
          console.log('migration down', args);
          await MigrationMgr.down(args);
          process.exit(0);
          break;

        case 'db.migrate.term' :
        case 'dmt' :
          console.log('migration init', args);
          await MigrationMgr.clean(args);
          process.exit(0);
          break;

        case 'db.migrate.sql.dump' :
        case 'dmsd' :
          console.log('migration meta dump', args);
          await client.requestSend(args);
          break;
        /**************** END : Migration stuff ****************/


        /**************** START : ACL stuff ****************/
        case 'permissions.set':
        case 'ps':
          await PermissionsMgr.set(args)
          process.exit(0);
          break;
        case 'permissions.get':
        case 'pg':
          await PermissionsMgr.get(args)
          process.exit(0);
          break;
        case 'permissions.role.add':
        case 'pra':
          await PermissionsMgr.userAdd(args)
          process.exit(0);
          break;
        case 'permissions.role.delete':
        case 'prd':
          await PermissionsMgr.userDelete(args)
          process.exit(0);
          break;
        case 'permissions.role.rename':
        case 'prr':
          await PermissionsMgr.userRename(args)
          process.exit(0);
          break;
        /**************** END : ACL stuff ****************/

        /**************** START : App stuff ****************/
        case 'app.install':
        case 'ai':
          await AppMgr.install(args);
          process.exit(0);
          break;
        case 'app.open':
        case 'ao':
          await AppMgr.open(args);
          process.exit(0);
          break;

        /**************** END : App stuff ****************/

        /**************** START : Component stuff ****************/
        case 'component.add':
        case 'ca':
          const prev_component_name = await ComponentMgr.add(args);
          if (prev_component_name) {
            args._.push(prev_component_name)
            await client.requestSend(args);
          } else {
            process.exit(0)
          }
          break;

        case 'component.rename':
        case 'cr':
          await ComponentMgr.rename(args);
          process.exit(0);
          break;

        case 'component.delete':
        case 'cd':
          await ComponentMgr.add(args);
          process.exit(0);
          break;

        /**************** END : Component stuff ****************/


        /**************** START : Social media stuff ****************/
        case 'share':
          await SocialMgr.shareSocial(args);
          process.exit(0);
          break;

        case 'noshare':
          await SocialMgr.setShareRules('dontPrompt', true);
          process.exit(0);
          break;
        /**************** END : Social media stuff ****************/

        /**************** START : Remove stuff ****************/
        case 'remove.model.backup':
        case 'rmb':
          await ModelMgr.removeModelBackups(args);
          process.exit(0);
          break;

        /**************** END : Remove stuff ****************/

        // case 'menu':
        // case 'm':
        //   await Menu.prepareCmd(client, args);
        //   // console.log(args);
        //   await this.process(client, args);
        //   break;

        case 'yelp':
        case 'y':
          Util.showHelp(args);
          process.exit(0)
          break;


        default:
          if (!cmdProcessedOnce) {
            cmdProcessedOnce = 1;
            await this.process(client, Util.getShortVersion(args));
          } else {
            console.log(`\nUnknown command. ${cmdOriginalArgs._[0]} -- please see help below`);
            Util.showHelp(cmdOriginalArgs);
            process.exit(0)
          }
          break;
      }
    } catch (e) {
      throw e;
    }
  }
}

//expose class
module.exports = CliMgr;