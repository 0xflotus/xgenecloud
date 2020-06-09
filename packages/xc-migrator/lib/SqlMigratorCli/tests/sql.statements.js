module.exports = {
  mysql: {
    user: {
      up: `CREATE TABLE \`user\` (\n    \`id\` INT NOT NULL AUTO_INCREMENT,\n    \`title\` VARCHAR(45) NULL,\n    PRIMARY KEY (\`id\`)\n);`,
      down: "drop table user;"
    },

    blog: {
      up:
        "CREATE TABLE `blog` (\n    `id` INT NOT NULL AUTO_INCREMENT,\n    `title` VARCHAR(45) NULL,\n    PRIMARY KEY (`id`)\n);",
      down: "drop table blog;"
    }
  },

  pg: {
    user: {
      up: `CREATE TABLE "user" (
  user_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (50) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
 );`,
      down: `DROP TABLE "user";`
    },

    blog: {
      up: `CREATE TABLE "blog" (
  user_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (50) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
 );`,
      down: `DROP TABLE "blog";`
    }
  },

  mssql: {
    user: {
      up:
        'CREATE TABLE "user" (\n  user_id INT PRIMARY KEY,\n  last_name VARCHAR(50) NOT NULL,\n  first_name VARCHAR(50),\n );',
      down: 'DROP TABLE "user";'
    },

    blog: {
      up:
        'CREATE TABLE "blog" (\n  blog_id INT PRIMARY KEY,\n  blog_content VARCHAR(50) NOT NULL,\n );',
      down: 'drop table "blog";'
    }
  },
  // INFO: semicolon is require at the end
  oracledb: {
    user: {
      up:
        'CREATE TABLE "user"\n( user_id number(10) NOT NULL,\n  user_name varchar2(50) NOT NULL\n);',
      down: 'DROP TABLE "user";'
    },

    blog: {
      up:
        'CREATE TABLE "blog"\n( blog_id number(10) NOT NULL,\n  blog_name varchar2(50) NOT NULL\n);',
      down: 'DROP TABLE "blog";'
    }
  },

  sqlite3: {
    user: {
      up:
        "CREATE TABLE user (\n id INTEGER PRIMARY KEY,\n first_name TEXT NOT NULL\n)",
      down: "drop table user"
    },

    blog: {
      up: "CREATE TABLE blog (\n id INTEGER PRIMARY KEY\n)",
      down: "drop table blog"
    }
  }
};
