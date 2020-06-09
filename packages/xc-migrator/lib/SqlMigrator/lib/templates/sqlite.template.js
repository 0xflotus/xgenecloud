const path = require("path");

const {DOCKER_DB_FILE} = process.env;

module.exports = {
  title: "default",
  envs: {
    dev: {
      db: [
        {
          client: "sqlite3",
          connection: {
            client: "sqlite3",
            connection: {
              filename:
                DOCKER_DB_FILE ||
                `${path.join(process.cwd(), "xmigrator", "default_dev.db")}`
            },
            useNullAsDefault: true
          },
          meta: {
            tableName: "_evolutions",
            dbAlias: "primary"
          }
        }
      ]
    },
    test: {
      api: {},
      db: [
        {
          client: "sqlite3",
          connection: {
            client: "sqlite3",
            connection: {
              filename:
                DOCKER_DB_FILE ||
                `${path.join(process.cwd(), "xmigrator", "default_test.db")}`
            },
            useNullAsDefault: true
          },
          meta: {
            tableName: "_evolutions",
            dbAlias: "primary"
          }
        }
      ]
    }
  },
  workingEnv: "dev",
  meta: {
    version: '0.5',
    seedsFolder: 'seeds',
    queriesFolder: 'queries',
    apisFolder: 'apis',
    orm: 'sequelize',
    router: 'express'
  }
};
