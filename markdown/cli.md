# for rest apis
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module blog 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module blog --dbAlias secondary
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module auth --nomodel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module.router blog --nomodel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module.service blog --nomodel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module.middleware blog --nomodel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module.policy blog --nomodel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
xc gen.module.model blog --nomodel
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

client to server
    connect
    request
    response (progress function in server)
    finished
        what is the next step
        eg : ga -> npm install; nrd;
        
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -        
        
# One command to generate REST APIs and GraphQL APis for any database with code 
# Setup and Usage

```
npm install -g xc-cli

Usage: xc [options]

Options:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    app.install
    app.open
    app.uninstall
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gen.apis                        Generates REST APIs for db URLs   
    gen.apis.rest                   Generates REST APIs for db URLs
    gen.apis.graphql                Generates GraphQL APIs for db URLs

    gen.rmf                         Removes everything in this folder                       
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -     
    gen.module                      Generates a Module
                                    xc gm blog 
                                    xc gm auth --nomodel
    gen.module.router               Generates a Router
    gen.module.resolver             Generates a Router
    gen.module.service              Generates a Service
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
    gen.component                   Generates component
                                    xc gc notification 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    gen.gql.type                    Generates a GraphQL type class
    gen.gql.schema                  Generates Schema  
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    db.migrate.init
    db.migrate.up
    db.migrate.down
    db.migrate.sync
    db.migrate.list
    db.migrate.clean
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    add.env                  add an environment
    add.db                   add a database to environment
  
    help                     output usage information

```


# commands

xc gm -m auth
xc gm   => generates in current folder
xc gmr  => generates in current folder
xc gms  => genera        



                    