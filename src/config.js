'use strict';
require('dotenv').config();

const databaseURL = process.env.DATABASE_URL;
const serviceAccountFile = process.env.SERVICE_ACCOUNT_FILE;
const collection = process.env.COLLECTION_NAME;

const serviceAccount = require(serviceAccountFile);

module.exports = {
    databaseURL,
    serviceAccount,
    collection
}