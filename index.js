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

    validator: vdtor
  }
}
