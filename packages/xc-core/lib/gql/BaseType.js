const autoBind = require('auto-bind');

class BaseType {

  constructor({app}) {
    this.app = app;
    autoBind(this)
  }


  applyMiddlewares(handlers = [], loaders = {}, postHandlers = []) {
    // return if there is no middlewares
    if (!handlers) return loaders;

    // iterate over loaders
    for (let [name, loader] of Object.entries(loaders)) {

      // wrap the loader function
      loaders[name] = async (...args) => {
        try {
          // execute handlers
          for (let handler of handlers) {
            await handler(...args)
          }
          // call loader function
          const result = await loader(args[0]);

          // post handlers
          if (postHandlers) {
            for (let handler of postHandlers) {
              await handler(result, ...args)
            }
          }
          // return the result
          return result;
        } catch (e) {
          throw e;
        }
      }
    }
    return loaders;
  }

  static applyMiddlewareForLoader(handlers = [], loader, postHandlers = []) {
    if (!handlers) return loader;
    return async (args) => {
      try {
        for (let handler of handlers) {
          await handler(args[0][1], args[0][2], args[0][3], args.map(([id]) => id))
        }
        const result = await loader(args.map(([id]) => id));
        if (postHandlers) {
          for (let handler of postHandlers) {
            await handler(result, ...args[0])
          }
        }
        return result;
      } catch (e) {
        throw e;
      }
    }
  }

}


module.exports = BaseType;