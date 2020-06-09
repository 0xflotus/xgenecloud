const {
  BaseModelSql
} = require('../../index.js');

class country extends BaseModelSql {

  constructor({
    dbDriver
  }) {

    super({
      dbDriver,
      ...require('./country.meta.js')
    });

  }

}


module.exports = country;