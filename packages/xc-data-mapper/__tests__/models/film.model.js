const {
  BaseModelSql
} = require('../../index.js');

class film extends BaseModelSql {

  constructor({
    dbDriver
  }) {

    super({
      dbDriver,
      ...require('./film.meta.js')
    });

  }

}


module.exports = film;