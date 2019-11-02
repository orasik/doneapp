
require('dotenv').config({ path: `${process.env.HOME}/.doneapp` });

const databaseURL = process.env.DATABASE_URL;
const serviceAccountFile = process.env.SERVICE_ACCOUNT_FILE;
const collection = process.env.COLLECTION_NAME;

let serviceAccount = '';
try {
  serviceAccount = require(serviceAccountFile);
} catch (e) {
  console.error('can not find serviceAccountFile');
}

module.exports = {
  databaseURL,
  serviceAccount,
  collection,
};
