const uuid = require('uuid');
const debug = require('debug')('ref:error');

module.exports = {
  newId()
  {
    const id = uuid();
    return id;
  },
  log(err = new Error())
  {
    if (!err.refId) {
      err.refId = this.newId();
    }

    debug(`Logging Error with ref id: ${err.refId}\n\n\t`, err);
    // debug(err);
  }
};
