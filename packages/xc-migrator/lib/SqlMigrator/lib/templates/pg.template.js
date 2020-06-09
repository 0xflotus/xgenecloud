const {DOCKER_DB_HOST, DOCKER_DB_PORT} = process.env;

module.exports = {
  title: "default",
  envs: {
    dev: {
      db: [
        {
          client: "pg",
          connection: {
            host: DOCKER_DB_HOST || "localhost",
            port: DOCKER_DB_PORT || 5432,
            user: "postgres",
            password: "password",
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
      db: [
        {
          client: "pg",
          connection: {
            host: DOCKER_DB_HOST || "localhost",
            port: DOCKER_DB_PORT || 5432,
            user: "postgres",
            password: "password",
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
