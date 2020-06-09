const autoBind = require('auto-bind');

/**
 * @class
 * @classdesc Base class for a component in server
 */
class BaseComponent {

  constructor({app}) {
    this.app = app;
    autoBind(this);
  }

  /**
   * Initialisation method of component - mandatory to be implemented by the child class
   */
  init() {
    throw new Error(this.constructor.name + " : Method 'init()' must be implemented.");
  }

}

module.exports = BaseComponent;