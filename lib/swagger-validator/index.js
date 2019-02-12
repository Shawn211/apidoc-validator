'use strict';

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
class SwaggerValidatorError {
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
      this._msg = '缺少参数:'+arguments[1]+'或'+arguments[2];
    } else if (type == ErrorEnum.CSTR_ON) {
      this._msg = arguments[1]+arguments[2];
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

  // 在logger.error的时候不用输出isSwaggerValidatorError
  get isSwaggerValidatorError() {
    return true;
  }
}

class SwaggerValidator {
  constructor(api) {
    this._api = api;
  }

  get api() {
    return this._api;
  }

  _checkSchemaString(name, schema, value) {
    if (typeof value != 'string') {
      throw new SwaggerValidatorError(ErrorEnum.TYPEERROR, name);
    }
    if (schema.format == 'date' && !thirdvalidator.isLegalTime(value)) {
      throw new SwaggerValidatorError(ErrorEnum.TYPEERROR, name);
    }
    if (schema.pattern) {
      if (!value.match(schema.pattern)) {
        throw new SwaggerValidatorError(ErrorEnum.PATTERNERROR, name);
      }
    }
    this._checkEnum(name, schema, value);
  }

  _checkMinMax(name, schema, value) {
    if (schema.minimum !== undefined && value < schema.minimum) {
      throw new SwaggerValidatorError(ErrorEnum.INTERVALERROR, name);
    }
  }

  _checkSchemaNumber(name, schema, value) {
    if (!thirdvalidator.isNumeric(''+value)) {
      throw new SwaggerValidatorError(ErrorEnum.TYPEERROR, name);
    }
    this._checkMinMax(name, schema, value);
    this._checkEnum(name, schema, value);
  }

  _checkSchemaInteger(name, schema, value) {
    if (!thirdvalidator.isInt(''+value)) {
      throw new SwaggerValidatorError(ErrorEnum.TYPEERROR, name);
    }
    this._checkMinMax(name, schema, value);
    this._checkEnum(name, schema, value);
  }

