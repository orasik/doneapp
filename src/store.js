
const admin = require('firebase-admin');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const { databaseURL, serviceAccount, collection } = require('./config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL,
});

const db = admin.firestore();

const addTask = async (note, date = null) => {
  if (date == null) {
    note.timestamp = moment().unix();
  } else {
    note.timestamp = moment(date).unix();
  }
  note.category = 'work';
  const document = db.collection(collection).doc(uuidv4());
  try {
    await document.set(note);
    console.log('added new data into the document');
  } catch (e) {
    console.error(e);
  }
};
const listTasks = async (date) => {
  const startOfDay = moment(date).startOf('day').unix();
  const endOfDay = moment(date).endOf('day').unix();
  const todayTasks = db
    .collection('tasks')
    .where('timestamp', '<=', endOfDay)
    .where('timestamp', '>=', startOfDay);
  try {
    return await todayTasks.get();
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  addTask,
  listTasks,
};
