module.exports = exports = {};

/**************** START : REST related ****************/
exports.BaseRouter = require("./lib/rest/BaseRouter");
exports.BaseService = require("./lib/rest/BaseService");
exports.BaseMiddleware = require("./lib/rest/BaseMiddleware");

/**************** START : GQL related ****************/
exports.BaseType = require("./lib/gql/BaseType");
exports.BaseResolver = require("./lib/gql/BaseResolver");
exports.BaseServiceGql = require("./lib/gql/BaseServiceGql");
exports.BaseMiddlewareGql = require("./lib/gql/BaseMiddlewareGql");
exports.Loader = require("./lib/gql/Loader");

/**************** START : Common ****************/
exports.BaseComponent = require("./lib/common/BaseComponent");
exports.Components = require("./lib/common/Components");
exports.XcUtils = require("./lib/common/XcUtils");
exports.XcApiBridge = require("./lib/common/XcApiBridge");
