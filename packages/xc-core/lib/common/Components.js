const BaseComponent = require('./BaseComponent')
const autoBind = require('auto-bind');
const path = require('path')

/**
 * @class
 * @classdesc Class to keep reference of all components in server
 */
class Components {

  /**
   *
   * @param {Object} components - details of components
   * @param {String} baseDir - base directory
   */
  constructor({components, baseDir = ''}) {
    this.components = components;
    this.baseDir = baseDir;
    autoBind(this);
  }

  /**
   * Initialise all component of server
   *
   * @returns {Promise<void>}
   */
  async init() {

    /* create and init all components */
    for (let i = 0; i < this.components.length; ++i) {

      /* require component from its path */
      let componentTitle = this.components[i].title;
      let componentPath = path.join(process.cwd(), this.components[i].path);
      this.components[i].component = require(componentPath);

      /* create component */
      if (this.components[i].component.prototype instanceof BaseComponent) {
        this[`${componentTitle}`] = new this.components[i].component(this);
        this[`$${componentTitle}`] = {};
      } else {
        throw new Error(this.components[i].component.name + ' : class is not subclass of BaseComponent')
      }
    }

    /* init components */
    for (let i = 0; i < this.components.length; ++i) {
      let componentTitle = this.components[i].title;
      await this[`${componentTitle}`].init(this)
    }

  }
}

module.exports = Components;
