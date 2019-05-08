const http = require('http');
const app = require('./app');

const DEFAULT_PORT = 3000;

const normalizePort = (port) => {
  const parsedPort = parseInt(port, 10);
  if (!Number.isNaN(parsedPort) && parsedPort >= 0) {
    return parsedPort;
  }
  return DEFAULT_PORT;
};

class Server {
  constructor(application, port) {
    this.application = application;
    this.port = normalizePort(port);
    this.application.set('port', this.port);
    this.server = http.createServer(app);
    this.sockets = {};
    this.nextSocketId = 0;
  }

  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(` ${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  onListening() {
    const addr = this.server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  }

  startServer() {
    this.server.listen(this.port);
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));
  }

  closeServer() {
    this.server.close();
  }
}

module.exports = { Server, DEFAULT_PORT };
