const Server = require('./Server');

module.exports = class ServerService
{

  constructor(stack)
  {
    this._stack = stack;
  }

  async start()
  {
    const server = this._stack.make(Server);
    server.start();
  }

};
