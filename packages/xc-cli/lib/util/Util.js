const shell = require('shelljs');
const path = require('path');

class Util {

  static getShortVersion(args) {

    let shortVersion = JSON.parse(JSON.stringify(args));

    if (shortVersion._.length) {
      shortVersion._[0] = shortVersion._[0].split('.').map(a => a[0]).join('')
    }
    return shortVersion;
  }

  static isProjectGraphql() {
    const currentProjectJson = require(path.join(process.cwd(), 'config.xc.json'))
    return currentProjectJson.meta.projectType.toLowerCase() === 'graphql';
  }

  static showHelp(args) {
    console.log(`
Usage: xc [commands]

Man page : 
    man <command>               Outputs a man page for the command
    
Commands:
    new                         Creates a new project by taking database credentials as input
    gen.apis                    Generate REST APIs for db URLs
    gen.apis.rest               Generate REST APIs for db URLs
    gen.apis.graphql            Generate GraphQL APIs for db URLs
    
    gen.module                  Generate a Module (table, model, router/resolver, middleware & service)
    
    db.migrate.init             Initialises migration for the project in filesystem
    db.migrate.sync             Initialises migration for the project in databases
    db.migrate.list             Lists all migrations for an environment and dbAlias 
    db.migrate.create           Creates an empty migration for an environment and dbAlias
    db.migrate.up               Applies migrations for an environment and dbAlias
    db.migrate.down             Reverses migrations for an environment and dbAlias

    permissions.set             Set permission for model(s) userRole(s)
    permissions.get             Get permission for model(s) userRole(s)
    permissions.role.add        Adds user role to all models 
    permissions.role.rename     Renames a user role in all models
    permissions.role.delete     Deletes a user role in all models

    component.add               Scaffolds a new component in the project

`);
  }

  static manNew() {
    return `
${'COMMAND : '.bold}
  ${'xc new'.bold} - Creates new projects and creates APIs instantly for database inputted.
  
${'SYNOPSIS : '.bold}
  ${'xc new'.bold} ${'<projectName>'.bold}

${'ARGS :'.bold}
  
  The following are arguments available for new:
  
  ${'projectName'.bold} new project name 

${'VARIATIONS :'.bold}

  None
       
  ${'Examples with notes : '.bold}
        ${'xc new airbnb'.bold}
        - Takes in database credentials and API type as input 
        - Database can be new or existing database
        - Creates a new folder by name 'airbnb'
        - Creates a new project 'airbnb' within xgenecloud desktop tool 
        - Scaffolds REST/GraphQL APIs for the database specified
        - These database can be already existing or new databases.      
`
  }

