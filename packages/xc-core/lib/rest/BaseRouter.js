const autoBind = require('auto-bind');

/**
 * BaseClass for Router files in REST APIs
 *
 * @class
 * @classdesc BaseClass for Router files in REST APIs
 */
class BaseRouter {

  /**
   * @param {Object} app - app context
   */
  constructor(app) {
    autoBind(this);
  }

  async list(req, res) {
    throw new Error(`${this.constructor.name}.list is not implemented`);
  }

  async create(req, res) {
    throw new Error(`${this.constructor.name}.create is not implemented`);
  }

  async update(req, res) {
    throw new Error(`${this.constructor.name}.update is not implemented`);
  }

  async delete(req, res) {
    throw new Error(`${this.constructor.name}.delete is not implemented`);
  }

  async createb(req, res) {
    throw new Error(`${this.constructor.name}.createb is not implemented`);
  }

  async updateb(req, res) {
    throw new Error(`${this.constructor.name}.updateb is not implemented`);
  }

  async deleteb(req, res) {
    throw new Error(`${this.constructor.name}.deleteb is not implemented`);
  }

  async read(req, res) {
    throw new Error(`${this.constructor.name}.read is not implemented`);
  }

  async count(req, res) {
    throw new Error(`${this.constructor.name}.count is not implemented`);
  }

  async exists(req, res) {
    throw new Error(`${this.constructor.name}.exists is not implemented`);
  }

  async groupBy(req, res) {
    throw new Error(`${this.constructor.name}.groupBy is not implemented`);
  }

  async aggregate(req, res) {
    throw new Error(`${this.constructor.name}.aggregate is not implemented`);
  }

  async distribution(req, res) {
    throw new Error(`${this.constructor.name}.distribution is not implemented`);
  }

  async distinct(req, res) {
    throw new Error(`${this.constructor.name}.distinct is not implemented`);
  }

  async findOne(req, res) {
    throw new Error(`${this.constructor.name}.findOne is not implemented`);
  }

  async hasManyList(req, res) {
    throw new Error(`${this.constructor.name}.hasManyList is not implemented`);
  }

  async belongs(req, res) {
    throw new Error(`${this.constructor.name}.hasManyList is not implemented`);
  }

  mapRoutes() {
    throw new Error(`${this.constructor.name}.mapRoutes is not implemented`);
  }

  catchErr(handler) {
    return (req, res, next) => {
      Promise.resolve(handler.call(this,req, res, next)).catch(err => {
        next(err);
      });
    };
  }

}

module.exports = BaseRouter;