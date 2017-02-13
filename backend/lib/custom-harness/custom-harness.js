const debug = require('debug')('route-harness');
const ref = require('../ref');

module.exports = (fn, info) => {

  const name = `${info.routeClass}.${info.handler}`;
  const route = `${info.method.toUpperCase()}: '${info.fullPath}'`;

  debug(`mapped | ${name}, ${route}`);

  return async (req, res, next) => {

    debug(`${route}, ${name}()`);

    try {
      const r = await fn(req, res);
      if (r) {
        res.send(r);
      }
    }
    catch (err) {
      err = err || new Error();
      err.note = `Error in route. ${name}, ${route}'`.replace(/\'/g, '');
      err.refId = req.refId = ref.newId();
      ref.log(err);
      next(err);
    }
  };
};