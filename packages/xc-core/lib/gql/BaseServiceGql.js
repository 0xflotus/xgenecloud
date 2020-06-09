const autoBind = require('auto-bind');
class BaseServiceGql {

  constructor(app) {
    this.app = app;
    autoBind(this);
  }

  async list(args) {
    throw new Error(`${this.constructor.name}.list() is not implemented`)
  }

  async create(args) {
    throw new Error(`${this.constructor.name}.create() is not implemented`)
  }

  async read(args) {
    throw new Error(`${this.constructor.name}.read() is not implemented`)
  }

  async update(args) {
    throw new Error(`${this.constructor.name}.update() is not implemented`)
  }

  async delete(args) {
    throw new Error(`${this.constructor.name}.delete() is not implemented`)
  }

  async count(args) {
    throw new Error(`${this.constructor.name}.count() is not implemented`)
  }

  async exists(args) {
    throw new Error(`${this.constructor.name}.exists() is not implemented`)
  }

  async findOne(args) {
    throw new Error(`${this.constructor.name}.findOne() is not implemented`)
  }

  async findOne(args) {
    throw new Error(`${this.constructor.name}.findOne() is not implemented`)
  }

  async distinct(args) {
    throw new Error(`${this.constructor.name}.distinct() is not implemented`)
  }

  async groupBy(args) {
    throw new Error(`${this.constructor.name}.groupBy() is not implemented`)
  }

  async aggregate(args) {
    throw new Error(`${this.constructor.name}.delete() is not implemented`)
  }

  async distribution(args) {
    throw new Error(`${this.constructor.name}.distribution() is not implemented`)
  }

  async createb(args) {
    throw new Error(`${this.constructor.name}.createb() is not implemented`)
  }

  async updateb(args) {
    throw new Error(`${this.constructor.name}.updateb() is not implemented`)
  }

  async deleteb(args) {
    throw new Error(`${this.constructor.name}.deleteb() is not implemented`)
  }

}


module.exports = BaseServiceGql;