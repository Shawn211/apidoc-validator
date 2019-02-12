'use strict';

const moment = require('moment');
const thirdvalidator = require('validator');

thirdvalidator.isLegalTime = function isLegalTime(time) {
  var date = new Date(time);
  if (date instanceof Date && !isNaN(date.getTime())) {
    return true;
  }
  return false;
}

const ErrorEnum = {
  MISSPARAM: 1,
  TYPEERROR: 2,
  LENGTHERROR: 3,
  NOTNULL: 4,
  REQUIRED: 5,
  ENUMERROR: 6,
  INTERVALERROR: 7,
  CSTR_OR: 8,
  CSTR_ON: 9,
  CSTR_DATE_CMP: 10,
  PATTERNERROR: 11
};

class ApiDocValidator {
  constructor(api) {
    this._api = {};
    for (let a of api) {
      if (this._api[a.url]) {
        this._api[a.url][a.type] = a;
      } else {
        this._api[a.url] = {};
        this._api[a.url][a.type] = a;
      }
    }
  }

  get api() {
    return this._api;
  }

  validate(route, method, raw) {
    if (!this._api[route]
      || !this._api[route][method]
      || !this._api[route][method].parameter
      || !this._api[route][method].parameter.fields) {
      return;
    }
    raw = raw ? raw : {};
    let rvdtor = new RouteValidator(this._api[route][method].parameter.fields, raw);
    let parsed = rvdtor.parameterValidate();
    return parsed;
  }

  isApiDocValidatorError(err) {
    if (err.isApiDocValidatorError) {
      return true;
    }
    return false;
  }
}

class ApiDocValidatorError {
  constructor(type, key) {
    this._key = key;
    if (type == ErrorEnum.MISSPARAM) {
      this._desc = '缺少参数';
    } else if (type == ErrorEnum.TYPEERROR) {
      this._desc = '类型错误';
    } else if (type == ErrorEnum.NOTNULL) {
      this._desc = '不允许为空';
    } else if (type == ErrorEnum.LENGTHERROR) {
      this._desc = '长度错误';
    } else if (type == ErrorEnum.REQUIRED) {
      this._desc = '必填参数';
    } else if (type == ErrorEnum.ENUMERROR) {
      this._desc = '可选值范围错误';
    } else if (type == ErrorEnum.INTERVALERROR) {
      this._desc = '最大/小值错误';
    } else if (type == ErrorEnum.CSTR_OR) {
      this._msg = '缺少参数:' + arguments[1] + '或' + arguments[2];
    } else if (type == ErrorEnum.CSTR_ON) {
      this._msg = arguments[1] + arguments[2];
    } else if (type == ErrorEnum.CSTR_DATE_CMP) {
      this._msg = arguments[1];
    } else if (type == ErrorEnum.PATTERNERROR) {
      this._desc = '字符串不符合规定正则';
    }
  }
  msg() {
    if (this._msg) {
      return this._msg;
    }
    return this._desc + ':' + this._key;
  }

  get isApiDocValidatorError() {
    return true;
  }
}

class RouteValidator {
  constructor(fields, raw) {
    this._fields = fields;
    this._raw = raw;
  }

  parameterValidate() {
    if (!this._fields) {
      return {};
    }
    let parsed = {
      body: {},
      query: {},
      params: {}
    };
    for (let field in this._fields) {
      for (let parameter of this._fields[field]) {
        if (field in parsed) {
          if (this._raw[field][parameter.field] === undefined) {
            if (!parameter.optional) {
              throw new ApiDocValidatorError(ErrorEnum.REQUIRED, parameter.field);
            } else if (parameter.defaultValue) {
              parsed[field][parameter.field] = this._getDefaultValue(parameter);
            }
          } else {
            parsed[field][parameter.field] = this.checkParameter(parameter, this._raw[field][parameter.field]);
          }
        }
      }
    }
    return parsed;
  }

  _getDefaultValue(parameter) {
    if (parameter.type == 'String') {
      return parameter.defaultValue;
    } else if (parameter.type == 'Integer') {
      return parseInt(parameter.defaultValue);
    } else if (parameter.type == 'Number') {
      return +parameter.defaultValue;
    } else if (parameter.type == 'Date') {
      return parameter.defaultValue;
    }
  }

  checkParameter(parameter, value) {
    this._checkType(parameter, value);
    this._checkAllowedValues(parameter, value);
    this._checkSize(parameter, value);

    return value;
  }

