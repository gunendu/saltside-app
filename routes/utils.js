var _ = require("underscore");

var getInvalidParams = function (params, req) {
  return _.partition(params, function(element) {
    var param = req.param(element);
    return param === undefined || param === null;
  })[0];
};

var getExceptionsParams = function (params, req) {
   return _.partition(params, function(element) {
     var param = req.param(element);
     return param!=undefined;
   })[0];
};

var getFirstInvalidParam = function (params, req) {
  return _.first(getInvalidParams(params, req));
};

var validateParams = function (cb) {
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      /* Needs modification */
      if (!_.isString(this[key])) {
        cb(true, {"ok": false, "code": "2111", "message": "Mandatory field " + key + " is empty"});
      }
    }
  }
  cb(null, null);
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
  "validateParams": validateParams
};
