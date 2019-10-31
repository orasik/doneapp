'use strict';

const { databaseURL, serviceAccount, collection } = require('./config');

const admin = require("firebase-admin");
const uuidv4 = require('uuid/v4');
const moment = require("moment");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

let db = admin.firestore();

async function addTask(note, date=null) {

    
    if(date == null ) {
        note['timestamp'] = moment().unix();
    } else {
        note['timestamp'] = moment(date).unix();
    }
    note['category'] = 'work'
    const document = db.collection(collection).doc(uuidv4());
    try{
        await document.set(note);
        console.log('added new data into the document');
    } catch(e) {
        console.error(e);
    }
}
async function listTasks(date) {    
    const startOfDay = moment(date).startOf('day').unix();
    const endOfDay = moment(date).endOf('day').unix();
    console.log(`Start of day = ${startOfDay} - End of day = ${endOfDay}`)
    const todayTasks = db.collection('tasks')
    .where('timestamp', '<=', endOfDay)   
    .where('timestamp', '>=', startOfDay)
    ;
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
