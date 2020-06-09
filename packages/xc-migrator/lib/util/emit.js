const Emittery = require("emittery");

let emitSingleton = null;

class Emit {
  constructor() {
    if (emitSingleton) return emitSingleton;
    this.evt = new Emittery();
    emitSingleton = this;
  }
}
module.exports = Emit;
