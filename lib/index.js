"use strict";
var __extends = (this && this.__extends) || (function(){
  var extendStatics = function(d, b){
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function(d, b){ d.__proto__ = b; }) ||
      function(d, b){ for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function(d, b){
    extendStatics(d, b);
    function __(){ this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageByHttpStatus = exports.MessageComponent = void 0;
var React = require("react");
var MessageComponent = (function(_super){
  __extends(MessageComponent, _super);
  function MessageComponent(props, resourceService, alertError, loading){
    var _this = _super.call(this, props) || this;
    _this.resourceService = resourceService;
    _this.alertError = alertError;
    _this.loading = loading;
    _this._name = 'user';
    _this.alertClass = '';
    _this.running = false;
    _this.showMessage = function(msg){
      _this.alertClass = 'alert alert-info';
      _this.setState({ message: msg });
    };
    _this.showError = function(msg){
      _this.alertClass = 'alert alert-error';
      if (typeof msg === 'string'){
        _this.setState({ message: msg });
      }
      else if (Array.isArray(msg) && msg.length > 0){
        _this.setState({ message: msg[0].message });
      }
      else {
        var x = JSON.stringify(msg);
        _this.setState({ message: x });
      }
    };
    _this.hideMessage = function(){
      _this.alertClass = '';
      _this.setState({ message: '' });
    };
    _this.back = _this.back.bind(_this);
    _this.name = _this.name.bind(_this);
    _this.updateState = _this.updateState.bind(_this);
    _this.updateFlatState = _this.updateFlatState.bind(_this);
    _this.showError = _this.showError.bind(_this);
    _this.showMessage = _this.showMessage.bind(_this);
    _this.hideMessage = _this.hideMessage.bind(_this);
    _this.alertError = _this.alertError.bind(_this);
    _this.handleError = _this.handleError.bind(_this);
    _this.ref = React.createRef();
    return _this;
  }
  MessageComponent.prototype.back = function(event){
    if (event){
      event.preventDefault();
    }
    this.props.history.goBack();
  };
  MessageComponent.prototype.name = function(){
    return this._name;
  };
  MessageComponent.prototype.updateFlatState = function(e){
    var ctrl = e.currentTarget;
    var objSet = {};
    var n = ctrl.name;
    objSet[n] = ctrl.value;
    this.setState(objSet);
  };
  MessageComponent.prototype.updateState = function(e){
    var n = this.name();
    var ctrl = e.currentTarget;
    var ex = this.state[n];
    var model = Object.assign({}, ex);
    model[ctrl.name] = ctrl.value;
    var objSet = {};
    objSet[n] = model;
    this.setState(objSet);
  };
  MessageComponent.prototype.handleError = function(err){
    this.running = false;
    if (this.loading){
      this.loading.hideLoading();
    }
    var data = err.response ? err.response : err;
    var r = this.resourceService;
    var title = r.value('error');
    var msg = r.value('error_internal');
    if (!err){
      this.alertError(msg, title);
      return;
    }
    var status = data.status;
    if (status && !isNaN(status)){
      msg = messageByHttpStatus(status, r);
    }
    this.alertError(msg, title);
  };
  return MessageComponent;
}(React.Component));
exports.MessageComponent = MessageComponent;
function messageByHttpStatus(status, r){
  var msg = r.value('error_internal');
  if (status === 401){
    msg = r.value('error_unauthorized');
  }
  else if (status === 403){
    msg = r.value('error_forbidden');
  }
  else if (status === 404){
    msg = r.value('error_not_found');
  }
  else if (status === 410){
    msg = r.value('error_gone');
  }
  else if (status === 503){
    msg = r.value('error_service_unavailable');
  }
  return msg;
}
exports.messageByHttpStatus = messageByHttpStatus;
