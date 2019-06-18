'use strict';

module.exports = async function (apiDocJsonPath) {
  // /**
  //  * TODO 关于参数校验与文档生成，OpenAPI也很多未支持，比如parameters dependencies
  //  *  需要fork定制化实现swagger-ui、swagger-jsdoc、swagger-parser
  //  *  关于规范的讨论与写法：https://github.com/OAI/OpenAPI-Specification/issues/256
  //  */
  // const swaggerParser = require('swagger-parser');
  // let api = await swaggerParser.validate(swaggerJsonPath);
  // const SwaggerValidator = require('./lib/swagger-validator');
  // let vdtor = new SwaggerValidator(api);
  const api = require(apiDocJsonPath);
  const ApiDocValidator = require('./lib/apidoc-validator');
  const generator = require('./lib/apidoc-generator');
  let vdtor = new ApiDocValidator(api);
  if (!logger) {
    var logger = console;
  }
  return {
    express: function (route, method) {
      return function (req, res, next) {
        let raw = {
          // query: req.query,
          // params: req.params,
          // body: req.body
          query: req.query || {},
          params: req.params || {},
          body: req.body || {}
        };
        logger.info('[RAW PARAMS]', raw);
        try {
          // 可能会过滤无关参数
          req.apidoc = vdtor.validate(route, method, raw);
          logger.info('[APIDOC PARAMS]', req.apidoc);
          next();
        } catch (err) {
          logger.error(err);
          // if (SwaggerValidator.isSwaggerValidatorError(err)) {
          if (vdtor.isApiDocValidatorError(err)) {
            return res.json({
              code: 40001,  // 统一错误码，暂时不区分更多参数校验类型
              msg: '参数校验错误: ' + err.msg()
            });
          } else {
            return res.status(500).json({
              code: 50001,
              msg: '服务错误，请联系技术人员'
            });
          }
        }
      }
    },

    validator: vdtor,

    generator: function (route, method, code) {
      return async function (req, res, next) {
        if (!vdtor._api[route]
          || !vdtor._api[route][method]
          || !vdtor._api[route][method].success
          || !vdtor._api[route][method].success.fields
          || !vdtor._api[route][method].success.fields['Success 200']
          || !vdtor._api[route][method].success.fields['Success 200'].length) {
          // return res.json({
          //   code: 40002,
          //   msg: '暂无对应成功返回数据格式'
          // });
          next();  // 不严格要求文档注释完整时，可跳过随机数据生成中间件
        }
        try {
          let type = {};
          for (let field of vdtor._api[route][method].success.fields['Success 200']) {
            type[field.field] = field.type.toLowerCase();
          }
          let data = await generator(type);

          data.code = code ? code : 200;  // 成功状态码默认为200，code字段可选赋值
          return res.json(data);
        } catch (err) {
          logger.error(err);
          return res.status(500).json({
            code: 50001,
            msg: '服务错误，请联系技术人员'
          });
        }
      }
    },

    generatorDemo: function (route, method) {
      return async function (req, res, next) {
        try {
          let type = {
              'name': 'string',
              'age': 'integer',
              'height': 'number',
              'health': 'boolean',
              'comment': 'object[]',
              'comment.imgId': 'string[]',
              'comment.status': 'integer[]',
              'comment.price': 'number[]',
              'comment.new': 'boolean[]',
              'comment.like': 'object',
              'comment.like.count': 'string',
              'abc': 'object[][][]',
              'abc.a': 'string',
              'abc.b': 'string',
              'abc.c': 'string',
          };
          let data = await generator(type);
          return res.json(data);
        } catch (err) {
          // 存在爆栈可能性
          // RangeError: Maximum call stack size exceeded
          logger.error(err);
          return res.status(500).json({
            code: 50001,
            msg: '服务错误，请联系技术人员'
          });
        }
      }
    }
  }
}
