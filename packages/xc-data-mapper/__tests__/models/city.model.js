const {
  BaseModelSql
} = require('../../index.js');

class city extends BaseModelSql {

  constructor({
    dbDriver
  }) {

    super({
      dbDriver,
      ...require('./city.meta.js')
    });

  }

}


module.exports = city;