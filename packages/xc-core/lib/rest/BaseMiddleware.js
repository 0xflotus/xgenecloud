const autoBind = require('auto-bind');

/**
 * BaseMiddleware for REST APIs
 *
 * @class
 * @classdesc BaseMiddleware used for REST APIs module
 */
class BaseMiddleware {

  /**
   *
   * @param {Object} app - app context
   */
  constructor({app}) {
    this.app = app;
    autoBind(this);
  }

  /**
   * Default middleware function that gets invoked
   *
   * @param {Object} req - express req object
   * @param {Object} res - express res object
   * @param {Function} next - express next function
   * @returns {Promise<void>}
   */
  async default(req, res, next) {
    console.log(`BaseMiddleware::${this.constructor.name}`);
    next();
  }


  /**
   * Determines if the method is allowed for a particular request,url and role
   *
   * @param {Object} roles - key value pair with role and true/false
   * @param {String} method - HTTP Method name
   * @param {Object} permissions - refer to permission in *.policy.js
   * @param {String} url - http url
   * @returns {Promise<boolean>}
   */
  async isAllowed({roles, method, permissions, url}) {
    try {
      return Object.entries(permissions[url][method]).some(([role, allowed]) => allowed && roles[role])
    } catch (e) {
      console.log(e);
      return false;
    }
  }


}

module.exports = BaseMiddleware;