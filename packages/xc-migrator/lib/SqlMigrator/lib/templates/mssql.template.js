
const {DOCKER_DB_HOST, DOCKER_DB_PORT} = process.env;

module.exports = {
  title: "default",
  envs: {
    dev: {
      api:{},
      db: [
        {
          client: "mssql",
          connection: {
            host: DOCKER_DB_HOST || "localhost",
            port: DOCKER_DB_PORT ? parseInt(DOCKER_DB_PORT) : null || 1433,
            user: "sa",
            password: "Password123.",
            database: "default_dev"
          },
          meta: {
            tableName: "_evolutions",
            dbAlias: "primary"
          }
        }
      ]
    },
    test: {
      api:{},
      db: [
        {
          client: "mssql",
          connection: {
            host: DOCKER_DB_HOST || "localhost",
            port: DOCKER_DB_PORT ? parseInt(DOCKER_DB_PORT) : null || 1433,
            user: "sa",
            password: "Password123.",
            database: "default_test"
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
