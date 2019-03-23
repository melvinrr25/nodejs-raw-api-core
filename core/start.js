const http = require("http");
const appServer = require("./server");

function start(settings = {}) {
  const port = settings.port;
  const test = settings.test;
  const routes = settings.routes || {};
  createServer(routes, port, test);
}

function createServer(routes, port, test) {
  const httpServer = http.createServer(appServer(routes));

  if (!test) {
    httpServer.listen(port);
    httpServer.on("error", onError);
    httpServer.on("listening", onListening);
  }

  function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
  }

  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}

module.exports = start;
