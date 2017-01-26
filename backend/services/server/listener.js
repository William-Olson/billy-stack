const debug = require('debug')('server:listener');
const http = require('http');

const listen = (app, customPort) => {

  const normalizePort = val => {
    const port = parseInt(val, 10);
    return isNaN(port) ? val : (port >= 0 ? port : false);
  };

  // set port
  const port = normalizePort(customPort);
  app.set('port', port);

  // listen on provided port
  const server = http.createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);


  // setup listener handlers
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

};

module.exports = { listen };
