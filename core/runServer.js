'use strict';

const http = require('http');
const server = require('./server');
const mongoose = require('mongoose');
require('dotenv').config();

function runServer(port = 8080, routes) {
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;
  const mongoDB = `mongodb://${dbHost}:${dbPort}/${dbName}`;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true
  });

  mongoose.Promise = global.Promise;

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  db.on('connected', () => {
    http.createServer(server).listen(port, () => {
      console.log('Running on: ' + port)
    });
  });

  db.on('disconnected', () => {
    console.log('disconnected...');
  });
}

module.exports = runServer;