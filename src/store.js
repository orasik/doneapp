'use strict';

const { databaseURL, serviceAccount, collection } = require('./config');

const admin = require("firebase-admin");
const uuidv4 = require('uuid/v4');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

let db = admin.firestore();

async function addTask(note) {

    const document = db.collection(collection).doc(uuidv4());
    try{
        await document.set(note);
        console.log('added new data into the document');
    } catch(e) {
        console.error(e);
    }
}
async function listTasks(date) {    
    console.log('Here we are');
    const time = Date.parse(date);
    console.log(`Time = ${time}`)
    const todayTasks = db.collection('tasks').where('timestamp', '>=', time);
    try{
        await todayTasks.get()
        .then(docs => {
            docs.forEach( doc => console.log(doc.data()))
        })
        .catch(e => console.error(`No data to list ${e}`));
    } catch(e) {
        console.error(e);
    }
}

module.exports = {
    addTask,
    listTasks
}
