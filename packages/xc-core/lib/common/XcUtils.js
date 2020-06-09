const util = require('util');

const v8 = require("v8"),
  os = require("os");

class XcUtils {

  static async getBCryptSalt(bcrypt) {
    try {
      let salt = await util.promisify(bcrypt.genSalt)(10);
      return salt;
    } catch (e) {
      throw e;
    }
  }

  static async getBCryptHash(bcrypt, password, salt) {
    try {
      let hash = await util.promisify(bcrypt.hash)(password, salt);
      return hash;
    } catch (e) {
      throw e;
    }
  }


  static xpromisify(fn) {

    let cbkFuncToAsyncFunc = require('util').promisify(
      (args, cb) => fn(
        ...args,
        (err, ...results) => cb(err, results)
      )
    )

    return cbkFuncToAsyncFunc;

  }


  static getHealth({memory = null}) {

    let status = {};
    status["process_uptime"] = process.uptime().toFixed(1) + ' Seconds';
    status["process_memory_usage"] = XcUtils.convertByteToMB(process.memoryUsage());
    Object.assign(status, XcUtils.convertByteToMB({
      "os_total_memory": os.totalmem(),
      "os_free_memory": os.freemem()
    }));

    status['os_memory_occupied'] = (100 * (1 - (os.freemem() / os.totalmem()))).toFixed(0)


    status["os_load_average"] = os.loadavg().map(v => v.toFixed(2));
    status["v8_heap_statistics"] = XcUtils.convertByteToMB(v8.getHeapStatistics(), ["does_zap_garbage",
      "number_of_native_contexts",
      "number_of_detached_contexts"]);

    if (memory) {
      return +status['os_memory_occupied'] <= +memory;
    }
    return status;
  }


  static convertByteToMB(obj, ignore = []) {
    for (let prop in obj) {
      if (!ignore.includes(prop)) {
        obj[prop] = (obj[prop] / (1024 * 1024)).toFixed(2) + ' MB'
      }
    }

    return obj;
  }

}

module.exports = XcUtils;