  // 允许数组类型的字符串，比如GET方法解析出来的
  _toArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value == 'string') {
      try {
        value = JSON.parse(value);
        return value;
      } catch(err) {
        return null;
      }
    }
    return null;
  }

  _checkEnum(name, schema, value) {
    if (schema && Array.isArray(schema.enum)) {
      if (schema.enum.indexOf(value) == -1) {
        throw new SwaggerValidatorError(ErrorEnum.ENUMERROR, name);
      }
    }
  }

  _checkSchema(name, schema, value) {
    if (schema.type == 'string') {
      this._checkSchemaString(name, schema, value);
    } else if (schema.type == 'integer') {
      // 字符串转成数字
      value = parseInt(value);
      this._checkSchemaInteger(name, schema, value);
    } else if (schema.type == 'number') {
      // 字符串转成数字
      value = +value;
      this._checkSchemaNumber(name, schema, value);
    } else if (schema.type == 'array') {
      value = this._toArray(value);
      if (!Array.isArray(value)) {
        throw new SwaggerValidatorError(ErrorEnum.TYPEERROR, name);
      }
      if (schema.items && schema.items.type == 'string') {
        for(let i = 0; i < value.length; ++i) {
          this._checkSchemaString(name+'['+i+']', schema.items, value[i]);
        }
      }
      if (schema.items && schema.items.type == 'integer') {
        for(let i = 0; i < value.length; ++i) {
          this._checkSchemaInteger(name+'['+i+']', schema.items, value[i]);
          // 字符串转成数字
          value[i] = parseInt(value[i]);
        }
      }
    }

    this._checkEnum(name, schema.enum, value);

    return value;
  }

  _validateParameters(parameters, raw) {
    if (!parameters) {
      return {};
    }
    let parsed = {
      body: {},
      query: {},
      path: {}
    };
    for(let i = 0; i < parameters.length; ++i) {
      let param = parameters[i];
      if (raw[param.in][param.name] !== undefined) {
        parsed[param.in][param.name] = this._checkSchema(param.name, param.schema, raw[param.in][param.name]);
      } else {
        if (param.required) {
          throw new SwaggerValidatorError(ErrorEnum.REQUIRED, param.name);
        }
      }
    }
    return parsed;
  }

  _checkAndGroup(names, group) {
    for(let i = 0; i < group.length; ++i) {
      if (names.indexOf(group[i]) == -1) {
        return false;
      }
    }
    return true;
  }

  _checkRequiredEitherOr(constraint, combined) {
    let names = Object.keys(combined);
    if (this._checkAndGroup(names, constraint.either)) {
      return true;
    }

    if (this.__checkAndGroup(names, constraint.or)) {
      return true;
    }

    throw new SwaggerValidatorError(ErrorEnum.CSTR_OR, constraint.either.toString(), constraint.either.toString());
  }

  _checkRequiredOn(constraint, combined) {
    let names = Object.keys(combined);
    for(let key in constraint.on) {
      if (constraint.on[key].$eq !== undefined) {
        if (combined[key] == constraint.on[key].$eq) {
          if (!this._checkAndGroup(names, constraint.required)) {
            throw new SwaggerValidatorError(ErrorEnum.CSTR_ON, key+'='+constraint.on[key].$eq+', 缺少参数: ', constraint.required.toString());
          }
        }
      }
    }
  }

  _checkDateCompare(constraint, combined) {
    if (constraint.$gt) {
      if(new Date(combined[constraint.$gt[0]]).getTime() <= new Date(combined[constraint.$gt[1]]).getTime()) {
        throw new SwaggerValidatorError(ErrorEnum.CSTR_DATE_CMP, constraint.$gt[0]+'应该大于'+constraint.$gt[1]);
      }
    }
  }

  _validateXConstrains(constraints, parsed) {
    if (!constraints) return ;
    let combined = {...parsed.query, ...parsed.body, ...parsed.path};
    for(let i = 0; i < constraints.length; ++i) {
      let cstr = constraints[i];
      if (cstr.type == 'required_either_or') {
        this._checkRequiredEitherOr(cstr, combined);
      } else if (cstr.type == 'required_on') {
        this._checkRequiredOn(cstr, combined);
      } else if (cstr.type == 'date_compare') {
        this._checkDateCompare(cstr, combined);
      }
    }
  }

  validate(route, method, raw) {
    if (!this._api.paths[route]
      || !this._api.paths[route][method]) {
      return ;  
    }
    raw = raw ? raw : {};
    raw.query = raw.query ? raw.query : {};
    raw.body = raw.body ? raw.body : {};
    raw.path = raw.params ? raw.params : {};
    let schema = this._api.paths[route][method];
    let parsed = this._validateParameters(schema.parameters, raw);
    this._validateXConstrains(schema['x-constraints'], parsed);
    return parsed;
  }


  _buildSchema(schema) {
    if (schema.type == 'string') {
      if (schema.format == 'date') {
        return '2017-08-22';
      }
      if (schema.pattern) {
        // TODO 临时生成
        if (schema.pattern == '^[0-9a-fA-F]{24}$') {
          return '5b8a01071f865f549ce01452';
        }
        if (schema.pattern == '^\d{6}$') {
          return '110101';
        }
      }
      return 'demo string';
    } else if (schema.type == 'integer') {
      if (schema.enum) {
        return schema.enum[0];
      }
      return 33;
    }
  }

  _buildNormalParams(schema) {
    let data = {
      query: {}, body: {}, path: {}
    };
    for(let i in schema.parameters) {
      let param = schema.parameters[i];
      data[param.in][param.name] = this._buildSchema(param.schema);
    }
    return data;
  }

  // 需要constraint的情况，否则required==false的参数缺失是不影响的
  _buildLessGroupParams(schema) {
    let data = {
      query: {}, body: {}, path: {}
    };
    for(let i in schema.parameters) {
      let param = schema.parameters[i];
      if(param.required) {
        data[param.in][param.name] = this._buildSchema(param.schema);
      }
    }
    return data;
  }

  buildCases(route, method) {
    let cases = [];
    let schema = this._api.paths[route][method];
    let normal = this._buildNormalParams(schema);
    cases.push({
      desc: '正常请求',
      data: normal,
      expect: {code: 0}
    });

    let lessGroup = this._buildLessGroupParams(schema);
    cases.push({
      desc: '缺少参数组',
      data: lessGroup,
      expect: {code: 40001}
    });
    return cases;
  }
}

SwaggerValidator.isSwaggerValidatorError = function (err) {
  if (err.isSwaggerValidatorError) {
    return true;
  }
  return false;
}

module.exports = SwaggerValidator;
