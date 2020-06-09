const autoBind = require('auto-bind');



/**
 * @class BaseResolver
 * @classdesc Base class for graphql resolver
 */
class BaseResolver {

  constructor(app) {
    this.app = app;
    autoBind(this);
  }

  /**
   *
   * @param [Function[]]handlers
   * @param cbk
   * @returns {Function}
   */
  mw(handlers, cbk) {
    return async (root, args, context, info) => {
      try {
        for(let handler of handlers){
          await handler(root, args, context, info)
        }
        return await cbk(root, args, context, info);
      } catch (e) {
        throw e;
      }
    }
  }

  applyMiddlewares(handlers = [], resolvers = {}, postHandlers = []) {
    if (!handlers) return resolvers;
    for (let [name, resolver] of Object.entries(resolvers)) {
      resolvers[name] = async (...args) => {
        try {
          for(let handler of handlers){
            await handler(...args)
          }
          const result = await resolver(...args);
          if (postHandlers) {
            for(let handler of postHandlers){
              await handler(result,...args)
            }
          }
          return result;
        } catch (e) {
          throw e;
        }
      }
    }
    return resolvers;
  }

  async list(root, args, context, info) {

  }

  async create(root, args, context, info) {

  }

  async read(root, args, context, info) {

  }

  async update(root, args, context, info) {

  }

  async delete(root, args, context, info) {

  }


}


module.exports = BaseResolver;