  _checkType(parameter, value) {
    if (parameter.type == 'String') {
      this._checkParameterString(parameter, value);
    } else if (parameter.type == 'Integer') {
      // 字符串转成数字
      value = parseInt(value);
      this._checkParameterInteger(parameter, value);
    } else if (parameter.type == 'Number') {
      // 字符串转成数字
      value = +value;
      this._checkParameterNumber(parameter, value);
    } else if (parameter.type == 'Date') {
      // 字符串转成日期格式对象
      value = moment(value).format(parameter.size);
      this._checkParameterDate(parameter, value);
    } else if (parameter.type.slice(-2) == '[]') {
      value = this._toArray(value);
      if (!Array.isArray(value)) {
        throw new ApiDocValidatorError(ErrorEnum.TYPEERROR, parameter.field);
      }
      if (parameter.type.slice(0, -2) == 'String') {
        for (let i = 0; i < value.length; ++i) {
          this._checkParameterString({ type: 'String', field: parameter.field + '[' + i + ']' }, value[i]);
        }
      }
      if (parameter.type.slice(0, -2) == 'Integer') {
        for (let i = 0; i < value.length; ++i) {
          this._checkParameterInteger({ type: 'Integer', field: parameter.field + '[' + i + ']' }, value[i]);
          // 字符串转成数字
          value[i] = parseInt(value[i]);
        }
      }
      if (parameter.type.slice(0, -2) == 'Number') {
        for (let i = 0; i < value.length; ++i) {
          this._checkParameterNumber({ type: 'Number', field: parameter.field + '[' + i + ']' }, value[i]);
          // 字符串转成数字
          value = +value;
        }
      }
    }
  }

  _checkAllowedValues(parameter, value) {
    if (parameter.allowedValues) {
      if (parameter.allowedValues.indexOf(''+value) == -1)
        throw new ApiDocValidatorError(ErrorEnum.ENUMERROR, parameter.field);
    }
  }

  _checkSize(parameter, value) {
    if (parameter.size) {
      if (parameter.type == 'String') {
        let arr = parameter.size.split('..');
        if (arr[0]) {
          if (+arr[0] > value.length)
            throw new ApiDocValidatorError(ErrorEnum.LENGTHERROR, parameter.field);
        }
        if (arr[1]) {
          if (+arr[1] < value.length)
            throw new ApiDocValidatorError(ErrorEnum.LENGTHERROR, parameter.field);
        }
      } else if (parameter.type == 'Integer') {
        let arr = parameter.size.split('-');
        if (arr[0]) {
          if (+arr[0] > parseInt(value))
            throw new ApiDocValidatorError(ErrorEnum.INTERVALERROR, parameter.field);
        }
        if (arr[1]) {
          if (+arr[1] < parseInt(value))
            throw new ApiDocValidatorError(ErrorEnum.INTERVALERROR, parameter.field);
        }
      } else if (parameter.type == 'Number') {
        let arr = parameter.size.split('-');
        if (arr[0]) {
          if (+arr[0] > +value)
            throw new ApiDocValidatorError(ErrorEnum.INTERVALERROR, parameter.field);
        }
        if (arr[1]) {
          if (+arr[1] < +value)
            throw new ApiDocValidatorError(ErrorEnum.INTERVALERROR, parameter.field);
        }
      } else if (parameter.type == 'Date') {
        let _date = moment(value).format(parameter.size);
        if (_date != value)
          throw new ApiDocValidatorError(ErrorEnum.CSTR_DATE_CMP, parameter.field + '格式错误: ' + parameter.size);
      }
    }
  }
  
  _checkParameterString(parameter, value) {
    if (typeof value != 'string')
      throw new ApiDocValidatorError(ErrorEnum.TYPEERROR, parameter.field);
  }

  _checkParameterInteger(parameter, value) {
    if (!thirdvalidator.isInt(''+value)) {
      throw new ApiDocValidatorError(ErrorEnum.TYPEERROR, parameter.field);
    }
  }

  _checkParameterNumber(parameter, value) {
    if (!thirdvalidator.isNumeric(''+value)) {
      throw new ApiDocValidatorError(ErrorEnum.TYPEERROR, parameter.field);
    }
  }

  _checkParameterDate(parameter, value) {
    if (!thirdvalidator.isLegalTime(value))
      throw new ApiDocValidatorError(ErrorEnum.TYPEERROR, parameter.field);
  }

  _toArray(value) {
    if (Array.isArray(value))
      return value;
    if (typeof value == 'string') {
      try {
        let _value = JSON.parse(value);
        return _value;
      } catch (err) {
        return null;
      }
    }
    return null;
  }
}

module.exports = ApiDocValidator;