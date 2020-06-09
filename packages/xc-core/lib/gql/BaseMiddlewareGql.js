const autoBind = require('auto-bind');


/**
 * @class BaseMiddlewareGql
 * @classdesc Base class for middlewares
 */
class BaseMiddlewareGql {

  constructor({app}) {
    this.app = app;
    autoBind(this);
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async default(req, res, next) {
    console.log(`BaseMiddlewareGql::${this.constructor.name}`);
    next();
  }

  /**
   *
   * @param {Object} roles - Key value pair of role and true/false
   * @param {String} method - query/mutation
   * @param {Object} permissions - Refer permissions in *.policy.js
   * @param {Function} resolver - Resolver function
   * @returns {boolean}
   */
  isAllowed({roles, method, permissions, resolver}) {
    try {
      return Object.entries(permissions[resolver]).some(([role, allowed]) => allowed && roles[role])
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}


module.exports = BaseMiddlewareGql;