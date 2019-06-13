"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

let db;

MongoClient.connect(MONGODB_URI, (err, database) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  db = database.db('tweeter');

  // ==> We have a connection to the "test-tweets" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
});

module.exports = db;
