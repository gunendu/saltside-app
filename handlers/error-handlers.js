var Errors = require('sd-core').Errors;
var utils = require('../routes/utils');
var errorCodes = require('../routes/errors');

var Handlers = {};

Handlers.logErrors = function (err, req, res, next) {
  next(err);
};

var BASE_ERRORS = ['EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'];

Handlers.clientErrorHandler = function (err, req, res, next) {
  console.log("Error is ",err.status, err.name, err);
  if (err.status === 404) {
    return res.status(404).send(utils.createErrResp(errorCodes.INVALID_URL,""));
  }
  handleInternalServerError(res, err);
};

function handleInternalServerError(res, e){
  res.setHeader("saltside-error", "2114");
  return res.status(500).send(utils.createErrResp(errorCodes.INTERNAL_SERVER_ERR,""));
}

Handlers.clientDebugErrorHandler = Handlers.clientErrorHandler;

module.exports = Handlers;
