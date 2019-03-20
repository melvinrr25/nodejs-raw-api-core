const http = require("http");
const appServer = require("./server");
require("dotenv").config();

function runServer(settings = {}) {
  const port = settings.port;
  const useDatabase = settings.useDatabase;
  const test = settings.test;
  const routes = settings.routes || {};

  if (useDatabase === true) {
    const mongoose = require("mongoose");
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbName = process.env.DB_NAME;
    const mongoDB = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    mongoose.connect(mongoDB, {
      useNewUrlParser: true
    });

    mongoose.Promise = global.Promise;

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    db.on("connected", () => {
      createServer(routes, port, test);
    });

    db.on("disconnected", () => {
      console.log("MongoDB disconnected...");
    });
  } else {
    // Without connecting to mongoose
    createServer(routes, port, test);
  }
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

module.exports = runServer;
