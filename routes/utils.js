var _ = require("underscore");

var validateParams = function (params, req) {
  return _.partition(params, function(element) {
    var param = req.param(element);
    return param === undefined || param === null;
  })[0]
};

var createSucResp = function (result) {
  var resp = {
    'status': true,
    'result': (result != null) ? (result) : ("")
  };
  console.log("createSucResp: " + JSON.stringify(resp));
  return resp;
};

var createErrResp = function (errorType, errMsgExt,debug) {
  var errCode = errorType.code;
  if (errCode === null)
    errCode = errorType.INTERNAL_SERVER_ERR;

  var error = {};
  error.code = errCode;
  error.reason= errorType.msg + " " + errMsgExt;
  error.debug = debug;
  return {
    'ok': false,
    "error": error
  };
};


module.exports = {
  "validateParams": validateParams,
  "createErrResp": createErrResp,
};
