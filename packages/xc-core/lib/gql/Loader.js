const DataLoader = require('dataloader');


class Loader {
  static get(func, options = {
    cacheKeyFn: ([id]) => id
  }) {
    const loader = new DataLoader((ids) => {
      return func(ids);
    }, options);
    loader.load = loader.load.bind(loader);
    return loader;
  }
}


module.exports = Loader;