  static manGenApisRest() {
    return `
${'COMMAND : '.bold}
  ${'xc gen.apis.graphql'.bold} - generates REST APIs for an existing/new databases of a project.
  
${'SYNOPSIS : '.bold}
  ${'xc gen.apis.rest'.bold} [${'-u'.bold} DatabaseURL(s)]

${'VARIATIONS :'.bold}

  The following variations are available:
  
  ${'<>'.bold}    If ${'no'.bold} option is passed, this generates REST APIs for databases current project
        that are within project file config.xc.json
  
  ${'-u'.bold}    ${'<Database URLs>'.bold} Creates a new project for an existing/new database
        For mysql : mysql://localhost:3306?u=root&p=password&d=ecommerce
        For pg    : pg://localhost:5432?u=postgres&p=password&d=ecommerce
        For mssql : mssql://localhost:1433?u=sa&p=Password123.&d=ecommerce
        
  ${'Examples with notes : '.bold}
        ${'xc gen.apis.rest -u mysql://localhost:3306?u=root&p=password&d=ecommerce'.bold}
        - Generates REST apis for a mysql database 'ecommerce'
        - Uses current directory as project name
        - If database exists - REST APIs will be created for the tables within it.
        - If database doesnt exist - it will be created.
        
        ${'xc gen.apis.rest -u pg://localhost:5432?u=postgres&p=password&d=ecommerce'.bold}
        - Generates REST apis for a postgres database 'ecommerce'
        
        ${'xc gen.apis.rest -u mssql://localhost:1433?u=sa&p=Password123.&d=ecommerce'.bold}
        - Generates REST apis for a mssql database 'ecommerce'
        
        ${`xc gen.apis.rest -u mysql://localhost:3306?u=root&p=password&d=ecommerce
                         -u pg://localhost:5432?u=postgres&p=password&d=crm`.bold}
        - Generates REST apis for multiple databases 'ecommerce' & 'crm'.
        - These database can be already existing or new databases.      
`
  }

  static manGenApisGraphql() {
    return `
${'COMMAND : '.bold}
  ${'xc gen.apis.graphql'.bold} - generates GraphQL APIs for an existing/new databases of a project.
  
${'SYNOPSIS : '.bold}
  ${'xc gen.apis.graphql'.bold} [${'-u'.bold} DatabaseURL(s)]

${'VARIATIONS :'.bold}

  The following variations are available:
  
  ${'<>'.bold}    If ${'no'.bold} option is passed, this generates GraphQL APIs for databases current project
        that are within project file config.xc.json
  
  ${'-u'.bold}    ${'<Database URLs>'.bold} Creates a new project for an existing/new database
        For mysql : mysql://localhost:3306?u=root&p=password&d=ecommerce
        For pg    : pg://localhost:5432?u=postgres&p=password&d=ecommerce
        For mssql : mssql://localhost:1433?u=sa&p=Password123.&d=ecommerce
        
  ${'Examples with notes : '.bold}
        ${'xc gen.apis.graphql -u mysql://localhost:3306?u=root&p=password&d=ecommerce'.bold}
        - Generates GraphQL apis for a mysql database 'ecommerce'
        - Uses current directory as project name
        - If database exists - GraphQL APIs will be created for the tables within it.
        - If database doesnt exist - it will be created.
        
        ${'xc gen.apis.graphql -u pg://localhost:5432?u=postgres&p=password&d=ecommerce'.bold}
        - Generates GraphQL apis for a postgres database 'ecommerce'
        
        ${'xc gen.apis.graphql -u mssql://localhost:1433?u=sa&p=Password123.&d=ecommerce'.bold}
        - Generates GraphQL apis for a mssql database 'ecommerce'
        
        ${`xc gen.apis.graphql -u mysql://localhost:3306?u=root&p=password&d=ecommerce
                            -u pg://localhost:5432?u=postgres&p=password&d=crm`.bold}
        - Generates GraphQL apis for multiple databases 'ecommerce' & 'crm'.
        - These database can be already existing or new databases.      
`
  }

  static manGenModule() {
    return `
${'COMMAND : '.bold}
  ${'xc gen.module'.bold} - Creates a table and scaffolds the respective module files 
                  In REST project    - (router, service, middleware, policy, model, meta) 
                  In GraphQL project - (resolver, service, middleware, policy, model, meta)
  
${'SYNOPSIS : '.bold}
  ${'xc gen.module'.bold} ${'module(s)'.bold} [--nomodel] [--router] [--service] [--dbAlias]

${'OPTIONS :'.bold}

  The following options are available:
  
  ${'--nomodel'.bold}  Scaffolds module without creating table and model, meta files.
        For mysql : mysql://localhost:3306?u=root&p=password&d=ecommerce
        For pg    : pg://localhost:5432?u=postgres&p=password&d=ecommerce
        For mssql : mssql://localhost:1433?u=sa&p=Password123.&d=ecommerce

  ${'--dbAlias'.bold}  Defaults to 'primary' database if not provided to create the table 
  ${'--router'.bold}   Will create router with model - service file will be skipped //todo
  ${'--service'.bold}  Will create service with model - router file will be skipped //todo

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc gen.module blog'.bold}
        - Creates blog table in primary database and scaffolds files \n\t  (router/resolver,middleware,policy,service,model,meta) files
        - Uses current directory as project name
        - If database exists - GraphQL APIs will be created for the tables within it.
        - If database doesnt exist - it will be created.  
        
        ${'xc gen.module blog.comment'.bold}
        - Multiple tables can be created with '.' seperated files
        - Creates blog and comment table in primary database with all component files

        ${'xc gen.module blog --dbAlias secondary'.bold}
        - Creates table and module for secondary database
        
        ${'xc gen.module blog --nomodel'.bold}
        - Creates blog model without creating table
        - All folder/files in respective components will be created in parent table of primary table

        
`
  }

  static manDbMigrateInit() {
    return `
${'COMMAND : '.bold}
  ${'xc db.migrate.init'.bold} - Initialises a database migration project freshly - only necessary files are created
                     - This is a legacy command and will not be required in developer flow
                     - Instead use ${'xc new'.bold}
                     - After running this command - edit config.xc.json and run xc db.migrate.sync 
  
${'SYNOPSIS : '.bold}
  ${'xc db.migrate.init'.bold} ${'--type mysql|pg|mssql|sqlite3'.bold}

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc db.migrate.init --type mysql'.bold}
        - Creates migration project of type mysql
        - xc db.migrate.sync has to be run after command
`
  }

  static manDbMigrateSync() {
    return `
${'COMMAND : '.bold}
  ${'xc db.migrate.sync'.bold} - Initialises migrations in the databases of project  
                     - Creates _evolutions table for database if it doesn't exists
                     
${'SYNOPSIS : '.bold}
  ${'xc db.migrate.sync'.bold} [${'--env'.bold} <environment>]  [${'--dbAlias'.bold} <databaseAlias>] 
  
${'OPTIONS :'.bold}

  The following options are available:
  ${'--env'.bold}      Defaults to 'dev' environment if not provided 
  ${'--dbAlias'.bold}  If not provided all databases within environment are initialised 
  
${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc db.migrate.sync'.bold}
        - Initialises migration for all databases within 'dev' environment

        ${'xc db.migrate.sync --env production'.bold}
        - Initialises migration for all databases within 'production' environment
        
        ${'xc db.migrate.sync --env production --dbAlias secondary'.bold}
        - Initialises migration for 'secondary' database within 'production' environment
`
  }

  static manDbMigrateList() {
    return `
${'COMMAND : '.bold}
  ${'xc db.migrate.list'.bold} - Lists all the migrations    
                     
${'SYNOPSIS : '.bold}
  ${'xc db.migrate.list'.bold} [${'--env'.bold} <environment>]  [${'--dbAlias'.bold} <databaseAlias>] 
  
${'OPTIONS :'.bold}

  The following options are available:
  ${'--env'.bold}      Defaults to 'dev' environment if not provided 
  ${'--dbAlias'.bold}  Defaults to 'primary' environment if not provided 
  ${'--all'.bold}      List all migrations instead of just pending //todo
  
${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc db.migrate.list'.bold}
        - Lists all migrations within 'dev' environment and 'primary' database

        ${'xc db.migrate.list --env production'.bold}
        - Lists all migrations within 'production' environment and 'primary' database
        
        ${'xc db.migrate.list --env production --dbAlias secondary'.bold}
        - Lists all migrations within 'production' environment and 'secondary' database
`
  }

  static manDbMigrateCreate() {
    return `
${'COMMAND : '.bold}
  ${'xc db.migrate.create'.bold} - Creates an empty migration for environment and dbAlias    
                     
${'SYNOPSIS : '.bold}
  ${'xc db.migrate.create'.bold} [${'--env'.bold} <environment>]  [${'--dbAlias'.bold} <databaseAlias>] 
  
${'OPTIONS :'.bold}

  The following options are available:
  ${'--env'.bold}      Defaults to 'dev' environment if not provided 
  ${'--dbAlias'.bold}  Defaults to 'primary' environment if not provided 
  
${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc db.migrate.create'.bold}
        - Creates a migration within 'dev' environment and 'primary' database

        ${'xc db.migrate.create --env production'.bold}
        - Creates a migration within 'production' environment and 'primary' database
        
        ${'xc db.migrate.create --env production --dbAlias secondary'.bold}
        - Creates a migration within 'production' environment and 'secondary' database
`
  }

  static manDbMigrateUp() {
    return `
${'COMMAND : '.bold}
  ${'xc db.migrate.up'.bold} - Applies all pending migrations    
                     
${'SYNOPSIS : '.bold}
  ${'xc db.migrate.up'.bold} [${'--env'.bold} <environment>] [${'--dbAlias'.bold} <databaseAlias>] \n\t\t\t[${'--steps'.bold} <number>]  [${'--file'.bold} <number>]
  
${'OPTIONS :'.bold}

  The following options are available:
  ${'--steps'.bold}    Number of pending migrations to apply
  ${'--file'.bold}     Filename till migrations has to be applied
  ${'--env'.bold}      Defaults to 'dev' environment if not provided 
  ${'--dbAlias'.bold}  Defaults to 'primary' environment if not provided
  ${'--sqlContentMigrate'.bold}  Defaults to 1 
                       On '0' doesn't apply SQL contents 
                            but updates _evolutions table that migration has been applied 
  
${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc db.migrate.up'.bold}
        - Applies all pending migrations

        ${'xc db.migrate.up --env production --steps 1'.bold}
        - Applies one pending migrations in 'production' environment
        
        ${'xc db.migrate.up --env production --dbAlias secondary --steps 1'.bold}
        - Applies one pending migrations in 'production' environment for 'secondary' database
`
  }

  static manDbMigrateDown() {
    return `
${'COMMAND : '.bold}
  ${'xc db.migrate.down'.bold} - Reverses all migrations or by steps or by till the filename    
                     
${'SYNOPSIS : '.bold}
  ${'xc db.migrate.down'.bold} [${'--env'.bold} <environment>] [${'--dbAlias'.bold} <databaseAlias>] \n\t\t\t[${'--steps'.bold} <number>]  [${'--file'.bold} <number>]
  
${'OPTIONS :'.bold}

  The following options are available:
  ${'--steps'.bold}    Number of applied migrations to apply
  ${'--file'.bold}     Filename till migrations has to be applied
  ${'--env'.bold}      Defaults to 'dev' environment if not provided 
  ${'--dbAlias'.bold}  Defaults to 'primary' environment if not provided 
  ${'--sqlContentMigrate'.bold}  Defaults to 1 
                     On '0' doesn't apply SQL contents 
                          but updates _evolutions table that migration has been applied 

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc db.migrate.down'.bold}
        - Reverses all applied migrations

        ${'xc db.migrate.down --env production --steps 1'.bold}
        - Reverses one applied migrations in 'production' environment
        
        ${'xc db.migrate.down --env production --dbAlias secondary --steps 1'.bold}
        - Reverses one applied migrations in 'production' environment for 'secondary' database
`
  }


  static manDbMigrateTerm() {
    return `
${'COMMAND : '.bold}
  ${'xc db.migrate.term'.bold} - Deprecated. Terminates all databases in environment.    
`
  }

  static manComponentAdd() {
    return `
${'COMMAND : '.bold}
  ${'xc component.add'.bold} - Adds a new component in server/components directory by taking user input
                        on where to place the component in initialisation order. 
                     
${'SYNOPSIS : '.bold}
  ${'xc component.add'.bold} <componentName>

${'ARGS :'.bold}

  The following are arguments to function:
  ${'componentName'.bold}   Name of the new component 
  
${'OPTIONS :'.bold}

  The following options are available:
    None

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc component.add cache'.bold}
        - Adds a cache component  
`
  }

  static manAppInstall() {
    return `
${'COMMAND : '.bold}
  ${'xc app.install'.bold} - Download and starts xgenecloud desktop application installation    
                     
${'SYNOPSIS : '.bold}
  ${'xc app.install'.bold}
  
${'OPTIONS :'.bold}

  The following options are available:
    None

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc app.install'.bold}
`
  }

  static manAppOpen() {
    return `
${'COMMAND : '.bold}
  ${'xc app.open'.bold} - Opens the xgenecloud desktop application (mac and linux only)    
                     
${'SYNOPSIS : '.bold}
  ${'xc app.open'.bold}
  
${'OPTIONS :'.bold}

  The following options are available:
    None

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc app.open'.bold}
`
  }


  static manPermissionsSet() {
    return `
${'COMMAND : '.bold}
  ${'xc permissions.set'.bold} - Sets model(s) permission(s) for user role(s)   
  
${'SYNOPSIS : '.bold}
  # For REST API project
  ${'xc permissions.set'.bold} [${'model(s)'.bold} | $] [${'userType(s)'.bold} | $] [${'read|write)'.bold} = 1 | 0]
  
  # For GraphQL API project
  ${'xc permissions.set'.bold} [${'model(s)'.bold} | $] [${'userType(s)'.bold} | $] [${'read|write|resolverFunction)'.bold} = 1 | 0]

${'ARGS :'.bold}

  The following are arguments to function:
  ${'model(s)'.bold}   Model name | Multiple models with dot seperated | $ - means all models 
  ${'userType(s)'.bold}User role name | Multiple user role names with dot separated | $ - means all user models
  ${'permissions(s)'.bold}Permissions - read | write | get | post | put | delete | patch | resolverFunc | $ - means all permissions
${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc permissions.set blog guest read=1'.bold}
        - For 'blog' model 'guest' user type SET 'read' permission 

        ${'xc permissions.set $ guest read=1'.bold}
        - For 'all' models 'guest' user type SET 'read' permission 

        ${'xc permissions.set $ $ read=1'.bold}
        - For 'all' models 'all' user types SET 'read' permission 

        ${'xc permissions.set $ $ read=1 write=1'.bold}
        - For 'all' models 'all' user types SET 'read' and 'write' permission 
`
  }

  //todo
  static manPermissionsGet() {
    return `
${'COMMAND : '.bold}
  ${'xc permissions.get'.bold} - Gets model permission(s) for all the user roles   
  
${'SYNOPSIS : '.bold}
  # For REST API project
  ${'xc permissions.get'.bold} [${'model'.bold}] 
  
  # For GraphQL API project
  ${'xc permissions.get'.bold} [${'model(s)'.bold} ]

${'ARGS :'.bold}

  The following are arguments to function:
  ${'model'.bold}   Model name 
  
${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc permissions.get blog'.bold}
        - Get all permissions of blog model `
  }


  static manPermissionsUserAdd() {
    return `
${'COMMAND : '.bold}
  ${'xc permissions.role.add'.bold} - Add a new user role for all models  
                  read is set default to 1 
                  write is set default to 1
  
${'SYNOPSIS : '.bold}
  ${'xc permissions.role.add'.bold} ${'userRole'.bold} <userRole>

${'ARGS :'.bold}

  The following are the arguments : 
  
  ${'userRole'.bold} new user role    

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc permissions.role.add manager'.bold}
        - Adds user role 'manager' to all the models
        
`
  }


  static manPermissionsUserDelete() {
    return `
${'COMMAND : '.bold}
  ${'xc permissions.role.delete'.bold} - Delete user role from all models  
  
${'SYNOPSIS : '.bold}
  ${'xc permissions.role.delete'.bold} <userRole>

${'ARGS :'.bold}

  The following are the arguments : 
  
  ${'userRole'.bold} User role to be deleted    

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc permissions.role.delete manager'.bold}
        - deletes user role 'manager' from all the models
        
`
  }


  static manPermissionsUserRename() {
    return `
${'COMMAND : '.bold}
  ${'xc permissions.role.rename'.bold} - renames an existing user role  
  
${'SYNOPSIS : '.bold}
  ${'xc permissions.role.rename'.bold} <oldUserRoleName> <newUserRoleName>

${'ARGS :'.bold}

  The following are the arguments : 
  
  ${'oldUserRoleName'.bold} old user role    
  ${'newUserRoleName'.bold} new user role

${'VARIATIONS :'.bold}
 
  None
  
  ${'Examples with notes : '.bold}
        ${'xc permissions.role.rename manager StaffManager'.bold}
        - Renames user role from 'manager' to 'StaffManager' in all the models
        
`
  }

  static showHelpForCommand(args) {


    try {
      switch (args._[1]) {

        case 'new' :
          console.log(Util.manNew());
          break;

        case 'ga':
        case 'gar':
        case 'gen.apis':
        case 'gen.apis.rest':
          console.log(Util.manGenApisRest());
          break;

        case 'gag':
        case 'gen.apis.graphql':
        case 'gen.apis.gql':
          console.log(Util.manGenApisGraphql());
          break;

        case 'gm':
        case 'gen.module':
          console.log(Util.manGenModule());
          process.exit(0);
          break;

        /**************** START : permissions stuff ****************/
        case 'permissions.set' :
        case 'ps' :
          console.log(Util.manPermissionsSet());
          process.exit(0);
          break;

        case 'permissions.get' :
        case 'pg' :
          console.log(Util.manPermissionsGet());
          process.exit(0);
          break;

        case 'permissions.role.add' :
        case 'pra' :
          console.log(Util.manPermissionsUserAdd());
          process.exit(0);
          break;

        case 'permissions.role.rename' :
        case 'prr' :
          console.log(Util.manPermissionsUserRename());
          process.exit(0);
          break;

        case 'permissions.role.delete' :
        case 'prd' :
          console.log(Util.manPermissionsUserDelete());
          process.exit(0);
          break;

        /**************** END : permissions stuff ****************/

        /**************** START : Migration stuff ****************/
        case 'db.migrate.init' :
        case 'dmi' :
          console.log(Util.manDbMigrateInit());
          process.exit(0);
          break;

        case 'db.migrate.sync' :
          console.log(Util.manDbMigrateSync());
        case 'dms' :
          process.exit(0);
          break;

        case 'db.migrate.list' :
        case 'dml' :
          console.log(Util.manDbMigrateList());
          process.exit(0);
          break;

        case 'db.migrate.create' :
        case 'dmc' :
          console.log(Util.manDbMigrateCreate());
          process.exit(0);
          break;

        case 'db.migrate.up' :
        case 'dmu' :
          console.log(Util.manDbMigrateUp());
          process.exit(0);
          break;

        case 'db.migrate.down' :
        case 'dmd' :
          console.log(Util.manDbMigrateDown());
          process.exit(0);
          break;

        case 'db.migrate.term' :
        case 'dmt' :
          console.log(Util.manDbMigrateTerm());
          process.exit(0);
          break;

        case 'db.migrate.sql.dump' :
        case 'dmsd' :
          break;
        /**************** END : Migration stuff ****************/


        /**************** START : app stuff ****************/
        case 'app.install' :
        case 'ai' :
          console.log(Util.manDbMigrateTerm());
          process.exit(0);
          break;

        case 'app.open' :
        case 'ao' :
          console.log(Util.manDbMigrateTerm());
          process.exit(0);
          break;

        /**************** END : app stuff ****************/

        /**************** START : Component stuff ****************/
        case 'component.add' :
        case 'ca' :
          console.log(Util.manComponentAdd());
          process.exit(0);
          break;

        /**************** END : Component stuff ****************/


        default:
          break;
      }
    } catch (e) {
      throw e;
    }

  }

  static async runCmd(str) {
    shell.echo(`\nNow, executing command : ${str}\n\n`.blue);
    if (shell.exec(str).code !== 0) {
      shell.echo(`\n\nError running command internally\n\n\t"${str}"`.red);
      shell.echo(`\nExiting...`.red);
      shell.exit(1);
    }
  }

  async play(sound) {

    switch (sound) {

      case -1:
        break;

      case 'fun':
        break;

    }

  }

}


module.exports = Util;